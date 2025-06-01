
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, ShoppingCart, Package, TrendingUp, AlertTriangle } from 'lucide-react';
import { useSalesStats } from '@/hooks/useAnalytics';

const AdminDashboard = () => {
  const { data: stats, isLoading } = useSalesStats();

  if (isLoading) {
    return <div className="flex justify-center p-8">Chargement des statistiques...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard Administrateur</h1>
        <Badge variant="secondary">Mode Admin</Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalRevenue?.toFixed(2)} €</div>
            <p className="text-xs text-muted-foreground">Total des ventes livrées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes totales</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.pendingOrders} en attente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock faible</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats?.lowStockProducts}
            </div>
            <p className="text-xs text-muted-foreground">Produits à réapprovisionner</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits populaires</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.topProducts?.length}</div>
            <p className="text-xs text-muted-foreground">Top 5 des ventes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Ventes</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des ventes</CardTitle>
              <CardDescription>Chiffre d'affaires par mois</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats?.chartData || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} €`, 'Chiffre d\'affaires']}
                  />
                  <Bar dataKey="revenue" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top 5 des produits</CardTitle>
              <CardDescription>Produits les plus vendus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.topProducts?.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.total_sold} vendus
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{product.price} €</p>
                      <p className="text-sm text-muted-foreground">
                        Stock: {product.stock_quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des stocks</CardTitle>
              <CardDescription>Produits nécessitant une attention</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground p-4">
                Fonctionnalité de gestion des stocks à venir
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des utilisateurs</CardTitle>
              <CardDescription>Administration des comptes utilisateur</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground p-4">
                Fonctionnalité de gestion des utilisateurs à venir
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
