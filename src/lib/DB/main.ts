import { DBUtilsFacade } from './DBUtilsFacade.js';
import { getAppSettingsInitialValues } from './initialData/appSettingsInitialValues.js';
import { getPracticeInitialValues } from './initialData/practiceInitialValues.js';
import { getStatisticInitialValues } from './initialData/statisticInitialValues.js';

export const setupUtilDB = async () => {
  if (import.meta.env.VITE_BUILD_PLATFORM === "desktop") {
    (await import("./DBUtilsFacadeDesktopBuild.js")).initDBUtilsFacadeDesktopBuild();
  }
};

/**
 * return DB data & initialize it if needed
 */
export const getDBData = async () => {
  let [dictionaryArr, practiceData, statisticArr, appSettings] = await Promise.all([
    DBUtilsFacade.getDictionaryDataAsArray(),
    DBUtilsFacade.getPracticeData(),
    DBUtilsFacade.getStatisticDataAsArray(),
    DBUtilsFacade.getAppSettings(),
  ]);

  if (practiceData === undefined) {
    practiceData = getPracticeInitialValues();
    DBUtilsFacade.initPracticeData(practiceData);
  }

  if (statisticArr.length === 0) {
    statisticArr = getStatisticInitialValues();
    DBUtilsFacade.initStatisticData(statisticArr[0]);
  }

  if (appSettings === undefined) {
    appSettings = getAppSettingsInitialValues();
    DBUtilsFacade.initAppSettingsData(appSettings);
  }

  return [dictionaryArr, practiceData!, statisticArr, appSettings] as const;
};
