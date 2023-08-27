import { DBUtilsFacade } from '../../../../DB/DBUtilsFacade.js';
import type { CustomWritableStore } from '../../../../utils/customStores/CustomWritableStore.js';
import { CustomWritableStoreFactory } from '../../../../utils/customStores/CustomWritableStoreFactory.js';
import type { WEEK_DAYS_SHORTS_TYPE } from '../../../../utils/helpers.js';
import type { TimeFrame } from '../../../statistic/interfaces/TimeFrame.js';
import type { PracticeData, PracticeSettings, PracticeStoreValueKeys } from '../../interfaces/practice.js';
import { updatedDayInPassivePracticeSettingsStore } from './updatedDayInPassivePracticeSettingsStore.js';

/* -------------------------------------------------------------------------- */
/*                                    utils                                   */
/* -------------------------------------------------------------------------- */

const initValueForSettingKey = (settingKey: PracticeStoreValueKeys, passivePracticeSettingsStoreValue: PracticeSettings) => {
  passivePracticeSettingsStoreValue.daySettings[settingKey] = {
    enabled: false,
    interval: "00:05",
    timeFrames: [],
  };
};

/**
 * @interval - if < "00:05" will be overwritten to "00:05"
 */
const updateSettingKeyIntervalProp = (settingKey: PracticeStoreValueKeys, interval: PracticeData["interval"]) => {
  passivePracticeSettingsStore.update((passivePracticeSettingsStoreValue) => {
    passivePracticeSettingsStoreValue.daySettings[settingKey]!.interval = interval;
    return passivePracticeSettingsStoreValue;
  });
};

const updateSettingKeyEnabledProp = (settingKey: Exclude<PracticeStoreValueKeys, "general">, enabled: PracticeData["enabled"]) => {
  passivePracticeSettingsStore.update((passivePracticeSettingsStoreValue) => {
    passivePracticeSettingsStoreValue.daySettings[settingKey]!.enabled = enabled;
    return passivePracticeSettingsStoreValue;
  });
};

const addSettingKey = (settingKey: PracticeStoreValueKeys) => {
  passivePracticeSettingsStore.update((passivePracticeSettingsStoreValue) => {
    initValueForSettingKey(settingKey, passivePracticeSettingsStoreValue);
    return passivePracticeSettingsStoreValue;
  });
};

const removeSettingKey = (settingKey: PracticeStoreValueKeys) => {
  passivePracticeSettingsStore.update((passivePracticeSettingsStoreValue) => {
    delete passivePracticeSettingsStoreValue.daySettings[settingKey];
    return passivePracticeSettingsStoreValue;
  });
};

const updateTimeFrames = (settingKey: PracticeStoreValueKeys, timeFrames: TimeFrame[]) => {
  passivePracticeSettingsStore.update((passivePracticeSettingsStoreValue) => {
    passivePracticeSettingsStoreValue.daySettings[settingKey]!.timeFrames = timeFrames;
    return passivePracticeSettingsStoreValue;
  });
};

const copySettingsForDay = (settingKey: WEEK_DAYS_SHORTS_TYPE, targetSettingKey: WEEK_DAYS_SHORTS_TYPE) => {
  passivePracticeSettingsStore.update((passivePracticeSettingsStoreValue) => {
    const { enabled, interval, timeFrames } = passivePracticeSettingsStoreValue.daySettings[targetSettingKey]!;
    passivePracticeSettingsStoreValue.daySettings[settingKey] = {
      enabled, interval, timeFrames: timeFrames.map(({ from, to }) => ({
        from, to
      }))
    };
    updatedDayInPassivePracticeSettingsStore.set(settingKey);
    return passivePracticeSettingsStoreValue;
  });
};

const reInit = (initialValue: PracticeSettings) => {
  passivePracticeSettingsStore.set(initialValue);
};

const reInitFromDB = async () => {
  passivePracticeSettingsStore.set((await DBUtilsFacade.getAppSettings())!.practice.passive)
};

type PracticeSettingsStore = CustomWritableStore<PracticeSettings> & {
  updateSettingKeyIntervalProp: typeof updateSettingKeyIntervalProp;
  updateSettingKeyEnabledProp: typeof updateSettingKeyEnabledProp;
  addSettingKey: typeof addSettingKey;
  removeSettingKey: typeof removeSettingKey;
  updateTimeFrames: typeof updateTimeFrames;
  copySettingsForDay: typeof copySettingsForDay;
  reInit: typeof reInit;
  reInitFromDB: typeof reInitFromDB;
};

export const createPassivePracticeSettingsStore = (initialValue: PracticeSettings) => {
  passivePracticeSettingsStore = CustomWritableStoreFactory(initialValue, {
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

export let passivePracticeSettingsStore: PracticeSettingsStore;
