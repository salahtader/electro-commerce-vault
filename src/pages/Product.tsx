import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Download, Share2, Heart, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg border"
              />
            </div>
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-electric-blue' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center justify-between mb-4">
              {product.badge && (
                <Badge className="bg-electric-orange text-white">
                  {product.badge}
                </Badge>
              )}
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <h1 className="text-3xl font-montserrat font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-electric-blue font-medium mb-4">
              {product.brand}
            </p>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-gray-600">(127 avis)</span>
              </div>
            </div>

            {product.short_description && (
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.short_description}
              </p>
            )}

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-electric-blue">
                {product.price.toFixed(2)}€
              </span>
              {product.original_price && (
                <span className="text-xl text-gray-400 line-through">
                  {product.original_price.toFixed(2)}€
                </span>
              )}
              {product.original_price && (
                <Badge variant="destructive">
                  -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
                </Badge>
              )}
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">
                {product.in_stock ? (
                  <span className="text-green-600 font-medium">
                    ✓ En stock ({product.stock_quantity} disponibles)
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">✗ Rupture de stock</span>
                )}
              </p>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[60px] text-center border-l border-r">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                size="lg"
                className="flex-1 bg-electric-orange hover:bg-orange-600 text-black font-semibold"
                disabled={!product.in_stock}
                onClick={handleAddToCart}
              >
                Ajouter au panier
              </Button>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Fiche technique PDF
              </Button>
              <Button variant="outline" className="flex-1">
                Demander un devis
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="mb-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Caractéristiques</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="reviews">Avis clients</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="p-6">
              <h3 className="text-xl font-montserrat font-bold mb-4">Description produit</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.short_description}
              </p>
              {product.features && (
                <>
                  <h4 className="text-lg font-semibold mb-3">Caractéristiques principales :</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-electric-blue rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </TabsContent>
            
            <TabsContent value="specifications" className="p-6">
              <h3 className="text-xl font-montserrat font-bold mb-4">Spécifications techniques</h3>
              {product.technical_specs && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.technical_specs).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 pb-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">{key}</span>
                        <span className="text-gray-900">{String(value)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="documents" className="p-6">
              <h3 className="text-xl font-montserrat font-bold mb-4">Documents techniques</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span>Fiche technique produit</span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger PDF
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="p-6">
              <h3 className="text-xl font-montserrat font-bold mb-4">Avis clients</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="font-medium">Jean-Pierre D.</span>
                    <span className="text-gray-500 text-sm">Électricien</span>
                  </div>
                  <p className="text-gray-700">
                    Excellent produit, conforme à mes attentes. Installation simple et fiabilité au rendez-vous.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Related Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-montserrat">Produits associés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
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
      </div>

      <Footer />
    </div>
  );
};

export default Product;
