
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Star, Download } from 'lucide-react';
import { Product } from '@/hooks/useProducts';

interface ProductTabsProps {
  product: Product;
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  return (
    <Card className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-700">
          <TabsTrigger value="description" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 text-gray-700 dark:text-gray-300">Description</TabsTrigger>
          <TabsTrigger value="specifications" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 text-gray-700 dark:text-gray-300">Caractéristiques</TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 text-gray-700 dark:text-gray-300">Documents</TabsTrigger>
          <TabsTrigger value="reviews" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-600 data-[state=active]:text-gray-900 dark:data-[state=active]:text-gray-100 text-gray-700 dark:text-gray-300">Avis clients</TabsTrigger>
        </TabsList>
        
        <TabsContent value="description" className="p-6">
          <h3 className="text-xl font-montserrat font-bold mb-4 text-gray-900 dark:text-gray-100">Description produit</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {product.short_description}
          </p>
          {product.features && (
            <>
              <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Caractéristiques principales :</h4>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-electric-blue dark:bg-blue-400 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="specifications" className="p-6">
          <h3 className="text-xl font-montserrat font-bold mb-4 text-gray-900 dark:text-gray-100">Spécifications techniques</h3>
          {product.technical_specs && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.technical_specs).map(([key, value]) => (
                <div key={key} className="border-b border-gray-200 dark:border-gray-600 pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{key}</span>
                    <span className="text-gray-900 dark:text-gray-100">{String(value)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="documents" className="p-6">
          <h3 className="text-xl font-montserrat font-bold mb-4 text-gray-900 dark:text-gray-100">Documents techniques</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
              <span className="text-gray-900 dark:text-gray-100">Fiche technique produit</span>
              <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600">
                <Download className="h-4 w-4 mr-2" />
                Télécharger PDF
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="reviews" className="p-6">
          <h3 className="text-xl font-montserrat font-bold mb-4 text-gray-900 dark:text-gray-100">Avis clients</h3>
          <div className="space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-600 pb-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="font-medium text-gray-900 dark:text-gray-100">Jean-Pierre D.</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">Électricien</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Excellent produit, conforme à mes attentes. Installation simple et fiabilité au rendez-vous.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ProductTabs;
