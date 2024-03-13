import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    sourcemap: true,
    target: 'es2020',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
  plugins: [react()],
  publicDir: 'public',
  server: {
    host: true,
    open: true,
  },
})
