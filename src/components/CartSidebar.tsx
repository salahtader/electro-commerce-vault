
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCartItems, useUpdateCartItem, useRemoveFromCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';

const CartSidebar = () => {
  const { data: items = [], isLoading } = useCartItems();
  const updateCartItem = useUpdateCartItem();
  const removeFromCart = useRemoveFromCart();
  const { user } = useAuth();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    updateCartItem.mutate({ itemId, quantity: newQuantity });
  };

  const removeItem = (itemId: string) => {
    removeFromCart.mutate(itemId);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-white/10 text-white/90 hover:text-white backdrop-blur-sm">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0 border-0">
                {totalItems}
              </Badge>
            )}
          </Button>
        </motion.div>
      </SheetTrigger>
      <SheetContent className="w-96 bg-slate-900/95 backdrop-blur-xl border-l border-white/20">
        <SheetHeader>
          <SheetTitle className="text-white">Panier ({totalItems})</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {!user ? (
              <div className="flex flex-col items-center justify-center h-full text-white/70">
                <ShoppingBag className="h-16 w-16 mb-4" />
                <p className="text-center">Connectez-vous pour voir votre panier</p>
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center justify-center h-full text-white/70">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
                />
                <p className="mt-4">Chargement...</p>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-white/70">
                <ShoppingBag className="h-16 w-16 mb-4" />
                <p>Votre panier est vide</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-3 p-3 border border-white/20 rounded-lg bg-white/5 backdrop-blur-sm"
                  >
                    <img
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-white">{item.product?.name}</h4>
                      <p className="text-xs text-white/60">{item.product?.brand}</p>
                      <p className="font-bold text-blue-400">{item.product?.price?.toFixed(2)}€</p>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex items-center space-x-1">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm w-8 text-center text-white">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-6 w-6 bg-white/10 border-white/20 text-white hover:bg-white/20"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          {user && items.length > 0 && (
            <div className="border-t border-white/20 pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-bold text-white">
                <span>Total:</span>
                <span className="text-blue-400">{totalPrice.toFixed(2)}€</span>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold" asChild>
                  <a href="/checkout">Passer commande</a>
                </Button>
              </motion.div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;
