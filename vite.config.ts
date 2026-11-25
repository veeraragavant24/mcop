import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },

  server: {
    watch: {
      ignored: [
        '**/backend/**',
        '**/wwwroot/**',
        '**/uploads/**',
        '**/*.~tmp',
        '**/*.tmp',
        '**/node_modules/**',
        '**/.git/**',
      ],
    },

    proxy: {
      '/api': {
        target: 'http://localhost:5196',
        changeOrigin: true,
      },
    },
  },
});