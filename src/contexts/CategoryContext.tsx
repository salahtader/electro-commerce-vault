
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  order: number;
}

interface CategoryContextType {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  getSubCategories: (parentId: string) => Category[];
  getRootCategories: () => Category[];
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};

const defaultCategories: Category[] = [
  { id: 'bt', name: 'Basse Tension', slug: 'basse-tension', order: 1 },
  { id: 'mt', name: 'Moyenne Tension', slug: 'moyenne-tension', order: 2 },
  { id: 'disjoncteurs', name: 'Disjoncteurs', slug: 'disjoncteurs', parentId: 'bt', order: 1 },
  { id: 'armoires', name: 'Armoires électriques', slug: 'armoires-electriques', parentId: 'bt', order: 2 },
  { id: 'protection', name: 'Protection différentielle', slug: 'protection-differentielle', parentId: 'bt', order: 3 },
  { id: 'transformateurs', name: 'Transformateurs', slug: 'transformateurs', parentId: 'mt', order: 1 },
  { id: 'cablage', name: 'Câblage HTA', slug: 'cablage-hta', parentId: 'mt', order: 2 },
  { id: 'automation', name: 'Automation', slug: 'automation', order: 3 },
  { id: 'eclairage', name: 'Éclairage', slug: 'eclairage', order: 4 },
];

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === id ? { ...category, ...updates } : category
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  const getSubCategories = (parentId: string) => {
    return categories
      .filter(category => category.parentId === parentId)
      .sort((a, b) => a.order - b.order);
  };

  const getRootCategories = () => {
    return categories
      .filter(category => !category.parentId)
      .sort((a, b) => a.order - b.order);
  };

  const value = {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    getSubCategories,
    getRootCategories,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
