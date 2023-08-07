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
