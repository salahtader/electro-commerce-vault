
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCategories } from '@/contexts/CategoryContext';

interface CategorySubmenuProps {
  categoryId: string;
  categoryName: string;
  href: string;
  onItemClick?: () => void;
  isOpen?: boolean;
  isMobile?: boolean;
}

const CategorySubmenu = ({ 
  categoryId, 
  categoryName, 
  href, 
  onItemClick, 
  isOpen: controlledOpen, 
  isMobile = false 
}: CategorySubmenuProps) => {
  const [isInternalOpen, setIsInternalOpen] = useState(false);
  const { getSubCategories } = useCategories();
  const subCategories = getSubCategories(categoryId);
  
  const isOpen = controlledOpen !== undefined ? controlledOpen : isInternalOpen;
  const setIsOpen = controlledOpen !== undefined ? () => {} : setIsInternalOpen;

  const hasSubCategories = subCategories.length > 0;

  return (
    <div className="relative group">
      <div className="flex items-center">
        <a
          href={href}
          className="flex-1 relative px-4 py-2 text-white/90 dark:text-gray-200 hover:text-white dark:hover:text-white transition-all duration-300 font-medium rounded-lg hover:bg-white/10 dark:hover:bg-gray-800/50 backdrop-blur-sm"
          onClick={onItemClick}
        >
          {categoryName}
          <span className="absolute inset-x-2 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </a>
        
        {hasSubCategories && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-white/70 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors"
          >
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Desktop Submenu */}
      {hasSubCategories && !isMobile && (
        <div className="absolute left-0 top-full mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-lg shadow-xl p-2">
            {subCategories.map((subCategory) => (
              <a
                key={subCategory.id}
                href={`/catalog?category=${subCategory.slug}`}
                className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-md transition-all duration-200"
                onClick={onItemClick}
              >
                {subCategory.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Submenu */}
      {hasSubCategories && isMobile && (
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pl-6 space-y-1">
                {subCategories.map((subCategory) => (
                  <a
                    key={subCategory.id}
                    href={`/catalog?category=${subCategory.slug}`}
                    className="block px-4 py-2 text-white/80 dark:text-gray-300 hover:text-white dark:hover:text-white transition-all duration-300 rounded-lg hover:bg-white/10 dark:hover:bg-gray-800/50 backdrop-blur-sm"
                    onClick={onItemClick}
                  >
                    {subCategory.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default CategorySubmenu;
