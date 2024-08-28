import React from 'react'
import './ProductImage.scss'

interface ProductImageProps {
  src: string
  alt: string
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, alt }) => {
  return <img className="product-image" src={src} alt={alt} />
}