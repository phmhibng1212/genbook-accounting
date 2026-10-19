import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // relative asset URLs, so the build also works from a sub-path or a shared preview link
  base: './',
  plugins: [react()],
})
