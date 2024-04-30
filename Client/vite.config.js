import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:5173,
    proxy: {
      '/api': {
        target: 'http://localhost:4242', // API server address
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
