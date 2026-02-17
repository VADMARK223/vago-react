import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/v2/' : '/v2',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5555',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // если у тебя web-socket чат, можно так:
      // "/ws": { target: "ws://localhost:8080", ws: true },
    },
  },
}));
