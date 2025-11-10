import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/Frontend-RIP/', // <-- имя репозитория
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "База музыкальных интервалов",
        short_name: "Интервалы",
        start_url: "/",
        display: "standalone",
        background_color: "#7978F7",
        theme_color: "#7978F7",
        orientation: "portrait-primary",
        icons: [
          { src: "/img/logo192.png", type: "image/png", sizes: "192x192" },
          { src: "/img/logo512.png", type: "image/png", sizes: "512x512" }
        ],
      },
    })
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
