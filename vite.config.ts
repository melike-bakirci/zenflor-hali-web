import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://zenflor.com', // TODO: Update with actual domain
      dynamicRoutes: [
        '/karo-hali',
        '/cim-hali',
        '/hakkimizda',
        '/referanslar',
        '/blog',
        '/iletisim',
        '/gizlilik',
        '/kosullar',
        '/kvkk',
        '/cerez-politikasi'
      ]
    })
  ],
})
