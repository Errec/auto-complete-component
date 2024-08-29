import React, { useEffect, useRef, useState } from 'react';
import { useProductContext } from '../../../hooks/useProductContext';
import { Product } from '../../../types/Product';
import { Input } from '../../atoms/Input/Input';
import { ProductImage } from '../../atoms/ProductImage/ProductImage';
import { Toast } from '../../atoms/Toast/Toast';
import './AutocompleteInput.scss';

export const AutocompleteInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null); // Change to null initially
  const { products, searchProducts, setSelectedProducts, isLoading, error } = useProductContext();
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (inputValue) {
      const debounceTimer = setTimeout(() => {
        searchProducts(inputValue);
        setShowDropdown(true);
      }, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      setShowDropdown(false);
    }
  }, [inputValue, searchProducts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedIndex(null); // Reset selection
  };

  const handleSelectProduct = (product: Product | Product[]) => {
    if (Array.isArray(product)) {
      setSelectedProducts(product);
    } else {
      setSelectedProducts([product]);
    }
    setInputValue('');  // Clear the input value
    setShowDropdown(false);  // Hide the dropdown
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const nextIndex = prev === null ? 0 : Math.min(prev + 1, products.length - 1);
        if (dropdownRef.current && dropdownRef.current.children[nextIndex]) {
          dropdownRef.current.children[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        return nextIndex;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const nextIndex = prev === 0 ? null : prev === null ? null : prev - 1;
        if (nextIndex !== null && dropdownRef.current && dropdownRef.current.children[nextIndex]) {
          dropdownRef.current.children[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        return nextIndex;
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex !== null && selectedIndex >= 0 && selectedIndex < products.length) {
        handleSelectProduct(products[selectedIndex]);
      } else {
        handleSelectProduct(products);
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? <strong key={index}>{part}</strong> : part
    );
  };

  return (
    <div className="autocomplete-container">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for products..."
      />
      {isLoading && <div className="autocomplete-container__loading">Loading...</div>}
      {error && <Toast message={error} type="error" onClose={() => {}} />}
      {showDropdown && products.length > 0 && (
        <ul className="autocomplete-container__dropdown" ref={dropdownRef}>
          {products.map((product, index) => (
            <li 
              key={product.id} 
              className={`autocomplete-container__dropdown__item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSelectProduct(product)}
            >
              <div className="autocomplete-container__dropdown__item__image-wrapper">
                <ProductImage src={product.image} alt={product.title} />
              </div>
              <div className="autocomplete-container__dropdown__item__content">
                <span className="autocomplete-container__dropdown__item__content__title">
                  {highlightMatch(product.title, inputValue)}
                </span>
                <p className="autocomplete-container__dropdown__item__content__details">
                  <span className="autocomplete-container__dropdown__item__content__details__price">
                    ${product.price}
                  </span>
                  <span className="autocomplete-container__dropdown__item__content__details__category">
                    {product.category}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && products.length === 0 && showDropdown && (
        <div className="autocomplete-container__dropdown__no-results">
          No results for this search
        </div>
      )}
    </div>
  );
};
