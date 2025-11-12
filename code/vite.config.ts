import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Build optimizations
  build: {
    // Generate source maps for production debugging
    sourcemap: true,
    
    // Optimize bundle splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // Enable minification
    minify: 'terser',
  },
  
  // Development server configuration
  server: {
    port: 5173,
    host: true, // Allow external connections
    open: true, // Auto-open browser
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    host: true,
  },
  
  // Path resolution
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@data': resolve(__dirname, 'src/data'),
      '@types': resolve(__dirname, 'src/types'),
    },
  },
  
  // CSS configuration
  css: {
    devSourcemap: true,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react',
    ],
  },
})
