
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-montserrat">Produits associés</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(relatedProduct => (
            <div key={relatedProduct.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <img
                src={relatedProduct.image}
                alt={relatedProduct.name}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <h4 className="font-medium mb-2">{relatedProduct.name}</h4>
              <p className="text-electric-blue font-bold">{relatedProduct.price.toFixed(2)}€</p>
              <Button className="w-full mt-3 bg-electric-orange hover:bg-orange-600 text-black" asChild>
                <a href={`/product/${relatedProduct.id}`}>Voir le produit</a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedProducts;
