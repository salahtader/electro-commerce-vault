
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
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
      <section className="py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-electric-blue mb-6">
              Produits Populaires
            </h2>
            <motion.div
              className="mx-auto w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-inter mt-4">
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
    <section className="py-20 bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-32 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-32 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-montserrat font-bold text-electric-blue mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Produits Populaires
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Découvrez notre sélection de produits les plus demandés par les professionnels
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="group h-full bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    whileHover={{ scale: 1.05 }}
                  />
                  {product.badge && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Badge 
                        className={`absolute top-3 left-3 ${
                          product.badge === 'Bestseller' ? 'bg-electric-orange' :
                          product.badge === 'Professionnel' ? 'bg-electric-blue' :
                          product.badge === 'Promo' ? 'bg-red-500' :
                          'bg-green-500'
                        } text-white shadow-lg backdrop-blur-sm`}
                      >
                        {product.badge}
                      </Badge>
                    </motion.div>
                  )}
                  {!product.in_stock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded-full shadow-lg">
                        Rupture de stock
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <p className="text-sm text-gray-500 mb-2 font-inter">{product.category}</p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 font-montserrat group-hover:text-electric-blue transition-colors duration-300">
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
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={!product.in_stock}
                      onClick={() => handleAddToCart(product)}
                    >
                      {product.in_stock ? 'Ajouter au panier' : 'En rupture'}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a href="/catalog">Voir tout le catalogue</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
