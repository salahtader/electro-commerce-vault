
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const UserOrders = () => {
  const recentOrders = [
    {
      id: "CMD-2024-001",
      date: "2024-01-15",
      status: "Livrée",
      total: 1289.90,
      items: 3
    },
    {
      id: "CMD-2024-002", 
      date: "2024-01-20",
      status: "En transit",
      total: 789.50,
      items: 2
    }
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-electric-blue font-montserrat">
          <ShoppingBag className="w-5 h-5" />
          Mes commandes récentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order, index) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/30 hover:bg-white/70 transition-all duration-300"
            >
              <div>
                <p className="font-semibold text-gray-900 font-montserrat">{order.id}</p>
                <p className="text-sm text-gray-600 font-inter">{order.date} • {order.items} articles</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-electric-blue font-montserrat">{order.total.toFixed(2)}€</p>
                <Badge 
                  className={`text-xs ${
                    order.status === 'Livrée' ? 'bg-green-100 text-green-800' :
                    order.status === 'En transit' ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }`}
                >
                  {order.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 bg-white/50 hover:bg-white/70 transition-all duration-300">
          Voir toutes les commandes
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserOrders;
