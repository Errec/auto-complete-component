import type { Meta, StoryObj } from '@storybook/react';
import { ProductImage } from './ProductImage';

const meta: Meta<typeof ProductImage> = {
  component: ProductImage,
  title: 'Atoms/ProductImage',
};

export default meta;
type Story = StoryObj<typeof ProductImage>;

export const Default: Story = {
  args: {
    src: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    alt: 'Product Image',
  },
};