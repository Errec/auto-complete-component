import type { Meta, StoryObj } from '@storybook/react';
import { ProductProvider } from '../../../context/ProductContext';
import { ProductSearch } from './ProductSearch';

const meta: Meta<typeof ProductSearch> = {
  component: ProductSearch,
  title: 'Templates/ProductSearch',
  decorators: [
    (Story) => (
      <ProductProvider>
        <Story />
      </ProductProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductSearch>;

export const Default: Story = {};