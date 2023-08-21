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

export type OnAddWord = typeof onAddWord;

export const onAddWord = (newWord: Word) => {
  return appDB.dictionary.add({
    ...newWord
  });
};

export type OnEditWord = typeof onEditWord;

export const onEditWord = (editedWord: Word) => {
  return appDB.dictionary.put(editedWord);
};

export type OnDeleteWord = typeof onDeleteWord;

export const onDeleteWord = (wordId: Word['id']) => {
  return appDB.dictionary.delete(wordId);
};

export type GetDictionaryDataAsArray = typeof getDictionaryDataAsArray;

export const getDictionaryDataAsArray = () => {
  return appDB.dictionary.toArray();
};

export type OnDictionaryClear = typeof onDictionaryClear;

/**
 * erase all dictionary data
 */
export const onDictionaryClear = () => {
  return appDB.dictionary.clear();
};

/* -------------------------------------------------------------------------- */
/*                                  practice                                  */
/* -------------------------------------------------------------------------- */

export type GetPracticeData = typeof getPracticeData;

/**
 * the out-bound key for practiceSettings table only data
 */
const practiceSettingsDataKey = 0;

export const getPracticeData = () => {
  return appDB.practiceSettings.get(practiceSettingsDataKey);
};

export const initPracticeData = (practiceInitialValues: SettingsStore) => {
  return appDB.practiceSettings.add({
    ...practiceInitialValues
  }, practiceSettingsDataKey);
};

export type UpdatePracticeData = typeof updatePracticeData;

export const updatePracticeData = (practiceData: SettingsStore) => {
  return appDB.practiceSettings.update(practiceSettingsDataKey, practiceData);
};

/* -------------------------------------------------------------------------- */
/*                                  statistic                                 */
/* -------------------------------------------------------------------------- */

export type UpdateStatistic = typeof updateStatistic;

export const updateStatistic = (yearData: YearData) => {
  return appDB.statistic.put(yearData);
};

export type GetStatisticDataAsArray = typeof getStatisticDataAsArray;

export const getStatisticDataAsArray = () => {
  return appDB.statistic.toArray();
};

export type InitStatisticData = typeof initStatisticData;

export const initStatisticData = async (statisticInitialValues: YearData) => {
  return appDB.statistic.add({
    ...statisticInitialValues
  });
};

export type OnStatisticClear = typeof onStatisticClear;

/**
 * erase all statistic data
 */
export const onStatisticClear = () => {
  return appDB.statistic.clear();
};

/* -------------------------------------------------------------------------- */
/*                           app data transfer                                */
/* -------------------------------------------------------------------------- */

export type ExportAppDBData = typeof exportAppDBData;

export const exportAppDBData = async () => {
  //@ts-ignore
  return exportDB(appDB);
};

export type ImportAppDBData = typeof importAppDBData;

export const importAppDBData = async (file: File) => {
  // @ts-ignore
  await appDB.delete();
  //@ts-ignore
  AppDB.recreateFromImport(await Dexie.import(file));
};

/* -------------------------------------------------------------------------- */
/*                                app settings                                */
/* -------------------------------------------------------------------------- */

export type GetAppSettings = typeof getAppSettings;

/**
 * the out-bound key for appSettings table only data
 */
const appSettingsDataKey = 0;

export const getAppSettings = () => {
  return appDB.appSettings.get(appSettingsDataKey);
};

export type InitAppSettingsData = typeof initAppSettingsData;

export const initAppSettingsData = (appSettingsInitialValues: AppSettings) => {
  return appDB.appSettings.put(
    {
      ...appSettingsInitialValues,
    }, appSettingsDataKey
  );
};

export type UpdateAppSettingsData = typeof updateAppSettingsData;

export const updateAppSettingsData = (appSettingsData: AppSettings) => {
  return appDB.appSettings.update(appSettingsDataKey, appSettingsData);
};
