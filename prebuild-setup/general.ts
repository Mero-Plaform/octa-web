import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const ENV_FILE_NOTE = "#File is rewriting every time by running build:x scripts\n#to reinstall 'VITE_BUILD_PLATFORM' variable\n\n";
export const ENV_FILE_PATH = resolve(__dirname, "../.env");
export const getEnvBuildVariable = (platform) => ENV_FILE_NOTE + `VITE_BUILD_PLATFORM=${platform}`;
