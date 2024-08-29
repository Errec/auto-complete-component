import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ProductContext } from '../../../context/ProductContext';
import { Product } from '../../../types/Product';
import { AutocompleteInput } from './AutocompleteInput';

const mockProducts: Product[] = [
  { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'image1.jpg' },
  { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'image2.jpg' },
];

const mockContextValue = {
  products: mockProducts,
  selectedProducts: [],
  searchProducts: jest.fn().mockImplementation(() => Promise.resolve()),
  setSelectedProducts: jest.fn(),
  isLoading: false,
  error: null,
};

describe('AutocompleteInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <ProductContext.Provider value={mockContextValue}>
        <AutocompleteInput />
      </ProductContext.Provider>
    );
    expect(screen.getByPlaceholderText('Search for products...')).toBeInTheDocument();
  });

  it('shows dropdown when typing', async () => {
    render(
      <ProductContext.Provider value={mockContextValue}>
        <AutocompleteInput />
      </ProductContext.Provider>
    );
    fireEvent.change(screen.getByPlaceholderText('Search for products...'), { target: { value: 'Product' } });
    await waitFor(() => {
      expect(mockContextValue.searchProducts).toHaveBeenCalledWith('Product');
      expect(screen.getByText((_, element) => element?.textContent === 'Product 1')).toBeInTheDocument();
      expect(screen.getByText((_, element) => element?.textContent === 'Product 2')).toBeInTheDocument();
    });
  });

  it('handles keyboard navigation', async () => {
    render(
      <ProductContext.Provider value={mockContextValue}>
        <AutocompleteInput />
      </ProductContext.Provider>
    );
    const input = screen.getByPlaceholderText('Search for products...');
    fireEvent.change(input, { target: { value: 'Product' } });
    await waitFor(() => {
      expect(screen.getByText((_, element) => element?.textContent === 'Product 1')).toBeInTheDocument();
    });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getByText((_, element) => element?.textContent === 'Product 1')?.closest('li')).toHaveClass('selected');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getByText((_, element) => element?.textContent === 'Product 2')?.closest('li')).toHaveClass('selected');
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(screen.getByText((_, element) => element?.textContent === 'Product 1')?.closest('li')).toHaveClass('selected');
  });

  it('selects all products on enter if no item is highlighted', async () => {
    render(
      <ProductContext.Provider value={mockContextValue}>
        <AutocompleteInput />
      </ProductContext.Provider>
    );
    const input = screen.getByPlaceholderText('Search for products...');
    fireEvent.change(input, { target: { value: 'Product' } });
    await waitFor(() => {
      expect(screen.getByText((_, element) => element?.textContent === 'Product 1')).toBeInTheDocument();
    });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(mockContextValue.setSelectedProducts).toHaveBeenCalledWith(mockProducts);
  });

  it('shows loading state', async () => {
    const loadingContextValue = { ...mockContextValue, isLoading: true };
    render(
      <ProductContext.Provider value={loadingContextValue}>
        <AutocompleteInput />
      </ProductContext.Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', async () => {
    const errorContextValue = { ...mockContextValue, error: 'Error fetching products' };
    render(
      <ProductContext.Provider value={errorContextValue}>
        <AutocompleteInput />
      </ProductContext.Provider>
    );
    expect(screen.getByText('Error fetching products')).toBeInTheDocument();
  });
});
