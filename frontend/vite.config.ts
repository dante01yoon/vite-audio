import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  esbuild: {
    jsxInject: `import React from "react"`
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/utils') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/assets') },
      { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') }
    ]
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api/': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react()]
});
