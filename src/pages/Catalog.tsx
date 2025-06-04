import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, Grid, List, ShoppingCart, Eye, Star, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '@/contexts/CartContext';

const Catalog = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const { addItem } = useCart();

  const categories = [
    { id: 'all', name: 'Toutes catégories' },
    { id: 'disjoncteurs', name: 'Disjoncteurs' },
    { id: 'transformateurs', name: 'Transformateurs' },
    { id: 'armoires', name: 'Armoires électriques' },
    { id: 'cablage', name: 'Câblage' },
    { id: 'protection', name: 'Protection différentielle' }
  ];

  const brands = ['Schneider Electric', 'ABB', 'Siemens', 'Legrand', 'Hager', 'General Electric'];

  const allProducts = [
    {
      id: 1,
      name: "Disjoncteur Tripolaire C60N 63A",
      category: "disjoncteurs",
      brand: "Schneider Electric",
      price: 189.90,
      originalPrice: 219.90,
      image: "/placeholder.svg",
      inStock: true,
      badge: "Bestseller",
      voltage: "400V",
      current: "63A",
      description: "Disjoncteur tripolaire courbe C, pouvoir de coupure 6kA",
      rating: 4.8
    },
    {
      id: 2,
      name: "Transformateur sec 400kVA",
      category: "transformateurs",
      brand: "ABB",
      price: 12890.00,
      originalPrice: null,
      image: "/placeholder.svg",
      inStock: true,
      badge: "Professionnel",
      voltage: "20kV/400V",
      power: "400kVA",
      description: "Transformateur sec de distribution, classe H",
      rating: 4.9
    },
    {
      id: 3,
      name: "Armoire Électrique Polyester IP65",
      category: "armoires",
      brand: "Legrand",
      price: 749.90,
      originalPrice: 829.90,
      image: "/placeholder.svg",
      inStock: false,
      badge: "Promo",
      dimensions: "800x600x300mm",
      protection: "IP65",
      description: "Armoire polyester renforcé, résistante aux UV",
      rating: 4.6
    },
    {
      id: 4,
      name: "Câble HTA XLPE 20kV 3x95mm²",
      category: "cablage",
      brand: "Nexans",
      price: 45.60,
      originalPrice: null,
      image: "/placeholder.svg",
      inStock: true,
      badge: "Nouveau",
      voltage: "20kV",
      section: "3x95mm²",
      description: "Câble haute tension isolé XLPE, écran cuivre",
      rating: 4.7
    }
  ];

  // Filter and sort products based on current filter states
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !product.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Price range filter
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(p => p.replace('+', ''));
        const minPrice = parseInt(min);
        const maxPrice = max ? parseInt(max) : Infinity;
        
        if (product.price < minPrice || product.price > maxPrice) {
          return false;
        }
      }

      // Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order for 'featured'
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedBrands, priceRange, inStockOnly, sortBy]);

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleInStockChange = (checked: boolean | "indeterminate") => {
    setInStockOnly(checked === true);
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand
    });
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-adaptive dark:bg-gradient-dark transition-all duration-300">
      <Header />
      
      {/* Background effects - updated for dark mode */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 dark:bg-purple-400/5 rounded-full blur-3xl"
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
        {/* Page Header - updated colors */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-montserrat font-bold text-gray-900 dark:text-gray-100 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Catalogue Produits
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 font-inter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Découvrez notre gamme complète de matériel électrique BT/MT
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - updated for dark mode */}
          <motion.div 
            className="lg:w-1/4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-xl">
              <h3 className="text-xl font-montserrat font-bold mb-4 flex items-center text-blue-600 dark:text-blue-400">
                <Filter className="h-5 w-5 mr-2" />
                Filtres
              </h3>
              
              {/* Search - updated styles */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Recherche</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                  <Input
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Category - updated styles */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Catégorie</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700">
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id} className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-800">
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Brands - updated styles */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Marques</label>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                        className="border-gray-300 dark:border-gray-600"
                      />
                      <label htmlFor={brand} className="text-sm text-gray-700 dark:text-gray-300">{brand}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range - updated styles */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Prix</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700">
                    <SelectItem value="all" className="text-gray-900 dark:text-gray-100">Tous les prix</SelectItem>
                    <SelectItem value="0-100" className="text-gray-900 dark:text-gray-100">0€ - 100€</SelectItem>
                    <SelectItem value="100-500" className="text-gray-900 dark:text-gray-100">100€ - 500€</SelectItem>
                    <SelectItem value="500-1000" className="text-gray-900 dark:text-gray-100">500€ - 1000€</SelectItem>
                    <SelectItem value="1000+" className="text-gray-900 dark:text-gray-100">1000€+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stock - updated styles */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={inStockOnly}
                  onCheckedChange={handleInStockChange}
                  className="border-gray-300 dark:border-gray-600"
                />
                <label htmlFor="inStock" className="text-sm text-gray-700 dark:text-gray-300">En stock uniquement</label>
              </div>
            </Card>
          </motion.div>

          {/* Products Grid - updated styles throughout */}
          <div className="lg:w-3/4">
            {/* Toolbar - updated colors */}
            <motion.div 
              className="flex justify-between items-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-gray-600 dark:text-gray-400 font-inter">
                <span className="font-medium text-blue-600 dark:text-blue-400">{filteredProducts.length}</span> produits trouvés
              </div>
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700">
                    <SelectItem value="featured" className="text-gray-900 dark:text-gray-100">Mis en avant</SelectItem>
                    <SelectItem value="price-asc" className="text-gray-900 dark:text-gray-100">Prix croissant</SelectItem>
                    <SelectItem value="price-desc" className="text-gray-900 dark:text-gray-100">Prix décroissant</SelectItem>
                    <SelectItem value="name" className="text-gray-900 dark:text-gray-100">Nom A-Z</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded-lg bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200 dark:border-gray-600">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none text-gray-700 dark:text-gray-300"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none text-gray-700 dark:text-gray-300"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Products - updated card styles */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card 
                    className="group hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30"
                    onClick={() => handleProductClick(product.id)}
                  >
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
                        } text-white shadow-lg`}
                      >
                        {product.badge}
                      </Badge>
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded-full shadow-lg">
                            Rupture de stock
                          </span>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-inter">{product.brand}</p>
                        <p className="text-sm text-blue-600 dark:text-blue-400 font-inter font-medium">
                          {categories.find(c => c.id === product.category)?.name}
                        </p>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 font-montserrat group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 font-inter">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {product.price.toFixed(2)}€
                          </span>
                          {product.originalPrice && (
                            <span className="text-lg text-gray-400 dark:text-gray-500 line-through">
                              {product.originalPrice.toFixed(2)}€
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex-1"
                        >
                          <Button 
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            disabled={!product.inStock}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                          >
                            {product.inStock ? (
                              <>
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Ajouter
                              </>
                            ) : (
                              'En rupture'
                            )}
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:bg-white hover:shadow-lg transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProductClick(product.id);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* No products message - updated */}
            {filteredProducts.length === 0 && (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl p-8 shadow-xl">
                  <Zap className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                  <p className="text-lg text-gray-500 dark:text-gray-400 mb-4 font-inter">
                    Aucun produit trouvé avec les filtres sélectionnés.
                  </p>
                  <Button 
                    variant="outline" 
                    className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-lg transition-all duration-300 text-gray-900 dark:text-gray-100"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      setSelectedBrands([]);
                      setPriceRange('all');
                      setInStockOnly(false);
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Pagination - updated */}
            {filteredProducts.length > 0 && (
              <motion.div 
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex space-x-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-lg p-2 shadow-lg">
                  <Button variant="outline" disabled className="bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">Précédent</Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">1</Button>
                  <Button variant="outline" className="bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">2</Button>
                  <Button variant="outline" className="bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">3</Button>
                  <Button variant="outline" className="bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300">Suivant</Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
