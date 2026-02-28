// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // your frontend dev server port
    hmr: {
      host: 'localhost',
      port: 5173, // match frontend port to avoid ws://8081
    },
  },
});