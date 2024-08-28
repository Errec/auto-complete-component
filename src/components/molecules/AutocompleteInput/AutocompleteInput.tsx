import React, { useEffect, useRef, useState } from 'react'
import { useProductContext } from '../../../hooks/useProductContext'
import { Product } from '../../../types/Product'
import { Input } from '../../atoms/Input/Input'
import { ProductImage } from '../../atoms/ProductImage/ProductImage'
import { Toast } from '../../atoms/Toast/Toast'
import './AutocompleteInput.scss'

export const AutocompleteInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const { products, searchProducts, setSelectedProducts, isLoading, error } = useProductContext()
  const dropdownRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (inputValue) {
      const debounceTimer = setTimeout(() => {
        searchProducts(inputValue);
        setShowDropdown(true);
      }, 300);
      return () => clearTimeout(debounceTimer);
    } else {
      setShowDropdown(false)
    }
  }, [inputValue, searchProducts])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setSelectedIndex(-1)
  }

  const handleSelectProduct = (product: Product) => {
    setInputValue(product.title)
    setSelectedProducts([product])
    setShowDropdown(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev < products.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > -1 ? prev - 1 : -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIndex >= 0 && selectedIndex < products.length) {
        handleSelectProduct(products[selectedIndex])
      } else if (products.length > 0) {
        handleSelectProduct(products[0])
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
    }
  }

  const highlightMatch = (text: string, query: string) => {
    const parts = text.split(new RegExp(`(${query})`, 'gi'))
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? <strong key={index}>{part}</strong> : part
    )
  }

  return (
    <div className="autocomplete-container">
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for products..."
      />
      {isLoading && <div className="loading">Loading...</div>}
      {error && <Toast message={error} type="error" onClose={() => {}} />}
      {showDropdown && products.length > 0 && (
        <ul className="dropdown" ref={dropdownRef}>
          {products.map((product, index) => (
            <li 
              key={product.id} 
              onClick={() => handleSelectProduct(product)}
              className={index === selectedIndex ? 'selected' : ''}
            >
              <ProductImage src={product.image} alt={product.title} />
              <div>
                <span>{highlightMatch(product.title, inputValue)}</span>
                <p>Price: ${product.price} | Category: {product.category}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}