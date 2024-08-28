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
  const [error, setError] = useState<string | null>(null)
  const { products, searchProducts, setSelectedProducts } = useProductContext()
  const dropdownRef = useRef<HTMLUListElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputValue) {
      searchProducts(inputValue).catch(() => {
        setError('Network error occurred. Please try again.')
      })
      setShowDropdown(true)
    } else {
      setShowDropdown(false)
    }
  }, [inputValue, searchProducts])

  useEffect(() => {
    if (dropdownRef.current && selectedIndex >= 0) {
      const listItems = dropdownRef.current.querySelectorAll('li')
      if (listItems[selectedIndex]) {
        listItems[selectedIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        })
      }
    }
  }, [selectedIndex])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setSelectedIndex(-1)
  }

  const handleSelectProduct = (product: Product) => {
    setInputValue('')
    setSelectedProducts([product])
    setShowDropdown(false)
  }

  const handleSubmitSearch = () => {
    if (selectedIndex >= 0 && selectedIndex < products.length) {
      handleSelectProduct(products[selectedIndex])
    } else {
      setSelectedProducts(products)
    }
    setInputValue('')
    setShowDropdown(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < Math.min(products.length, 5) - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev > -1 ? prev - 1 : -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmitSearch()
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
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for products..."
      />
      {showDropdown && products.length > 0 && (
        <ul className="dropdown" ref={dropdownRef}>
          {products.slice(0, 5).map((product, index) => (
            <li 
              key={product.id} 
              onClick={() => handleSelectProduct(product)}
              className={index === selectedIndex ? 'selected' : ''}
            >
              <ProductImage src={product.image} alt={product.title} />
              <div className="product-info">
                <span className="product-title">{highlightMatch(product.title, inputValue)}</span>
                <p className="product-details">
                  <span className="price">${product.price}</span>
                  <span className="category">{product.category}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <Toast 
          message={error} 
          type="error" 
          onClose={() => setError(null)} 
        />
      )}
    </div>
  )
}