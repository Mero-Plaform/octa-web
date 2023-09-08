import { DBUtilsFacade } from '../../../../DB/DBUtilsFacade.js';
import type { CustomWritableStore } from '../../../../utils/customStores/CustomWritableStore.js';
import { CustomWritableStoreFactory } from '../../../../utils/customStores/CustomWritableStoreFactory.js';
import type { WEEK_DAYS_SHORTS_TYPE } from '../../../../utils/helpers.js';
import type { TimeFrame } from '../../../statistic/interfaces/TimeFrame.js';
import type { PracticeData, PracticeSettings, PracticeStoreValueKeys } from '../../interfaces/practice.js';
import { updatedDayInActivePracticeSettingsStore } from './updatedDayInActivePracticeSettingsStore.js';

/* -------------------------------------------------------------------------- */
/*                                    utils                                   */
/* -------------------------------------------------------------------------- */

const initValueForSettingKey = (settingKey: PracticeStoreValueKeys, activePracticeSettingsStoreValue: PracticeSettings) => {
  activePracticeSettingsStoreValue.daySettings[settingKey] = {
    enabled: false,
    interval: "00:05",
    timeFrames: [],
  };
};

/**
 * @interval - if < "00:05" will be overwritten to "00:05"
 */
const updateSettingKeyIntervalProp = (settingKey: PracticeStoreValueKeys, interval: PracticeData["interval"]) => {
  activePracticeSettingsStore.update((activePracticeSettingsStoreValue) => {
    activePracticeSettingsStoreValue.daySettings[settingKey]!.interval = interval;
    return activePracticeSettingsStoreValue;
  });
};

const updateSettingKeyEnabledProp = (settingKey: Exclude<PracticeStoreValueKeys, "general">, enabled: PracticeData["enabled"]) => {
  activePracticeSettingsStore.update((activePracticeSettingsStoreValue) => {
    activePracticeSettingsStoreValue.daySettings[settingKey]!.enabled = enabled;
    return activePracticeSettingsStoreValue;
  });
};

const addSettingKey = (settingKey: PracticeStoreValueKeys) => {
  activePracticeSettingsStore.update((activePracticeSettingsStoreValue) => {
    initValueForSettingKey(settingKey, activePracticeSettingsStoreValue);
    return activePracticeSettingsStoreValue;
  });
};

const removeSettingKey = (settingKey: PracticeStoreValueKeys) => {
  activePracticeSettingsStore.update((activePracticeSettingsStoreValue) => {
    delete activePracticeSettingsStoreValue.daySettings[settingKey];
    return activePracticeSettingsStoreValue;
  });
};

const updateTimeFrames = (settingKey: PracticeStoreValueKeys, timeFrames: TimeFrame[]) => {
  activePracticeSettingsStore.update((activePracticeSettingsStoreValue) => {
    activePracticeSettingsStoreValue.daySettings[settingKey]!.timeFrames = timeFrames;
    return activePracticeSettingsStoreValue;
  });
};

const copySettingsForDay = (settingKey: WEEK_DAYS_SHORTS_TYPE, targetSettingKey: WEEK_DAYS_SHORTS_TYPE) => {
  activePracticeSettingsStore.update((activePracticeSettingsStoreValue) => {
    const { enabled, interval, timeFrames } = activePracticeSettingsStoreValue.daySettings[targetSettingKey]!;
    activePracticeSettingsStoreValue.daySettings[settingKey] = {
      enabled, interval, timeFrames: timeFrames.map(({ from, to }) => ({
        from, to
      }))
    };
    updatedDayInActivePracticeSettingsStore.set(settingKey);
    return activePracticeSettingsStoreValue;
  });
};

const reInit = (initialValue: PracticeSettings) => {
  activePracticeSettingsStore.set(initialValue);
};

const reInitFromDB = async () => {
  activePracticeSettingsStore.set((await DBUtilsFacade.getAppSettings())!.practice.active);
};

export type PracticeSettingsStore = CustomWritableStore<PracticeSettings> & {
  updateSettingKeyIntervalProp: typeof updateSettingKeyIntervalProp;
  updateSettingKeyEnabledProp: typeof updateSettingKeyEnabledProp;
  addSettingKey: typeof addSettingKey;
  removeSettingKey: typeof removeSettingKey;
  updateTimeFrames: typeof updateTimeFrames;
  copySettingsForDay: typeof copySettingsForDay;
  reInit: typeof reInit;
  reInitFromDB: typeof reInitFromDB;
};

export const createActivePracticeSettingsStore = (initialValue: PracticeSettings) => {
  activePracticeSettingsStore = CustomWritableStoreFactory(initialValue, {
    updateSettingKeyIntervalProp,
    updateSettingKeyEnabledProp,
    addSettingKey,
    removeSettingKey,
    updateTimeFrames,
    copySettingsForDay,
    reInit,
    reInitFromDB
  });
};

/* -------------------------------------------------------------------------- */
/*                                    store                                   */
/* -------------------------------------------------------------------------- */

export let activePracticeSettingsStore: PracticeSettingsStore;
