import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Use full Vue build with runtime template compiler so component
      // objects defined with `template: '<svg>...</svg>'` render correctly.
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  base: process.env.NODE_ENV === 'production' ? '/sitria/' : '/',
  server: {
    port: 5173,
    open: true
  }
})
