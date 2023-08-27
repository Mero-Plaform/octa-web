import Dexie from "dexie";
import { exportDB } from "dexie-export-import";
import type { Word } from '../pages/dictionary/interfaces/Word.js';
import type { SettingsStore } from '../pages/practice/interfaces/settings.js';
import type { AppSettings } from '../pages/settings/interfaces/appSettings.js';
import type { YearData } from '../pages/statistic/interfaces/StatisticStore.js';
import { AppDB, appDB } from './AppDB.js';

/* -------------------------------------------------------------------------- */
/*                                 dictionary                                 */
/* -------------------------------------------------------------------------- */

export const onAddWord = (newWord: Word) => {
  return appDB.dictionary.add({
    ...newWord
  });
};

export const onEditWord = (editedWord: Word) => {
  return appDB.dictionary.put(editedWord);
};

export const onDeleteWord = (wordId: Word['id']) => {
  return appDB.dictionary.delete(wordId);
};

export const getDictionaryDataAsArray = () => {
  return appDB.dictionary.toArray();
};

/**
 * erase all dictionary data
 */
export const onDictionaryClear = () => {
  return appDB.dictionary.clear();
};

/* -------------------------------------------------------------------------- */
/*                                  practice                                  */
/* -------------------------------------------------------------------------- */

/**
 * the out-bound key for practiceSettings table only data
 */
const practiceSettingsDataKey = 0;

export const getPracticeData = () => {
  return appDB.practiceSettings.get(practiceSettingsDataKey);
};

export const initPracticeData = (practiceInitialValues: SettingsStore) => {
  return appDB.practiceSettings.put({
    ...practiceInitialValues
  }, practiceSettingsDataKey);
};

export const updatePracticeData = (practiceData: SettingsStore) => {
  return appDB.practiceSettings.update(practiceSettingsDataKey, practiceData);
};

/* -------------------------------------------------------------------------- */
/*                                  statistic                                 */
/* -------------------------------------------------------------------------- */

export const updateStatistic = (yearData: YearData) => {
  return appDB.statistic.put(yearData);
};

export const getStatisticDataAsArray = () => {
  return appDB.statistic.toArray();
};

export const initStatisticData = async (statisticInitialValues: YearData) => {
  return appDB.statistic.add({
    ...statisticInitialValues
  });
};

/**
 * erase all statistic data
 */
export const onStatisticClear = () => {
  return appDB.statistic.clear();
};

/* -------------------------------------------------------------------------- */
/*                           app data transfer                                */
/* -------------------------------------------------------------------------- */

export const exportAppDBData = async () => {
  //@ts-ignore
  return exportDB(appDB);
};

export const importAppDBData = async (file: File) => {
  // @ts-ignore
  await appDB.delete();
  //@ts-ignore
  AppDB.recreateFromImport(await Dexie.import(file));
};

/* -------------------------------------------------------------------------- */
/*                                app settings                                */
/* -------------------------------------------------------------------------- */

/**
 * the out-bound key for appSettings table only data
 */
const appSettingsDataKey = 0;

export const getAppSettings = () => {
  return appDB.appSettings.get(appSettingsDataKey);
};

export const initAppSettingsData = (appSettingsInitialValues: AppSettings) => {
  return appDB.appSettings.put(
    {
      ...appSettingsInitialValues,
    }, appSettingsDataKey
  );
};

export const updateAppSettingsData = (appSettingsData: AppSettings) => {
  return appDB.appSettings.update(appSettingsDataKey, appSettingsData);
};
