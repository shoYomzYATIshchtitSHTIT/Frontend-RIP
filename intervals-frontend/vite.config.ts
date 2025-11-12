import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { api_proxy_addr, img_proxy_addr } from './src/target_config'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
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
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],

  server: {
    port: 3000,
    host: true,
    proxy: {
      '/api': {
        target: api_proxy_addr,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/'),
      },
      '/img-proxy': {
        target: img_proxy_addr,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/img-proxy/, '/'),
      },
    },
  },
})
