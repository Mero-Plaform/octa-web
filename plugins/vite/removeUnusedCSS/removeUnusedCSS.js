import { readFile, readdir, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

let buildConfig;

// removing ".dark" styles
export const removeUnusedCSS = (partialFilePath) => ({
  name: 'remove-unused-css',
  configResolved(resolvedConfig) {
    buildConfig = resolvedConfig.build;
  },
  async closeBundle() {
    const assetsPath = join(resolve("./"), buildConfig.outDir, buildConfig.assetsDir);
    const dir = await readdir(assetsPath);
    const cssFileToPurge = dir.filter((fileName) => fileName.includes(partialFilePath))[0];
    const cssFileToPurgePath = join(assetsPath, cssFileToPurge);
    const cssCodeToPurge = await readFile(cssFileToPurgePath);
    const purgedCSS = String(cssCodeToPurge).replace(/(:is\()?.dark.*?}/g, "");
    writeFile(cssFileToPurgePath, purgedCSS);
  }
});
