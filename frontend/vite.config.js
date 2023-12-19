import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:5173,
    host: '0.0.0.0',
    proxy:{
      '/api':{
        // target: 'http://172.17.0.2:5000',
        target: 'http://localhost:5000',
        // target: 'https:// 54.90.240.126:5000',
        changeOrigin: true
      }
    }
  }
})