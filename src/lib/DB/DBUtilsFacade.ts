import { exportAppDBData, getAppSettings, getDictionaryDataAsArray, getPracticeData, getStatisticDataAsArray, importAppDBData, initAppSettingsData, initPracticeData, initStatisticData, onAddWord, onDeleteWord, onDictionaryClear, onEditWord, onStatisticClear, updateAppSettingsData, updatePracticeData, updateStatistic } from './utils.js';

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
} as const;
