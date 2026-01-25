import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://front-mission.bigs.or.kr',
        changeOrigin: true,
        secure: true,
      },
      '/media': {
        target: 'https://front-mission.bigs.or.kr',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});