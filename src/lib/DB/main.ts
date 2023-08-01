import { getAppSettingsInitialValues } from './initialData/appSettingsInitialValues.js';
import { getPracticeInitialValues } from './initialData/practiceInitialValues.js';
import { getStatisticInitialValues } from './initialData/statisticInitialValues.js';
import { utilsWithCatch, type GetDictionaryDataAsArray, type GetPracticeData, type GetStatisticDataAsArray, type GetAppSettings } from './utils.js';

/**
 * return DB data & initialize it if needed
 */
export const getDBData = async () => {
  let [dictionaryArr, practiceData, statisticArr, appSettings] = await Promise.all([
    <ReturnType<GetDictionaryDataAsArray>>utilsWithCatch.get("getDictionaryDataAsArray")!(),
    <ReturnType<GetPracticeData>>utilsWithCatch.get("getPracticeData")!(),
    <ReturnType<GetStatisticDataAsArray>>utilsWithCatch.get("getStatisticDataAsArray")!(),
    <ReturnType<GetAppSettings>>utilsWithCatch.get("getAppSettings")!(),
  ]);

  if (practiceData === undefined) {
    practiceData = getPracticeInitialValues();
    utilsWithCatch.get("initPracticeData")!(practiceData);
  }

  if (statisticArr.length === 0) {
    statisticArr = getStatisticInitialValues();
    utilsWithCatch.get("initStatisticData")!(statisticArr[0]);
  }

  if (appSettings === undefined) {
    appSettings = getAppSettingsInitialValues();
    utilsWithCatch.get("initAppSettingsData")!(appSettings);
  }

  return [dictionaryArr, practiceData!, statisticArr, appSettings] as const;
};
