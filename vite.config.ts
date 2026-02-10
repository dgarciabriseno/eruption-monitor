import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const base = '/eruption-monitor/'

export default defineConfig({
  plugins: [react()],
  base,
  define: {
    __BASE_URL__: JSON.stringify(base),
  },
})
