import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Filter, Grid, List } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '@/contexts/CartContext';

const Catalog = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
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

  const products = [
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
      description: "Disjoncteur tripolaire courbe C, pouvoir de coupure 6kA"
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
      description: "Transformateur sec de distribution, classe H"
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
      description: "Armoire polyester renforcé, résistante aux UV"
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
      description: "Câble haute tension isolé XLPE, écran cuivre"
    }
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-montserrat font-bold text-electric-blue mb-4">
            Catalogue Produits
          </h1>
          <p className="text-lg text-gray-600 font-inter">
            Découvrez notre gamme complète de matériel électrique BT/MT
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card className="p-6">
              <h3 className="text-xl font-montserrat font-bold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtres
              </h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Recherche</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Catégorie</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Marques</label>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                      />
                      <label htmlFor={brand} className="text-sm">{brand}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Prix</label>
                <Select value={priceRange} onValueChange={setPriceRange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les prix</SelectItem>
                    <SelectItem value="0-100">0€ - 100€</SelectItem>
                    <SelectItem value="100-500">100€ - 500€</SelectItem>
                    <SelectItem value="500-1000">500€ - 1000€</SelectItem>
                    <SelectItem value="1000+">1000€+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stock */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={inStockOnly}
                  onCheckedChange={handleInStockChange}
                />
                <label htmlFor="inStock" className="text-sm">En stock uniquement</label>
              </div>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-gray-600">
                <span className="font-medium">{products.length}</span> produits trouvés
              </div>
              <div className="flex items-center space-x-4">
                <Select defaultValue="featured">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Mis en avant</SelectItem>
                    <SelectItem value="price-asc">Prix croissant</SelectItem>
                    <SelectItem value="price-desc">Prix décroissant</SelectItem>
                    <SelectItem value="name">Nom A-Z</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
              {products.map(product => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
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
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-500 font-inter">{product.brand}</p>
                      <p className="text-sm text-gray-500 font-inter">{categories.find(c => c.id === product.category)?.name}</p>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-montserrat">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-electric-blue">
                          {product.price.toFixed(2)}€
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-400 line-through">
                            {product.originalPrice.toFixed(2)}€
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        className="flex-1 bg-electric-orange hover:bg-orange-600 text-black font-semibold"
                        disabled={!product.inStock}
                        onClick={() => handleAddToCart(product)}
                      >
                        {product.inStock ? 'Ajouter au panier' : 'En rupture'}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <Button variant="outline" disabled>Précédent</Button>
                <Button variant="default" className="bg-electric-blue">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Suivant</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
