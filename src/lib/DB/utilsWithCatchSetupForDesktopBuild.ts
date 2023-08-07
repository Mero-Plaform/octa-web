import type { Word } from '../pages/dictionary/interfaces/Word.js';
import type { SettingsStore } from '../pages/practice/interfaces/settings.js';
import type { AppSettings } from '../pages/settings/interfaces/appSettings.js';
import type { YearData } from '../pages/statistic/interfaces/StatisticStore.js';
import { RunPromiseWithCatch } from '../utils/helpers.js';
import { importAppDBData, initAppSettingsData, initPracticeData, initStatisticData, onAddWord, onAppSettingsClear, onDeleteWord, onDictionaryClear, onEditWord, onStatisticClear, updateAppSettingsData, updatePracticeData, updateStatistic } from './utils.js';
import { utilsWithCatch } from './utilsWithCatch.js';

// declare global {
//   interface Window {
//     electron: { ipcRenderer: { send: (channel: string, ...data: unknown[]) => void; } }
//   }
// }

/* -------------------------------------------------------------------------- */
/*                               decorated utils                              */
/* -------------------------------------------------------------------------- */

const onAddWordObservable = (newWord: Word) => {
  window.electron.ipcRenderer.send('onAddWord', newWord);
  return onAddWord(newWord);
};

const onEditWordObservable = (word: Word) => {
  window.electron.ipcRenderer.send('onEditWord', word);
  return onEditWord(word);
};

const onDeleteWordObservable = (wordId: Word["id"]) => {
  window.electron.ipcRenderer.send('onDeleteWord', wordId);
  return onDeleteWord(wordId);
};

const onDictionaryClearObservable = () => {
  window.electron.ipcRenderer.send('onDictionaryClear');
  return onDictionaryClear();
};

const initStatisticDataObservable = (statisticInitialValues: YearData) => {
  window.electron.ipcRenderer.send('initStatisticData', statisticInitialValues);
  return initStatisticData(statisticInitialValues);
};

const onStatisticClearObservable = () => {
  window.electron.ipcRenderer.send('onStatisticClear');
  return onStatisticClear();
};

const initPracticeDataObservable = (practiceInitialValues: SettingsStore) => {
  window.electron.ipcRenderer.send('initPracticeData', practiceInitialValues);
  return initPracticeData(practiceInitialValues);
};

const updatePracticeDataObservable = (practiceData: SettingsStore) => {
  window.electron.ipcRenderer.send('updatePracticeData', practiceData);
  return updatePracticeData(practiceData);
};

const updateStatisticObservable = (yearData: YearData) => {
  window.electron.ipcRenderer.send('updateStatistic', yearData);
  return updateStatistic(yearData);
};

const initAppSettingsDataObservable = (appSettingsInitialValues: AppSettings) => {
  window.electron.ipcRenderer.send('initAppSettingsData', appSettingsInitialValues);
  return initAppSettingsData(appSettingsInitialValues);
};

const updateAppSettingsDataObservable = (appSettingsData: AppSettings) => {
  window.electron.ipcRenderer.send('updateAppSettingsData', appSettingsData);
  return updateAppSettingsData(appSettingsData);
};

const onAppSettingsClearObservable = () => {
  window.electron.ipcRenderer.send('onAppSettingsClear');
  return onAppSettingsClear();
};

const importAppDBDataObservable = (file: File) => {
  window.electron.ipcRenderer.send('importAppDBData', file);
  return importAppDBData(file);
};

/* -------------------------------------------------------------------------- */
/*                            decorated utils setup                           */
/* -------------------------------------------------------------------------- */

export const initUtilsWithCatchSetupForDesktopBuild = () => {
  utilsWithCatch.set("onAddWord", (...params) => RunPromiseWithCatch(onAddWordObservable, params));
  utilsWithCatch.set("onEditWord", (...params) => RunPromiseWithCatch(onEditWordObservable, params));
  utilsWithCatch.set("onDeleteWord", (...params) => RunPromiseWithCatch(onDeleteWordObservable, params));
  utilsWithCatch.set("onDictionaryClear", (...params) => RunPromiseWithCatch(onDictionaryClearObservable, params));
  utilsWithCatch.set("initStatisticData", (...params) => RunPromiseWithCatch(initStatisticDataObservable, params));
  utilsWithCatch.set("onStatisticClear", (...params) => RunPromiseWithCatch(onStatisticClearObservable, params));
  utilsWithCatch.set("initPracticeData", (...params) => RunPromiseWithCatch(initPracticeDataObservable, params));
  utilsWithCatch.set("updatePracticeData", (...params) => RunPromiseWithCatch(updatePracticeDataObservable, params));
  utilsWithCatch.set("updateStatistic", (...params) => RunPromiseWithCatch(updateStatisticObservable, params));
  utilsWithCatch.set("initAppSettingsData", (...params) => RunPromiseWithCatch(initAppSettingsDataObservable, params));
  utilsWithCatch.set("updateAppSettingsData", (...params) => RunPromiseWithCatch(updateAppSettingsDataObservable, params));
  utilsWithCatch.set("onAppSettingsClear", (...params) => RunPromiseWithCatch(onAppSettingsClearObservable, params));
  utilsWithCatch.set("importAppDBData", (...params) => RunPromiseWithCatch(importAppDBDataObservable, params));
};
