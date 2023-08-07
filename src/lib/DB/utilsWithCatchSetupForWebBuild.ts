import { RunPromiseWithCatch } from '../utils/helpers.js';
import { exportAppDBData, getAppSettings, getDictionaryDataAsArray, getPracticeData, getStatisticDataAsArray, importAppDBData, initAppSettingsData, initPracticeData, initStatisticData, onAddWord, onAppSettingsClear, onDeleteWord, onDictionaryClear, onEditWord, onStatisticClear, updateAppSettingsData, updatePracticeData, updateStatistic } from './utils.js';
import { utilsWithCatch } from './utilsWithCatch.js';

/* -------------------------------------------------------------------------- */
/*                              web utils setup                               */
/* -------------------------------------------------------------------------- */

export const initUtilsWithCatchSetupForWebBuild = () => {
  utilsWithCatch.set("onAddWord", (...params) => RunPromiseWithCatch(onAddWord, params));
  utilsWithCatch.set("onEditWord", (...params) => RunPromiseWithCatch(onEditWord, params));
  utilsWithCatch.set("onDeleteWord", (...params) => RunPromiseWithCatch(onDeleteWord, params));
  utilsWithCatch.set("getDictionaryDataAsArray", (...params) => RunPromiseWithCatch(getDictionaryDataAsArray, params));
  utilsWithCatch.set("onDictionaryClear", (...params) => RunPromiseWithCatch(onDictionaryClear, params));
  utilsWithCatch.set("getPracticeData", (...params) => RunPromiseWithCatch(getPracticeData, params));
  utilsWithCatch.set("initPracticeData", (...params) => RunPromiseWithCatch(initPracticeData, params));
  utilsWithCatch.set("updatePracticeData", (...params) => RunPromiseWithCatch(updatePracticeData, params));
  utilsWithCatch.set("getStatisticDataAsArray", (...params) => RunPromiseWithCatch(getStatisticDataAsArray, params));
  utilsWithCatch.set("updateStatistic", (...params) => RunPromiseWithCatch(updateStatistic, params));
  utilsWithCatch.set("onStatisticClear", (...params) => RunPromiseWithCatch(onStatisticClear, params));
  utilsWithCatch.set("initStatisticData", (...params) => RunPromiseWithCatch(initStatisticData, params));
  utilsWithCatch.set("exportAppDBData", (...params) => RunPromiseWithCatch(exportAppDBData, params));
  utilsWithCatch.set("importAppDBData", (...params) => RunPromiseWithCatch(importAppDBData, params));
  utilsWithCatch.set("getAppSettings", (...params) => RunPromiseWithCatch(getAppSettings, params));
  utilsWithCatch.set("initAppSettingsData", (...params) => RunPromiseWithCatch(initAppSettingsData, params));
  utilsWithCatch.set("updateAppSettingsData", (...params) => RunPromiseWithCatch(updateAppSettingsData, params));
  utilsWithCatch.set("onAppSettingsClear", (...params) => RunPromiseWithCatch(onAppSettingsClear, params));
};
