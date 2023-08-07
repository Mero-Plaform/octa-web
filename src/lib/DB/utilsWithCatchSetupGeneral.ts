import { RunPromiseWithCatch } from '../utils/helpers.js';
import { exportAppDBData, getAppSettings, getDictionaryDataAsArray, getPracticeData, getStatisticDataAsArray } from './utils.js';
import { utilsWithCatch } from './utilsWithCatch.js';

/* -------------------------------------------------------------------------- */
/*                              general utils setup                           */
/* -------------------------------------------------------------------------- */

export const initUtilsWithCatchSetupGeneral = () => {
  utilsWithCatch.set("getDictionaryDataAsArray", (...params) => RunPromiseWithCatch(getDictionaryDataAsArray, params));
  utilsWithCatch.set("getPracticeData", (...params) => RunPromiseWithCatch(getPracticeData, params));
  utilsWithCatch.set("getStatisticDataAsArray", (...params) => RunPromiseWithCatch(getStatisticDataAsArray, params));
  utilsWithCatch.set("exportAppDBData", (...params) => RunPromiseWithCatch(exportAppDBData, params));
  utilsWithCatch.set("getAppSettings", (...params) => RunPromiseWithCatch(getAppSettings, params));
};
