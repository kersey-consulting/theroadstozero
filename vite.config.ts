import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const pages = JSON.parse(
    fs.readFileSync('pages.json', 'utf-8')
)

const input = Object.fromEntries(
    pages.map((page: any) => [
      page.html.replace('.html', ''),
      path.resolve(__dirname, page.html),
    ])
)

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      input,
    },
  },
})
