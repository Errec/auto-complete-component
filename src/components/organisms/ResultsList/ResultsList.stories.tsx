import type { Meta, StoryObj } from '@storybook/react';
import { ProductContext } from '../../../context/ProductContext';
import { ResultsList } from './ResultsList';

const meta: Meta<typeof ResultsList> = {
  component: ResultsList,
  title: 'Organisms/ResultsList',
  decorators: [
    (Story) => (
      <ProductContext.Provider value={{
        products: [
          { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'https://picsum.photos/200' },
          { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'https://picsum.photos/200' },
        ],
        selectedProducts: [
          { id: 1, title: 'Product 1', price: 10, description: 'Description 1', category: 'Category 1', image: 'https://picsum.photos/200' },
          { id: 2, title: 'Product 2', price: 20, description: 'Description 2', category: 'Category 2', image: 'https://picsum.photos/200' },
        ],
        searchProducts: async () => {},
        setSelectedProducts: () => {},
        isLoading: false,
        error: null,
      }}>
        <Story />
      </ProductContext.Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ResultsList>;

export const Default: Story = {};