import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/presentasi-laboratorium-inovasi-digital/' : '/',
  server: {
    port: 5173,
    open: true
  }
})
