import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path';

export default defineConfig({
  plugins: [svelte()],
  base: "./",
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
      },
      output: [
        {
          name: "main",
          dir: "dist",
        },
        {
          name: "main",
          dir: "../dictionary-electron/src/renderer/main",
        }
      ]
    },
  },
})
