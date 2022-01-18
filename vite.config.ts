import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

/** 
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  esbuild: {
    jsxInject: `import React from "react"`,
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src")},
      { find: "@components", replacement: path.resolve(__dirname, "src/components")},
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages")},
      { find: "@utils", replacement: path.resolve(__dirname, "src/utils")}
    ]
  },
  server: {
    host: true,
  },
  plugins: [react()]
})
