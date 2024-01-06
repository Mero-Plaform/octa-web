import { addingNewArrivedYearToStatisticIfNeeded } from "../pages/statistic/components/chart/statisticUtils.js";
import { DBUtilsFacade } from './DBUtilsFacade.js';
import { getAppSettingsInitialValues } from './initialData/appSettingsInitialValues.js';
import { getIdleModeInitialValues } from "./initialData/idleModeInitialValues.js";
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
  let [dictionaryArr, practiceData, statisticArr, appSettings, idleMode] = await Promise.all([
    DBUtilsFacade.getDictionaryDataAsArray(),
    DBUtilsFacade.getPracticeData(),
    DBUtilsFacade.getStatisticDataAsArray(),
    DBUtilsFacade.getAppSettings(),
    DBUtilsFacade.getIdleModeData(),
  ]);

  if (practiceData === undefined) {
    practiceData = getPracticeInitialValues();
    DBUtilsFacade.initPracticeData(practiceData);
  }

  if (statisticArr.length === 0) {
    statisticArr = getStatisticInitialValues();
    DBUtilsFacade.initStatisticData(statisticArr[0]);
  }

  addingNewArrivedYearToStatisticIfNeeded(statisticArr);

  if (appSettings === undefined) {
    appSettings = getAppSettingsInitialValues();
    DBUtilsFacade.initAppSettingsData(appSettings);
  }

  if (idleMode === undefined) {
    idleMode = getIdleModeInitialValues();
    DBUtilsFacade.initIdleModeData(idleMode);
  }

  return [dictionaryArr, practiceData, statisticArr, appSettings, idleMode] as const;
};
