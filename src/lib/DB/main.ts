import { getAppSettingsInitialValues } from './initialData/appSettingsInitialValues.js';
import { getPracticeInitialValues } from './initialData/practiceInitialValues.js';
import { getStatisticInitialValues } from './initialData/statisticInitialValues.js';
import { type GetAppSettings, type GetDictionaryDataAsArray, type GetPracticeData, type GetStatisticDataAsArray } from './utils.js';
import { utilsWithCatch } from './utilsWithCatch.js';
// import { initUtilsWithCatchSetupForDesktopBuild } from './utilsWithCatchSetupForDesktopBuild.js';
// import { initUtilsWithCatchSetupForWebBuild } from './utilsWithCatchSetupForWebBuild.js';
import { initUtilsWithCatchSetupGeneral } from './utilsWithCatchSetupGeneral.js';

export const setupUtilDB = async () => {
  initUtilsWithCatchSetupGeneral();

  if (import.meta.env.VITE_BUILD_PLATFORM === "web") {
    (await import("./utilsWithCatchSetupForWebBuild.js")).initUtilsWithCatchSetupForWebBuild();
    // initUtilsWithCatchSetupForWebBuild();
  } else if (import.meta.env.VITE_BUILD_PLATFORM === "desktop") {
    (await import("./utilsWithCatchSetupForDesktopBuild.js")).initUtilsWithCatchSetupForDesktopBuild();
    // initUtilsWithCatchSetupForDesktopBuild();
  }
};

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
