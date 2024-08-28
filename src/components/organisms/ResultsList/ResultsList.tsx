import React, { useState } from 'react'
import { useProductContext } from '../../../hooks/useProductContext'
import { ProductImage } from '../../atoms/ProductImage/ProductImage'
import './ResultsList.scss'

export const ResultsList: React.FC = () => {
  const { selectedProducts } = useProductContext()
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 10

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = selectedProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (selectedProducts.length === 0) {
    return null
  }

  return (
    <div className="results-container">
      <div className="product-grid">
        {currentProducts.map((product) => (
          <div key={product.id} className="product-card">
            <ProductImage src={product.image} alt={product.title} />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <p className="product-category">{product.category}</p>
          </div>
        ))}
      </div>
      {selectedProducts.length > productsPerPage && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(selectedProducts.length / productsPerPage) }).map((_, index) => (
            <button 
              key={index} 
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}