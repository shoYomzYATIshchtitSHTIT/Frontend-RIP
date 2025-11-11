import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "База музыкальных интервалов",
        short_name: "Интервалы",
        start_url: "/Frontend-RIP/", // Оставляем для GitHub Pages
        display: "standalone",
        background_color: "#7978F7",
        theme_color: "#7978F7",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/Frontend-RIP/img/logo192.png", // Оставляем для GitHub Pages
            type: "image/png",
            sizes: "192x192"
          },
          {
            src: "/Frontend-RIP/img/logo512.png", // Оставляем для GitHub Pages
            type: "image/png",
            sizes: "512x512"
          }
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  base: "/Frontend-RIP/", // Оставляем для GitHub Pages
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})