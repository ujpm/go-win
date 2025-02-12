import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react-icons']
  },
  optimizeDeps: {
    include: ['react-icons']
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    // Ensure assets are properly handled
    assetsDir: 'assets',
    // Add hash to file names for cache busting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  // Base URL configuration
  base: '/',
})
