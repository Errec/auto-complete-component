import React, { createContext, useCallback, useState } from 'react';
import { searchProducts as apiSearchProducts } from '../services/api';
import { Product } from '../types/Product';

interface ProductContextType {
  products: Product[];
  selectedProducts: Product[];
  searchProducts: (query: string) => Promise<void>;
  setSelectedProducts: (products: Product[]) => void;
  isLoading: boolean;
  error: string | null;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await apiSearchProducts(query);
      setProducts(results);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ProductContext.Provider value={{ 
      products, 
      selectedProducts, 
      searchProducts, 
      setSelectedProducts,
      isLoading,
      error
    }}>
      {children}
    </ProductContext.Provider>
  );
};