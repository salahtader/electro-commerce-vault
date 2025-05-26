
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Disjoncteur Tripolaire 63A",
      category: "Basse Tension",
      price: "189,90",
      originalPrice: "219,90",
      image: "/placeholder.svg",
      inStock: true,
      badge: "Bestseller"
    },
    {
      id: 2,
      name: "Transformateur 400kVA",
      category: "Moyenne Tension",
      price: "12 890,00",
      originalPrice: null,
      image: "/placeholder.svg",
      inStock: true,
      badge: "Professionnel"
    },
    {
      id: 3,
      name: "Armoire Électrique IP65",
      category: "Équipement",
      price: "749,90",
      originalPrice: "829,90",
      image: "/placeholder.svg",
      inStock: false,
      badge: "Promo"
    },
    {
      id: 4,
      name: "Câble HTA 20kV",
      category: "Câblage",
      price: "45,60",
      originalPrice: null,
      image: "/placeholder.svg",
      inStock: true,
      badge: "Nouveau"
    }
  ];

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
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
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
                {!product.inStock && (
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
                      {product.price}€
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        {product.originalPrice}€
                      </span>
                    )}
                  </div>
                </div>
                <Button 
                  className="w-full bg-electric-orange hover:bg-orange-600 text-black font-semibold"
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Ajouter au panier' : 'En rupture'}
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
          >
            Voir tout le catalogue
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
