
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { Order } from '@/hooks/useOrders';

interface OrderDetailsProps {
  orderId: string;
  onClose: () => void;
}

const OrderDetails = ({ orderId, onClose }: OrderDetailsProps) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
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
        .eq('id', orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <p>Chargement des détails...</p>
        </DialogContent>
      </Dialog>
    );
  }

  if (!order) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <p>Commande introuvable.</p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Commande #{order.id.slice(0, 8)}</span>
            <Badge className={`${getStatusBadgeColor(order.status)} text-white`}>
              {getStatusLabel(order.status)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations de commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString('fr-FR')}</p>
              <p><strong>Statut paiement:</strong> {order.payment_status}</p>
              {order.payment_method && (
                <p><strong>Méthode de paiement:</strong> {order.payment_method}</p>
              )}
              {order.notes && (
                <p><strong>Notes:</strong> {order.notes}</p>
              )}
            </CardContent>
          </Card>

          {/* Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Articles commandés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.order_items?.map(item => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded">
                    <img
                      src={item.product?.image || '/placeholder.svg'}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.product?.name}</h4>
                      <p className="text-sm text-gray-500">{item.product?.brand}</p>
                      <p className="text-sm">Quantité: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.price.toFixed(2)}€</p>
                      <p className="text-sm text-gray-500">
                        Total: {(item.price * item.quantity).toFixed(2)}€
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total de la commande:</span>
                  <span className="text-electric-blue">{order.total_amount.toFixed(2)}€</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Adresse de livraison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p>{order.shipping_address.name}</p>
                <p>{order.shipping_address.street}</p>
                <p>{order.shipping_address.postal_code} {order.shipping_address.city}</p>
                <p>{order.shipping_address.country}</p>
              </div>
            </CardContent>
          </Card>

          {/* Billing Address */}
          {order.billing_address && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Adresse de facturation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <p>{order.billing_address.name}</p>
                  <p>{order.billing_address.street}</p>
                  <p>{order.billing_address.postal_code} {order.billing_address.city}</p>
                  <p>{order.billing_address.country}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
