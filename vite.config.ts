import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { ViteMinifyPlugin } from "vite-plugin-minify";
import { transformHtmlPlugin } from './plugins/vite/HTMLPlugin/HTMLPlugin.js';
import { appRootStyles } from './plugins/vite/HTMLPlugin/appRootStyles.js';
import { loadingScreenTemplate } from './plugins/vite/HTMLPlugin/loadingScreenTemplate.js';
import { removeUnusedCSS } from './plugins/vite/removeUnusedCSS/removeUnusedCSS.js';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

type ENV = {
  VITE_BUILD_PLATFORM: "desktop" | "web";
};

const generalBuildDirs = [
  {
    name: "main",
    dir: "dist",
  }
];

const additionalDesktopBuildDirs = [
  {
    name: "main",
    dir: "../octa-electron/src/renderer/mainWindow",
  }
];

const additionalWebBuildDirs = [
  {
    name: "main",
    dir: "../octa-web-build/",
  }
];

export default defineConfig(({ mode }) => {
  const env = <ENV>loadEnv(mode, process.cwd(), 'VITE_');

  const buildDirs = [...generalBuildDirs];
  env.VITE_BUILD_PLATFORM === "web" && buildDirs.push(...additionalWebBuildDirs);
  env.VITE_BUILD_PLATFORM === "desktop" && buildDirs.push(...additionalDesktopBuildDirs);

  return {
    plugins: [
      svelte(),
      transformHtmlPlugin({
        LOADING_SCREEN: env.VITE_BUILD_PLATFORM === "web" ? loadingScreenTemplate : "",
        APP_ROOT_STYLES: env.VITE_BUILD_PLATFORM === "desktop" ? appRootStyles : "",
      }),
      ViteMinifyPlugin(),
      removeUnusedCSS(),
      ViteImageOptimizer(),
    ],
    base: "./",
    build: {
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, './index.html'),
        },
        output: buildDirs
      },
      chunkSizeWarningLimit: 1000
    },
  };
});
