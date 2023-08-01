import Dexie from "dexie";
import { exportDB } from "dexie-export-import";
import type { Word } from '../pages/dictionary/interfaces/Word.js';
import type { SettingsStore } from '../pages/practice/interfaces/settings.js';
import type { AppSettings } from '../pages/settings/interfaces/appSettings.js';
import type { YearData } from '../pages/statistic/interfaces/StatisticStore.js';
import { RunPromiseWithCatch } from '../utils/helpers.js';
import { AppDB, appDB } from './AppDB.js';

/* -------------------------------------------------------------------------- */
/*                                 dictionary                                 */
/* -------------------------------------------------------------------------- */

export type OnAddWord = typeof onAddWord;

const onAddWord = (newWord: Word) => {
  return appDB.dictionary.add({
    ...newWord
  });
};

export type OnEditWord = typeof onEditWord;

const onEditWord = (editedWord: Word) => {
  return appDB.dictionary.put(editedWord);
};

export type OnDeleteWord = typeof onDeleteWord;

const onDeleteWord = (wordId: Word['id']) => {
  return appDB.dictionary.delete(wordId);
};

export type GetDictionaryDataAsArray = typeof getDictionaryDataAsArray;

const getDictionaryDataAsArray = () => {
  return appDB.dictionary.toArray();
};

export type OnDictionaryClear = typeof onDictionaryClear;

/**
 * erase all dictionary data
 */
const onDictionaryClear = () => {
  return appDB.dictionary.clear();
};

/* -------------------------------------------------------------------------- */
/*                                  practice                                  */
/* -------------------------------------------------------------------------- */

export type GetPracticeData = typeof getPracticeData;

/**
 * the out-bound key for practiceSettings table only data
 */
const practiceSettingsDataKey = 1;

const getPracticeData = () => {
  return appDB.practiceSettings.get(practiceSettingsDataKey);
};

const initPracticeData = (practiceInitialValues: SettingsStore) => {
  return appDB.practiceSettings.add({
    ...practiceInitialValues
  }, practiceSettingsDataKey);
};

export type UpdatePracticeData = typeof updatePracticeData;

const updatePracticeData = (practiceData: SettingsStore) => {
  return appDB.practiceSettings.update(practiceSettingsDataKey, practiceData);
};

/* -------------------------------------------------------------------------- */
/*                                  statistic                                 */
/* -------------------------------------------------------------------------- */

export type UpdateStatistic = typeof updateStatistic;

const updateStatistic = (yearData: YearData) => {
  return appDB.statistic.put(yearData);
};

export type GetStatisticDataAsArray = typeof getStatisticDataAsArray;

const getStatisticDataAsArray = () => {
  return appDB.statistic.toArray();
};

export type InitStatisticData = typeof initStatisticData;

const initStatisticData = async (statisticInitialValues: YearData) => {
  return appDB.statistic.add({
    ...statisticInitialValues
  });
};

export type OnStatisticClear = typeof onStatisticClear;

/**
 * erase all statistic data
 */
const onStatisticClear = () => {
  return appDB.statistic.clear();
};

/* -------------------------------------------------------------------------- */
/*                           app data transfer                                */
/* -------------------------------------------------------------------------- */

export type ExportAppDBData = typeof exportAppDBData;

const exportAppDBData = async () => {
  //@ts-ignore
  return exportDB(appDB);
};

export type ImportAppDBData = typeof importAppDBData;

const importAppDBData = async (file: File) => {
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
const appSettingsDataKey = 1;

const getAppSettings = () => {
  return appDB.appSettings.get(appSettingsDataKey);
};

export type InitAppSettingsData = typeof initAppSettingsData;

const initAppSettingsData = (appSettingsInitialValues: AppSettings) => {
  return appDB.appSettings.add(
    {
      ...appSettingsInitialValues,
    }, appSettingsDataKey
  );
};

export type UpdateAppSettingsData = typeof updateAppSettingsData;

const updateAppSettingsData = (appSettingsData: AppSettings) => {
  return appDB.appSettings.update(appSettingsDataKey, appSettingsData);
};

export type OnAppSettingsClear = typeof onAppSettingsClear;

/**
 * erase all statistic data
 */
const onAppSettingsClear = () => {
  return appDB.appSettings.clear();
};

/* -------------------------------------------------------------------------- */
/*                               utils interface                              */
/* -------------------------------------------------------------------------- */

type UtilsWithCatchKeys = "onAddWord"
  | "onEditWord"
  | "onDeleteWord"
  | "getDictionaryDataAsArray"
  | "getPracticeData"
  | "getStatisticDataAsArray"
  | "onDictionaryClear"
  | "initStatisticData"
  | "onStatisticClear"
  | "initPracticeData"
  | "updatePracticeData"
  | "updateStatistic"
  | "exportAppDBData"
  | "importAppDBData"
  | "getAppSettings"
  | "initAppSettingsData"
  | "updateAppSettingsData"
  | "onAppSettingsClear";

type UtilsWithCatchValues = (...params: unknown[]) => unknown;

export const utilsWithCatch = new Map<UtilsWithCatchKeys, UtilsWithCatchValues>();

utilsWithCatch.set("onAddWord", (...params) => RunPromiseWithCatch(onAddWord, params));
utilsWithCatch.set("onEditWord", (...params) => RunPromiseWithCatch(onEditWord, params));
utilsWithCatch.set("onDeleteWord", (...params) => RunPromiseWithCatch(onDeleteWord, params));
utilsWithCatch.set("getDictionaryDataAsArray", (...params) => RunPromiseWithCatch(getDictionaryDataAsArray, params));
utilsWithCatch.set("getPracticeData", (...params) => RunPromiseWithCatch(getPracticeData, params));
utilsWithCatch.set("getStatisticDataAsArray", (...params) => RunPromiseWithCatch(getStatisticDataAsArray, params));
utilsWithCatch.set("onDictionaryClear", (...params) => RunPromiseWithCatch(onDictionaryClear, params));
utilsWithCatch.set("initStatisticData", (...params) => RunPromiseWithCatch(initStatisticData, params));
utilsWithCatch.set("onStatisticClear", (...params) => RunPromiseWithCatch(onStatisticClear, params));
utilsWithCatch.set("initPracticeData", (...params) => RunPromiseWithCatch(initPracticeData, params));
utilsWithCatch.set("updatePracticeData", (...params) => RunPromiseWithCatch(updatePracticeData, params));
utilsWithCatch.set("updateStatistic", (...params) => RunPromiseWithCatch(updateStatistic, params));
utilsWithCatch.set("exportAppDBData", (...params) => RunPromiseWithCatch(exportAppDBData, params));
utilsWithCatch.set("importAppDBData", (...params) => RunPromiseWithCatch(importAppDBData, params));
utilsWithCatch.set("getAppSettings", (...params) => RunPromiseWithCatch(getAppSettings, params));
utilsWithCatch.set("initAppSettingsData", (...params) => RunPromiseWithCatch(initAppSettingsData, params));
utilsWithCatch.set("updateAppSettingsData", (...params) => RunPromiseWithCatch(updateAppSettingsData, params));
utilsWithCatch.set("onAppSettingsClear", (...params) => RunPromiseWithCatch(onAppSettingsClear, params));
