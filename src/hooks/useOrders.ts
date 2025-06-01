import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useTrackEvent } from './useAnalytics';

export interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: {
    name: string;
    street: string;
    city: string;
    postal_code: string;
    country: string;
  };
  billing_address?: {
    name: string;
    street: string;
    city: string;
    postal_code: string;
    country: string;
  };
  payment_method?: string;
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  created_at: string;
  updated_at: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: number;
  quantity: number;
  price: number;
  created_at: string;
  product?: {
    id: number;
    name: string;
    image: string;
    brand: string;
  };
}

export const useOrders = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      if (!user) return [];

      console.log('Fetching orders for user:', user.id);

      try {
        const { data, error } = await supabase
          .from('orders')
          .select(`
            *,
            order_items(
              *,
              product:products(id, name, image, brand)
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching orders:', error);
          throw error;
        }

        console.log('Orders fetched successfully:', data);
        return data as Order[];
      } catch (error) {
        console.error('Failed to fetch orders:', error);
        throw error;
      }
    },
    enabled: !!user,
  });
};

export const useCreateOrder = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const trackEvent = useTrackEvent();

  return useMutation({
    mutationFn: async (orderData: {
      cartItems: Array<{
        id: string;
        product_id: number;
        quantity: number;
        product?: { price: number };
      }>;
      shipping_address: Order['shipping_address'];
      billing_address?: Order['billing_address'];
      payment_method?: string;
      notes?: string;
    }) => {
      if (!user) throw new Error('User must be logged in');

      console.log('Creating order with data:', orderData);

      // Calculate total amount
      const total_amount = orderData.cartItems.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
      );

      console.log('Calculated total amount:', total_amount);

      try {
        // Create the order
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user.id,
            total_amount,
            shipping_address: orderData.shipping_address,
            billing_address: orderData.billing_address,
            payment_method: orderData.payment_method,
            notes: orderData.notes,
            status: 'pending',
            payment_status: 'pending'
          })
          .select()
          .single();

        if (orderError) {
          console.error('Error creating order:', orderError);
          throw orderError;
        }

        console.log('Order created successfully:', order);

        // Create order items
        const orderItems = orderData.cartItems.map(item => ({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product?.price || 0,
        }));

        console.log('Creating order items:', orderItems);

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) {
          console.error('Error creating order items:', itemsError);
          throw itemsError;
        }

        console.log('Order items created successfully');

        // Track order creation event
        trackEvent.mutate({
          eventType: 'order_created',
          eventData: {
            order_id: order.id,
            total_amount,
            items_count: orderData.cartItems.length
          },
          userId: user.id
        });

        // Clear the cart
        const cartItemIds = orderData.cartItems.map(item => item.id);
        console.log('Clearing cart items:', cartItemIds);

        const { error: clearCartError } = await supabase
          .from('cart_items')
          .delete()
          .in('id', cartItemIds);

        if (clearCartError) {
          console.warn('Failed to clear cart:', clearCartError);
        } else {
          console.log('Cart cleared successfully');
        }

        return order;
      } catch (error) {
        console.error('Failed to create order:', error);
        throw error;
      }
    },
    onSuccess: () => {
      console.log('Order creation successful, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
    },
    onError: (error) => {
      console.error('Order creation failed:', error);
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const trackEvent = useTrackEvent();

  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: Order['status'] }) => {
      console.log('Updating order status:', orderId, status);

      const { data, error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();

      if (error) {
        console.error('Error updating order status:', error);
        throw error;
      }

      // Track status change event
      trackEvent.mutate({
        eventType: 'order_status_changed',
        eventData: {
          order_id: orderId,
          new_status: status
        }
      });

      console.log('Order status updated successfully:', data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
