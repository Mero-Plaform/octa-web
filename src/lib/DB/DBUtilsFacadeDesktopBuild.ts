import type { Word } from '../pages/dictionary/interfaces/Word.js';
import type { SettingsStore } from '../pages/practice/interfaces/settings.js';
import type { AppSettings } from '../pages/settings/interfaces/appSettings.js';
import type { YearData } from '../pages/statistic/interfaces/StatisticStore.js';
import type { Mutable } from '../shared/interfaces/basic.js';
import { DBUtilsFacade } from './DBUtilsFacade.js';
import { importAppDBData, initAppSettingsData, initPracticeData, initStatisticData, onAddWord, onDeleteWord, onDictionaryClear, onEditWord, updateAppSettingsData, updatePracticeData, updateStatistic } from './utils.js';

/* -------------------------------------------------------------------------- */
/*                             DB decorated utils                             */
/* -------------------------------------------------------------------------- */

const onAddWordObservable = (newWord: Word) => {
  window.electron?.ipcRenderer.send('onAddWord', newWord);
  return onAddWord(newWord);
};

const onEditWordObservable = (word: Word) => {
  window.electron?.ipcRenderer.send('onEditWord', word);
  return onEditWord(word);
};

const onDeleteWordObservable = (wordId: Word["id"]) => {
  window.electron?.ipcRenderer.send('onDeleteWord', wordId);
  return onDeleteWord(wordId);
};

const onDictionaryClearObservable = () => {
  window.electron?.ipcRenderer.send('onDictionaryClear');
  return onDictionaryClear();
};

const initStatisticDataObservable = (statisticInitialValues: YearData) => {
  window.electron?.ipcRenderer.send('initStatisticData', statisticInitialValues);
  return initStatisticData(statisticInitialValues);
};

const initPracticeDataObservable = (practiceInitialValues: SettingsStore) => {
  window.electron?.ipcRenderer.send('initPracticeData', practiceInitialValues);
  return initPracticeData(practiceInitialValues);
};

const updatePracticeDataObservable = (practiceData: SettingsStore) => {
  window.electron?.ipcRenderer.send('updatePracticeData', practiceData);
  return updatePracticeData(practiceData);
};

const updateStatisticObservable = (yearData: YearData) => {
  window.electron?.ipcRenderer.send('updateStatistic', yearData);
  return updateStatistic(yearData);
};

const initAppSettingsDataObservable = (appSettingsInitialValues: AppSettings) => {
  window.electron?.ipcRenderer.send('initAppSettingsData', appSettingsInitialValues);
  return initAppSettingsData(appSettingsInitialValues);
};

const updateAppSettingsDataObservable = (appSettingsData: AppSettings) => {
  window.electron?.ipcRenderer.send('updateAppSettingsData', appSettingsData);
  return updateAppSettingsData(appSettingsData);
};

const importAppDBDataObservable = (file: File) => {
  window.electron?.ipcRenderer.send('importAppDBData', file);
  return importAppDBData(file);
};

/* -------------------------------------------------------------------------- */
/*                         DB utils facade decoration                         */
/* -------------------------------------------------------------------------- */

export const initDBUtilsFacadeDesktopBuild = () => {
  (DBUtilsFacade as Mutable<typeof DBUtilsFacade>).onAddWord = onAddWordObservable;
  (DBUtilsFacade as Mutable<typeof DBUtilsFacade>).onEditWord = onEditWordObservable;
  (DBUtilsFacade as Mutable<typeof DBUtilsFacade>).onDeleteWord = onDeleteWordObservable;
  (DBUtilsFacade as Mutable<typeof DBUtilsFacade>).onDictionaryClear = onDictionaryClearObservable;
  (DBUtilsFacade as Mutable<typeof DBUtilsFacade>).initStatisticData = initStatisticDataObservable;
  (DBUtilsFacade as Mutable<typeof DBUtilsFacade>).initPracticeData = initPracticeDataObservable;
  (DBUtilsFacade as Mutable<typeof DBUtilsFacade>).updatePracticeData = updatePracticeDataObservable;
  (DBUtilsFacade as Mutable<typeof DBUtilsFacade>).updateStatistic = updateStatisticObservable;
  (DBUtilsFacade as Mutable<typeof DBUtilsFacade>).initAppSettingsData = initAppSettingsDataObservable;
  (DBUtilsFacade as Mutable<typeof DBUtilsFacade>).updateAppSettingsData = updateAppSettingsDataObservable;
  (DBUtilsFacade as Mutable<typeof DBUtilsFacade>).importAppDBData = importAppDBDataObservable;
};
