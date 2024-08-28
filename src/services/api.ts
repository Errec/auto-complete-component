import { Product } from '../types/Product';

const API_BASE_URL = 'https://fakestoreapi.com';

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=5`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products: Product[] = await response.json();
    return products.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}