import React from 'react'
import { AutocompleteInput } from '../../molecules/AutocompleteInput/AutocompleteInput'
import { ResultsList } from '../../organisms/ResultsList/ResultsList'
import './ProductSearch.scss'

export const ProductSearch: React.FC = () => {
  return (
    <div className="product-search">
      <h1>Product Search</h1>
      <AutocompleteInput />
      <ResultsList />
    </div>
  )
}