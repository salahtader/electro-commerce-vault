
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import UserProfile from '@/components/UserProfile';
import OrderDetails from '@/components/OrderDetails';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: orders = [], isLoading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'confirmed': return 'bg-blue-500';
      case 'processing': return 'bg-orange-500';
      case 'shipped': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmée';
      case 'processing': return 'En préparation';
      case 'shipped': return 'Expédiée';
      case 'delivered': return 'Livrée';
      case 'cancelled': return 'Annulée';
      default: return status;
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-electric-blue mb-8">Mon tableau de bord</h1>
        
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="orders">Mes commandes</TabsTrigger>
            <TabsTrigger value="profile">Mon profil</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            {isLoading ? (
              <p>Chargement de vos commandes...</p>
            ) : orders.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500 mb-4">Vous n'avez pas encore passé de commande.</p>
                  <Button asChild>
                    <a href="/catalog">Découvrir nos produits</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <Card key={order.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">
                            Commande #{order.id.slice(0, 8)}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={`${getStatusBadgeColor(order.status)} text-white`}>
                            {getStatusLabel(order.status)}
                          </Badge>
                          <p className="text-lg font-bold text-electric-blue mt-2">
                            {order.total_amount.toFixed(2)}€
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        {order.order_items?.map(item => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.product?.name}</span>
                            <span>{(item.price * item.quantity).toFixed(2)}€</span>
                          </div>
                        ))}
                      </div>

                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedOrder(order.id)}
                      >
                        Voir les détails
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </div>

      {selectedOrder && (
        <OrderDetails 
          orderId={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;
