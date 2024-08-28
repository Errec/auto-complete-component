import React, { createContext, useCallback, useState } from 'react'
import { Product } from '../types/Product'

interface ProductContextType {
  products: Product[]
  selectedProducts: Product[]
  searchProducts: (query: string) => Promise<void>
  setSelectedProducts: (products: Product[]) => void
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  const searchProducts = useCallback(async (query: string) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products?limit=20`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      const filteredProducts = data.filter((product: Product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
      setProducts(filteredProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
      throw error
    }
  }, [])

  const value = {
    products,
    selectedProducts,
    searchProducts,
    setSelectedProducts
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}