import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
      plugins: [react(), tailwindcss()],
      server: {
            proxy: {
                  '/api': {
                        target: 'http://localhost:9883',
                        changeOrigin: true,
                        secure: false, 
                        rewrite: (path) => path.replace(/^\/api/, '') 
                  },
            },
      },
});
