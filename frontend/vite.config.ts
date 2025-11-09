// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Проксируем /api → http://localhost:8000 (ваш Go-бэкенд)
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // rewrite не обязателен — ваш API уже на /api
        // но можно оставить явно для ясности:
        rewrite: (path) => path,
      },
    },
  },
});