
import { useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Plus, Upload } from 'lucide-react';

interface ProductFormData {
  name: string;
  brand: string;
  category: string;
  price: number;
  original_price?: number;
  image: string;
  stock_quantity: number;
  low_stock_threshold: number;
  badge?: string;
  short_description?: string;
  features: string[];
  in_stock: boolean;
}

const AddProduct = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    brand: '',
    category: '',
    price: 0,
    original_price: undefined,
    image: '',
    stock_quantity: 0,
    low_stock_threshold: 10,
    badge: '',
    short_description: '',
    features: [''],
    in_stock: true,
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: async (productData: ProductFormData) => {
      const { data, error } = await supabase
        .from('products')
        .insert({
          ...productData,
          features: productData.features.filter(f => f.trim() !== ''),
          original_price: productData.original_price || null,
          badge: productData.badge || null,
          short_description: productData.short_description || null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Produit ajouté",
        description: "Le produit a été ajouté avec succès au catalogue.",
      });
      setIsOpen(false);
      setFormData({
        name: '',
        brand: '',
        category: '',
        price: 0,
        original_price: undefined,
        image: '',
        stock_quantity: 0,
        low_stock_threshold: 10,
        badge: '',
        short_description: '',
        features: [''],
        in_stock: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit. Veuillez réessayer.",
        variant: "destructive",
      });
      console.error('Error adding product:', error);
    },
  });

  const handleInputChange = (field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProductMutation.mutate(formData);
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)} className="mb-4">
        <Plus className="h-4 w-4 mr-2" />
        Ajouter un produit
      </Button>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Ajouter un nouveau produit</CardTitle>
        <CardDescription>
          Remplissez les informations pour ajouter un produit au catalogue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Marque *</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Catégorie *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bt">Basse Tension</SelectItem>
                  <SelectItem value="mt">Moyenne Tension</SelectItem>
                  <SelectItem value="transformers">Transformateurs</SelectItem>
                  <SelectItem value="cables">Câbles</SelectItem>
                  <SelectItem value="protection">Protection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Prix (€) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="original_price">Prix original (€)</Label>
              <Input
                id="original_price"
                type="number"
                step="0.01"
                value={formData.original_price || ''}
                onChange={(e) => handleInputChange('original_price', parseFloat(e.target.value) || undefined)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock_quantity">Quantité en stock *</Label>
              <Input
                id="stock_quantity"
                type="number"
                value={formData.stock_quantity}
                onChange={(e) => handleInputChange('stock_quantity', parseInt(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="low_stock_threshold">Seuil de stock faible</Label>
              <Input
                id="low_stock_threshold"
                type="number"
                value={formData.low_stock_threshold}
                onChange={(e) => handleInputChange('low_stock_threshold', parseInt(e.target.value) || 10)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="badge">Badge</Label>
              <Input
                id="badge"
                value={formData.badge}
                onChange={(e) => handleInputChange('badge', e.target.value)}
                placeholder="Nouveau, Promo, etc."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL de l'image *</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleInputChange('image', e.target.value)}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="short_description">Description courte</Label>
            <Textarea
              id="short_description"
              value={formData.short_description}
              onChange={(e) => handleInputChange('short_description', e.target.value)}
              placeholder="Description courte du produit..."
            />
          </div>

          <div className="space-y-2">
            <Label>Caractéristiques</Label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder="Caractéristique du produit"
                />
                {formData.features.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeFeature(index)}
                  >
                    Supprimer
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFeature}>
              Ajouter une caractéristique
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="in_stock"
              checked={formData.in_stock}
              onCheckedChange={(checked) => handleInputChange('in_stock', checked)}
            />
            <Label htmlFor="in_stock">Produit en stock</Label>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={addProductMutation.isPending}
            >
              {addProductMutation.isPending ? 'Ajout en cours...' : 'Ajouter le produit'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProduct;
