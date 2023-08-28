import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { transformHtmlPlugin } from './plugins/vite/HTMLPlugin/HTMLPlugin.js';
import { loadingScreenTemplate } from './plugins/vite/HTMLPlugin/loadingScreenTemplate.js';
import { appRootStyles } from './plugins/vite/HTMLPlugin/appRootStyles.js';
import { ViteMinifyPlugin } from "vite-plugin-minify";

type ENV = {
  VITE_BUILD_PLATFORM: "desktop" | "web";
};

export default defineConfig(({ mode }) => {
  const env = <ENV>loadEnv(mode, process.cwd(), 'VITE_');
  
  return {
    plugins: [
      svelte(),
      transformHtmlPlugin({ 
        LOADING_SCREEN: env.VITE_BUILD_PLATFORM === "web" ? loadingScreenTemplate : "", 
        APP_ROOT_STYLES: env.VITE_BUILD_PLATFORM === "desktop" ? appRootStyles : "",
      }),
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
            dir: "../octa-electron/src/renderer/mainWindow",
          }
        ]
      },
    },
  };
});
