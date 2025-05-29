
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const FeaturedProducts = () => {
  const { data: products = [], isLoading } = useProducts();
  const { addItem } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAddToCart = (product: any) => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour ajouter des produits au panier.",
        variant: "destructive",
      });
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
    });

    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté au panier.`,
    });
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-electric-blue mb-6">
              Produits Populaires
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-inter">
              Chargement des produits...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Show only first 4 products for featured section
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-electric-blue mb-6">
            Produits Populaires
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-inter">
            Découvrez notre sélection de produits les plus demandés par les professionnels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <Badge 
                    className={`absolute top-3 left-3 ${
                      product.badge === 'Bestseller' ? 'bg-electric-orange' :
                      product.badge === 'Professionnel' ? 'bg-electric-blue' :
                      product.badge === 'Promo' ? 'bg-red-500' :
                      'bg-green-500'
                    } text-white`}
                  >
                    {product.badge}
                  </Badge>
                )}
                {!product.in_stock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded">
                      Rupture de stock
                    </span>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <p className="text-sm text-gray-500 mb-2 font-inter">{product.category}</p>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 font-montserrat">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-electric-blue">
                      {product.price.toFixed(2)}€
                    </span>
                    {product.original_price && (
                      <span className="text-lg text-gray-400 line-through">
                        {product.original_price.toFixed(2)}€
                      </span>
                    )}
                  </div>
                </div>
                <Button 
                  className="w-full bg-electric-orange hover:bg-orange-600 text-black font-semibold"
                  disabled={!product.in_stock}
                  onClick={() => handleAddToCart(product)}
                >
                  {product.in_stock ? 'Ajouter au panier' : 'En rupture'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white px-8 py-4 text-lg font-semibold"
            asChild
          >
            <a href="/catalog">Voir tout le catalogue</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
