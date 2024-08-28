import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      // Add more aliases as needed
    },
  },
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
