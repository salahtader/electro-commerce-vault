
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Package, Edit2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const StockManagement = () => {
  const { data: products, isLoading } = useProducts();
  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(0);
  const queryClient = useQueryClient();

  const updateStockMutation = useMutation({
    mutationFn: async ({ productId, quantity }: { productId: number; quantity: number }) => {
      const { data, error } = await supabase
        .from('products')
        .update({ stock_quantity: quantity })
        .eq('id', productId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setEditingProduct(null);
    },
  });

  const handleStockUpdate = (productId: number, currentQuantity: number) => {
    setEditingProduct(productId);
    setNewQuantity(currentQuantity);
  };

  const saveStockUpdate = () => {
    if (editingProduct) {
      updateStockMutation.mutate({ productId: editingProduct, quantity: newQuantity });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Chargement des produits...</div>;
  }

  const lowStockProducts = products?.filter(
    product => product.stock_quantity <= (product.low_stock_threshold || 10)
  );

  return (
    <div className="space-y-6">
      {/* Alert for low stock */}
      {lowStockProducts && lowStockProducts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Alerte stock faible
            </CardTitle>
            <CardDescription className="text-orange-700">
              {lowStockProducts.length} produit(s) nécessitent un réapprovisionnement
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Gestion des stocks
          </CardTitle>
          <CardDescription>
            Gérez les quantités en stock de vos produits
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Marque</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Stock actuel</TableHead>
                <TableHead>Seuil d'alerte</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.price} €</TableCell>
                  <TableCell>
                    {editingProduct === product.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={newQuantity}
                          onChange={(e) => setNewQuantity(Number(e.target.value))}
                          className="w-20"
                        />
                        <Button 
                          size="sm" 
                          onClick={saveStockUpdate}
                          disabled={updateStockMutation.isPending}
                        >
                          Sauver
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setEditingProduct(null)}
                        >
                          Annuler
                        </Button>
                      </div>
                    ) : (
                      <span>{product.stock_quantity}</span>
                    )}
                  </TableCell>
                  <TableCell>{product.low_stock_threshold || 10}</TableCell>
                  <TableCell>
                    {product.stock_quantity <= (product.low_stock_threshold || 10) ? (
                      <Badge variant="destructive">Stock faible</Badge>
                    ) : product.stock_quantity <= (product.low_stock_threshold || 10) * 2 ? (
                      <Badge variant="secondary">Stock moyen</Badge>
                    ) : (
                      <Badge variant="default">Stock suffisant</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingProduct !== product.id && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStockUpdate(product.id, product.stock_quantity)}
                      >
                        <Edit2 className="h-4 w-4 mr-1" />
                        Modifier
                      </Button>
                    )}
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
