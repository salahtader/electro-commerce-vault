
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, AlertTriangle, Edit, Trash2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import AddProduct from './AddProduct';

const StockManagement = () => {
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return <div className="flex justify-center p-8">Chargement des produits...</div>;
  }

  const lowStockProducts = products?.filter(
    product => product.stock_quantity <= (product.low_stock_threshold || 10)
  ) || [];

  return (
    <div className="space-y-6">
      <AddProduct />
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Gestion des stocks
          </CardTitle>
          <CardDescription>
            Gérez l'inventaire et les stocks de vos produits
          </CardDescription>
        </CardHeader>
        <CardContent>
          {lowStockProducts.length > 0 && (
            <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800">
                  {lowStockProducts.length} produit(s) en stock faible
                </span>
              </div>
              <div className="text-sm text-orange-700">
                {lowStockProducts.map(product => product.name).join(', ')}
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Marque</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {product.category === 'bt' ? 'Basse Tension' : 
                       product.category === 'mt' ? 'Moyenne Tension' : 
                       product.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.price} €</TableCell>
                  <TableCell>
                    <span className={
                      product.stock_quantity <= (product.low_stock_threshold || 10)
                        ? 'text-orange-600 font-medium'
                        : ''
                    }>
                      {product.stock_quantity}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={product.in_stock ? 'default' : 'destructive'}
                    >
                      {product.in_stock ? 'En stock' : 'Rupture'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StockManagement;
