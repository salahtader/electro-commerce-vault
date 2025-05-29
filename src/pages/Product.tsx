
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
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
  const productId = id ? parseInt(id) : 1; // Default to product 1 for now
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
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Chargement du produit...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Produit non trouvé.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Mock images array since we only have one placeholder
  const images = [product.image, product.image, product.image];

  // Mock related products
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <a href="/" className="hover:text-electric-blue">Accueil</a>
          <span>/</span>
          <a href="/catalog" className="hover:text-electric-blue">Catalogue</a>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <Button variant="ghost" className="mb-6" asChild>
          <a href="/catalog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour au catalogue
          </a>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <ProductImages
            images={images}
            productName={product.name}
            selectedImage={selectedImage}
            onImageSelect={setSelectedImage}
          />

          <ProductInfo
            product={product}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onAddToCart={handleAddToCart}
          />
        </div>

        <ProductTabs product={product} />

        <RelatedProducts products={relatedProducts} />
      </div>

      <Footer />
    </div>
  );
};

export default Product;
