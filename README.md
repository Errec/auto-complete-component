# Product Search Application

A React-based product search application with autocomplete functionality.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later) or Yarn (v1.22 or later)

## Installation

1. Clone or download the project to your local machine.

2. Navigate to the project directory:
   ```
   cd product-search-application
   ```

3. Install dependencies:
   ```
   npm install
   ```
   or if using Yarn:
   ```
   yarn install
   ```

## Running the Application

To start the development server:

```
npm run dev
```
or with Yarn:
```
yarn dev
```

The application will be available at `http://localhost:5173` (or the port specified by Vite).

## Running Tests

To run tests:

```
npm test
```
or with Yarn:
```
yarn test
```

## Running Storybook

To start Storybook:

```
npm run storybook
```
or with Yarn:
```
yarn storybook
```

Storybook will be available at `http://localhost:6006`.

## Building for Production

To create a production build:

```
npm run build
```
or with Yarn:
```
yarn build
```

The built files will be in the `dist` directory.

## Project Structure

- `/src`: Source code
  - `/components`: React components
  - `/context`: React context files
  - `/services`: API services
  - `/types`: TypeScript type definitions
- `/public`: Static assets
- `vite.config.ts`: Vite configuration
- `tsconfig.json`: TypeScript configuration