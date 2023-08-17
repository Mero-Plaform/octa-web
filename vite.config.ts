import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { transformHtmlPlugin } from './plugins/vite/HTMLPlugin/HTMLPlugin.js';
import { loadingScreenTemplate } from './plugins/vite/HTMLPlugin/loadingScreenTemplate.js';
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const webLoadingScreenTemplate = env.VITE_BUILD_PLATFORM === "web" ? loadingScreenTemplate : "";
  
  return {
    plugins: [
      svelte(),
      transformHtmlPlugin({ LOADING_SCREEN: webLoadingScreenTemplate }),
      ViteMinifyPlugin()
    ],
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
            dir: "../dictionary-electron/src/renderer/mainWindow",
          }
        ]
      },
    },
  };
});
