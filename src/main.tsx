import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from './components/organisms/ErrorBoundary/ErrorBoundary'
import { ProductProvider } from './context/ProductContext'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ProductProvider>
        <App />
      </ProductProvider>
    </ErrorBoundary>
  </React.StrictMode>,
)