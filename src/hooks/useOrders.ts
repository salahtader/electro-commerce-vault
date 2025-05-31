
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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

      // Use RPC call to bypass type issues
      const { data, error } = await supabase.rpc('get_user_orders', {
        p_user_id: user.id
      });

      if (error) {
        console.error('Error fetching orders:', error);
        // Fallback to direct query with any type
        const { data: fallbackData, error: fallbackError } = await (supabase as any)
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

        if (fallbackError) {
          console.error('Fallback query also failed:', fallbackError);
          throw fallbackError;
        }

        return fallbackData as Order[];
      }

      return data as Order[];
    },
    enabled: !!user,
  });
};

export const useCreateOrder = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

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

      // Calculate total amount
      const total_amount = orderData.cartItems.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
      );

      // Create the order using any type to bypass TypeScript issues
      const { data: order, error: orderError } = await (supabase as any)
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount,
          shipping_address: orderData.shipping_address,
          billing_address: orderData.billing_address,
          payment_method: orderData.payment_method,
          notes: orderData.notes,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = orderData.cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product?.price || 0,
      }));

      const { error: itemsError } = await (supabase as any)
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear the cart
      const cartItemIds = orderData.cartItems.map(item => item.id);
      const { error: clearCartError } = await supabase
        .from('cart_items')
        .delete()
        .in('id', cartItemIds);

      if (clearCartError) console.warn('Failed to clear cart:', clearCartError);

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['cart-items'] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: Order['status'] }) => {
      const { data, error } = await (supabase as any)
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
