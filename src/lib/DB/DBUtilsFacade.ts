import { getIdleModeData, initIdleModeData, updateIdleModeData, exportAppDBData, getAppSettings, getDictionaryDataAsArray, getPracticeData, getStatisticDataAsArray, importAppDBData, initAppSettingsData, initPracticeData, initStatisticData, onAddWord, onDeleteWord, onDictionaryClear, onEditWord, onStatisticClear, updateAppSettingsData, updatePracticeData, updateStatistic } from './utils.js';

/**
 * used to access correct DB-API in certain mode (e.g. web | desktop) 
 */
export const DBUtilsFacade = {
  onAddWord,
  onEditWord,
  onDeleteWord,
  getDictionaryDataAsArray,
  onDictionaryClear,
  getPracticeData,
  initPracticeData,
  updatePracticeData,
  updateStatistic,
  getStatisticDataAsArray,
  initStatisticData,
  onStatisticClear,
  exportAppDBData,
  importAppDBData,
  getAppSettings,
  initAppSettingsData,
  updateAppSettingsData,
  getIdleModeData,
  initIdleModeData,
  updateIdleModeData,
} as const;
