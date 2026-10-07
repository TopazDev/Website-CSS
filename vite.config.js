import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import fileTree from './plugins/file-tree.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), fileTree()],
  // Le bundle principal embarque l'arborescence de public/ (~115 Ko)
  build: { chunkSizeWarningLimit: 600 },
})
