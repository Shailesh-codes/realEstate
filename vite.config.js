import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias:{
      '@': '/src',

    },
  },
  server:{
    port: 7777,
    host: '0.0.0.0',
  }
})