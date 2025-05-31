
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCartItems } from '@/hooks/useCart';
import { useCreateOrder } from '@/hooks/useOrders';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: cartItems = [], isLoading } = useCartItems();
  const createOrder = useCreateOrder();
  const { toast } = useToast();

  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    street: '',
    city: '',
    postal_code: '',
    country: 'France',
  });

  const [useBillingAddress, setUseBillingAddress] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    name: '',
    street: '',
    city: '',
    postal_code: '',
    country: 'France',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [notes, setNotes] = useState('');

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour passer commande.",
        variant: "destructive",
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Panier vide",
        description: "Votre panier est vide.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createOrder.mutateAsync({
        cartItems,
        shipping_address: shippingAddress,
        billing_address: useBillingAddress ? billingAddress : undefined,
        payment_method: paymentMethod,
        notes: notes || undefined,
      });

      toast({
        title: "Commande créée",
        description: "Votre commande a été créée avec succès !",
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la création de votre commande.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Vous devez être connecté pour accéder à cette page.</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Votre panier est vide.</p>
          <div className="text-center mt-4">
            <Button asChild>
              <a href="/catalog">Continuer vos achats</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-electric-blue mb-8">Finaliser la commande</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle>Adresse de livraison</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="shipping-name">Nom complet</Label>
                    <Input
                      id="shipping-name"
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="shipping-street">Adresse</Label>
                    <Input
                      id="shipping-street"
                      value={shippingAddress.street}
                      onChange={(e) => setShippingAddress(prev => ({ ...prev, street: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="shipping-city">Ville</Label>
                      <Input
                        id="shipping-city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-postal">Code postal</Label>
                      <Input
                        id="shipping-postal"
                        value={shippingAddress.postal_code}
                        onChange={(e) => setShippingAddress(prev => ({ ...prev, postal_code: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Méthode de paiement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>Carte bancaire</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="transfer"
                        checked={paymentMethod === 'transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span>Virement bancaire</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle>Notes (optionnel)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Instructions de livraison ou autres notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Résumé de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-medium">{item.product?.name}</p>
                        <p className="text-sm text-gray-500">Qté: {item.quantity}</p>
                      </div>
                      <p className="font-medium">
                        {((item.product?.price || 0) * item.quantity).toFixed(2)}€
                      </p>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-electric-blue">{totalAmount.toFixed(2)}€</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-electric-orange hover:bg-orange-600 text-black font-semibold"
                    disabled={createOrder.isPending}
                  >
                    {createOrder.isPending ? 'Traitement...' : 'Passer la commande'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
