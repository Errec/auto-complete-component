import { fireEvent, render, screen } from '@testing-library/react'
import { ProductContext } from '../../../context/ProductContext'
import { Product } from '../../../types/Product'
import { ResultsList } from './ResultsList'

const mockProducts: Product[] = [
  { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg' },
  { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'image2.jpg' },
]

const mockContextValue = {
  products: [],
  selectedProducts: mockProducts,
  searchProducts: jest.fn(),
  setSelectedProducts: jest.fn(),
  isLoading: false,
  error: null,
}

describe('ResultsList', () => {
  it('renders correctly with selected products', () => {
    render(
      <ProductContext.Provider value={mockContextValue}>
        <ResultsList />
      </ProductContext.Provider>
    )
    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
  })

  it('does not render when there are no selected products', () => {
    const emptyContextValue = { ...mockContextValue, selectedProducts: [] }
    const { container } = render(
      <ProductContext.Provider value={emptyContextValue}>
        <ResultsList />
      </ProductContext.Provider>
    )
    expect(container.firstChild).toBeNull()
  })

  it('displays correct product information', () => {
    render(
      <ProductContext.Provider value={mockContextValue}>
        <ResultsList />
      </ProductContext.Provider>
    )
    expect(screen.getByText('$10')).toBeInTheDocument()
    expect(screen.getByText('Category 1')).toBeInTheDocument()
    expect(screen.getByAltText('Product 1')).toHaveAttribute('src', 'image1.jpg')
  })

  it('handles pagination when there are more than 10 products', () => {
    const manyProducts: Product[] = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      price: 10 * (i + 1),
      description: `Description ${i + 1}`,
      category: `Category ${i + 1}`,
      image: `image${i + 1}.jpg`,
    }))
    const contextWithManyProducts = { ...mockContextValue, selectedProducts: manyProducts }
    render(
      <ProductContext.Provider value={contextWithManyProducts}>
        <ResultsList />
      </ProductContext.Provider>
    )
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.queryByText('Product 11')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('2'))
    expect(screen.getByText('Product 11')).toBeInTheDocument()
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument()
  })
})