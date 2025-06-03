
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Shield, Truck, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductImages from '../components/ProductImages';
import ProductInfo from '../components/ProductInfo';
import ProductTabs from '../components/ProductTabs';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id) : 1;
  const { data: product, isLoading, error } = useProduct(productId);
  const { addItem } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour ajouter des produits au panier.",
        variant: "destructive",
      });
      return;
    }

    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
      });
    }

    toast({
      title: "Produit ajouté",
      description: `${quantity} x ${product.name} ajouté(s) au panier.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-blue mx-auto mb-4"></div>
              <p className="text-lg font-inter">Chargement du produit...</p>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-xl">
              <p className="text-lg font-inter text-red-600">Produit non trouvé.</p>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = [product.image, product.image, product.image];

  const relatedProducts = [
    {
      id: 2,
      name: "Disjoncteur C60N 32A",
      price: 129.90,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Disjoncteur C60N 40A", 
      price: 149.90,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Bloc différentiel Vigi C60",
      price: 89.90,
      image: "/placeholder.svg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Breadcrumb */}
        <motion.nav 
          className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <a href="/" className="hover:text-electric-blue transition-colors font-inter">Accueil</a>
          <span>/</span>
          <a href="/catalog" className="hover:text-electric-blue transition-colors font-inter">Catalogue</a>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button variant="ghost" className="mb-6 hover:bg-white/50 backdrop-blur-sm" asChild>
            <a href="/catalog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au catalogue
            </a>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ProductImages
              images={images}
              productName={product.name}
              selectedImage={selectedImage}
              onImageSelect={setSelectedImage}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <ProductInfo
              product={product}
              quantity={quantity}
              onQuantityChange={setQuantity}
              onAddToCart={handleAddToCart}
            />
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[
            { icon: Shield, title: "Garantie 2 ans", description: "Produits certifiés CE" },
            { icon: Truck, title: "Livraison Express", description: "24-48h partout en France" },
            { icon: Clock, title: "Support 24/7", description: "Assistance technique" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-xl p-6 text-center shadow-lg"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <item.icon className="h-8 w-8 text-electric-blue mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2 font-montserrat">{item.title}</h3>
              <p className="text-sm text-gray-600 font-inter">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <ProductTabs product={product} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <RelatedProducts products={relatedProducts} />
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;
