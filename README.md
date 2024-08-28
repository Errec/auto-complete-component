# Product Search Application

This is a React-based product search application that allows users to search for products using an autocomplete input. The application uses the Fake Store API to fetch product data.

## Features

- Autocomplete search input
- Product list display with pagination
- Responsive design
- Keyboard navigation support

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/product-search-app.git
   cd product-search-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To start the development server:

```
npm run dev
```

The application will be available at `http://localhost:5173`.

## Running Storybook

To start Storybook:

```
npm run storybook
```

Storybook will be available at `http://localhost:6006`.

## Running Tests

To run tests:

```
npm test
```

To run tests in watch mode:

```
npm run test:watch
```

## API Information

This application uses the [Fake Store API](https://fakestoreapi.com/) to fetch product data. The API provides mock data for an e-commerce website, including product information such as title, price, description, and image URLs.

Key endpoints used:

- `GET /products`: Fetch all products
- `GET /products?limit=<number>`: Fetch a limited number of products

For more information about the API, visit the [Fake Store API documentation](https://fakestoreapi.com/docs).

## Project Structure

The project follows the Atomic Design methodology:

- `src/components/atoms`: Basic building blocks (e.g., Input, ProductImage)
- `src/components/molecules`: Combinations of atoms (e.g., AutocompleteInput)
- `src/components/organisms`: Combinations of molecules and atoms (e.g., ResultsList)
- `src/components/templates`: Page layouts
- `src/styles`: Global styles and variables

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).