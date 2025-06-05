
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
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
      <CardHeader>
        <CardTitle className="text-2xl font-montserrat text-gray-900 dark:text-gray-100">Produits associés</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(relatedProduct => (
            <div key={relatedProduct.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-lg dark:hover:shadow-gray-900/20 transition-shadow bg-white dark:bg-gray-700">
              <img
                src={relatedProduct.image}
                alt={relatedProduct.name}
                className="w-full h-32 object-cover rounded mb-3 bg-gray-100 dark:bg-gray-600"
              />
              <h4 className="font-medium mb-2 text-gray-900 dark:text-gray-100">{relatedProduct.name}</h4>
              <p className="text-electric-blue dark:text-blue-400 font-bold">{relatedProduct.price.toFixed(2)}€</p>
              <Button className="w-full mt-3 bg-electric-orange hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-black dark:text-white" asChild>
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
