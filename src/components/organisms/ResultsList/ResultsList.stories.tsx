import type { Meta, StoryObj } from '@storybook/react';
import { ProductProvider } from '../../../context/ProductContext';
import { ResultsList } from './ResultsList';

const meta: Meta<typeof ResultsList> = {
  component: ResultsList,
  title: 'Organisms/ResultsList',
  decorators: [
    (Story) => (
      <ProductProvider>
        <Story />
      </ProductProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ResultsList>;

export const Default: Story = {};