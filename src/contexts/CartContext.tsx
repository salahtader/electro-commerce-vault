
import React, { createContext, useContext, ReactNode } from 'react';
import { useCartItems, useAddToCart, useUpdateCartItem, useRemoveFromCart, useClearCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const { data: dbCartItems = [], isLoading } = useCartItems();
  const addToCartMutation = useAddToCart();
  const updateCartMutation = useUpdateCartItem();
  const removeFromCartMutation = useRemoveFromCart();
  const clearCartMutation = useClearCart();

  // Convert database cart items to the expected format
  const items: CartItem[] = dbCartItems.map(item => ({
    id: item.product_id,
    name: item.product?.name || '',
    price: item.product?.price || 0,
    quantity: item.quantity,
    image: item.product?.image || '',
    brand: item.product?.brand || '',
  }));

  const addItem = async (product: Omit<CartItem, 'quantity'>) => {
    if (!user) {
      // For non-logged in users, we could show a login prompt
      console.log('User must be logged in to add items to cart');
      return;
    }

    try {
      await addToCartMutation.mutateAsync({ productId: product.id });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeItem = async (productId: number) => {
    if (!user) return;

    const dbItem = dbCartItems.find(item => item.product_id === productId);
    if (!dbItem) return;

    try {
      await removeFromCartMutation.mutateAsync(dbItem.id);
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (!user) return;

    const dbItem = dbCartItems.find(item => item.product_id === productId);
    if (!dbItem) return;

    try {
      await updateCartMutation.mutateAsync({ itemId: dbItem.id, quantity });
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      await clearCartMutation.mutateAsync();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isLoading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
