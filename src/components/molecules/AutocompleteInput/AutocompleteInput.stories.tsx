import type { Meta, StoryObj } from '@storybook/react';
import { ProductProvider } from '../../../context/ProductContext';
import { AutocompleteInput } from './AutocompleteInput';

const meta: Meta<typeof AutocompleteInput> = {
  component: AutocompleteInput,
  title: 'Molecules/AutocompleteInput',
  decorators: [
    (Story) => (
      <ProductProvider>
        <Story />
      </ProductProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AutocompleteInput>;

export const Default: Story = {};