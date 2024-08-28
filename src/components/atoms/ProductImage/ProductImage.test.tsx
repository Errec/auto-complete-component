import { render } from '@testing-library/react';
import { ProductImage } from './ProductImage';

describe('ProductImage', () => {
  it('renders without crashing', () => {
    render(<ProductImage src="test.jpg" alt="Test image" />);
  });
});