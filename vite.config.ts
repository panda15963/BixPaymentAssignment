import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api-mission.bigs.or.kr', // ✅ 백엔드
        changeOrigin: true,
        secure: true,
      },
      '/media': {
        target: 'https://api-mission.bigs.or.kr', // ✅ 백엔드
        changeOrigin: true,
        secure: true,
      },
    },
  },
});