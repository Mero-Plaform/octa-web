import { writeFile } from 'node:fs/promises';
import { ENV_FILE_PATH, getEnvBuildVariable } from './general';

const PLATFORM = "desktop";

writeFile(ENV_FILE_PATH, getEnvBuildVariable(PLATFORM))
  .catch(err => console.log(err));
