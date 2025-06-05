
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart, Share2, Download, Plus, Minus } from 'lucide-react';
import { Product } from '@/hooks/useProducts';

interface ProductInfoProps {
  product: Product;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

const ProductInfo = ({ product, quantity, onQuantityChange, onAddToCart }: ProductInfoProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        {product.badge && (
          <Badge className="bg-electric-orange text-white dark:bg-orange-600 dark:text-white">
            {product.badge}
          </Badge>
        )}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <h1 className="text-3xl font-montserrat font-bold text-gray-900 dark:text-gray-100 mb-2">
        {product.name}
      </h1>
      <p className="text-lg text-electric-blue dark:text-blue-400 font-medium mb-4">
        {product.brand}
      </p>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
          <span className="ml-2 text-gray-600 dark:text-gray-400">(127 avis)</span>
        </div>
      </div>

      {product.short_description && (
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          {product.short_description}
        </p>
      )}

      <div className="flex items-center space-x-4 mb-6">
        <span className="text-3xl font-bold text-electric-blue dark:text-blue-400">
          {product.price.toFixed(2)}€
        </span>
        {product.original_price && (
          <span className="text-xl text-gray-400 dark:text-gray-500 line-through">
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
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {product.in_stock ? (
            <span className="text-green-600 dark:text-green-400 font-medium">
              ✓ En stock ({product.stock_quantity} disponibles)
            </span>
          ) : (
            <span className="text-red-600 dark:text-red-400 font-medium">✗ Rupture de stock</span>
          )}
        </p>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="rounded-r-none text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-4 py-2 min-w-[60px] text-center border-l border-r border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onQuantityChange(quantity + 1)}
            className="rounded-l-none text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          size="lg"
          className="flex-1 bg-electric-orange hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-black dark:text-white font-semibold"
          disabled={!product.in_stock}
          onClick={onAddToCart}
        >
          Ajouter au panier
        </Button>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Download className="h-4 w-4 mr-2" />
          Fiche technique PDF
        </Button>
        <Button variant="outline" className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
          Demander un devis
        </Button>
      </div>
    </div>
  );
};

export default ProductInfo;
