import type { Word } from '../pages/dictionary/interfaces/Word.js';
import type { SettingsStore } from '../pages/practice/interfaces/settings.js';
import type { AppSettings } from '../pages/settings/interfaces/appSettings.js';
import type { IdleMode } from "../pages/settings/interfaces/idleMode.js";
import type { YearData } from '../pages/statistic/interfaces/StatisticStore.js';
import { sendToIpcMain } from '../shared/desktopAppBuild/ipcUtils.js';
import type { Mutable } from '../shared/interfaces/basic.js';
import { DBUtilsFacade } from './DBUtilsFacade.js';
import { importAppDBData, initAppSettingsData, initIdleModeData, initPracticeData, initStatisticData, onAddWord, onDeleteWord, onDictionaryClear, onEditWord, updateAppSettingsData, updateIdleModeData, updatePracticeData, updateStatistic } from './utils.js';

/* -------------------------------------------------------------------------- */
/*                             DB decorated utils                             */
/* -------------------------------------------------------------------------- */

const onAddWordObservable = (newWord: Word) => {
  sendToIpcMain('onAddWord', newWord);
  return onAddWord(newWord);
};

const onEditWordObservable = (word: Word) => {
  sendToIpcMain('onEditWord', word);
  return onEditWord(word);
};

const onDeleteWordObservable = (wordId: Word["id"]) => {
  sendToIpcMain('onDeleteWord', wordId);
  return onDeleteWord(wordId);
};

const onDictionaryClearObservable = () => {
  sendToIpcMain('onDictionaryClear');
  return onDictionaryClear();
};

const initStatisticDataObservable = (statisticInitialValues: YearData) => {
  sendToIpcMain('initStatisticData', statisticInitialValues);
  return initStatisticData(statisticInitialValues);
};

const initPracticeDataObservable = (practiceInitialValues: SettingsStore) => {
  sendToIpcMain('initPracticeData', practiceInitialValues);
  return initPracticeData(practiceInitialValues);
};

const updatePracticeDataObservable = (practiceData: SettingsStore) => {
  sendToIpcMain('updatePracticeData', practiceData);
  return updatePracticeData(practiceData);
};

const updateStatisticObservable = (yearData: YearData) => {
  sendToIpcMain('updateStatistic', yearData);
  return updateStatistic(yearData);
};

const initAppSettingsDataObservable = (appSettingsInitialValues: AppSettings) => {
  sendToIpcMain('initAppSettingsData', appSettingsInitialValues);
  return initAppSettingsData(appSettingsInitialValues);
};

const updateAppSettingsDataObservable = (appSettingsData: AppSettings) => {
  sendToIpcMain('updateAppSettingsData', appSettingsData);
  return updateAppSettingsData(appSettingsData);
};

const initIdleModeDataObservable = (idleModeInitialValues: IdleMode) => {
  sendToIpcMain('initIdleModeData', idleModeInitialValues);
  return initIdleModeData(idleModeInitialValues);
};

const updateIdleModeDataObservable = (idleModeData: IdleMode) => {
  sendToIpcMain('updateIdleModeData', idleModeData);
  return updateIdleModeData(idleModeData);
};

type ImportData = {
  tableName: string;
  rows: Array<unknown>;
};

const importAppDBDataObservable = async (file: File) => {
  (JSON.parse(await file.text()).data.data as ImportData[]).forEach(({ tableName, rows }) => {
    sendToIpcMain('importAppDBData', tableName, rows);
  });

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
  (DBUtilsFacade as Mutable<typeof DBUtilsFacade>).initIdleModeData = initIdleModeDataObservable;
  (DBUtilsFacade as Mutable<typeof DBUtilsFacade>).updateIdleModeData = updateIdleModeDataObservable;
  (DBUtilsFacade as Mutable<typeof DBUtilsFacade>).importAppDBData = importAppDBDataObservable;
};
