import type { CustomWritableStore } from '../../../../utils/customStores/CustomWritableStore.js';
import { CustomWritableStoreFactory } from '../../../../utils/customStores/CustomWritableStoreFactory.js';
import type { WEEK_DAYS_SHORTS_TYPE } from '../../../../utils/helpers.js';
import type { TimeFrame } from '../../../statistic/interfaces/TimeFrame.js';
import type { PassivePracticeData, PassivePracticeSettings, PassivePracticeStoreValueKeys } from '../../interfaces/practice.js';
import { updatedDayInPassivePracticeSettingsStore } from './updatedDayInPassivePracticeSettingsStore.js';

/* -------------------------------------------------------------------------- */
/*                                    utils                                   */
/* -------------------------------------------------------------------------- */

const initValueForSettingKey = (settingKey: PassivePracticeStoreValueKeys, passivePracticeSettingsStoreValue: PassivePracticeSettings) => {
  passivePracticeSettingsStoreValue.daySettings[settingKey] = {
    enabled: false,
    interval: "00:00",
    timeFrames: [],
  };
};

/**
 * @interval - if < "00:05" will be overwritten to "00:05"
 */
export const updateSettingKeyIntervalProp = (settingKey: PassivePracticeStoreValueKeys, interval: PassivePracticeData["interval"]) => {
  passivePracticeSettingsStore.update((passivePracticeSettingsStoreValue) => {
    passivePracticeSettingsStoreValue.daySettings[settingKey]!.interval = interval;
    return passivePracticeSettingsStoreValue;
  });
};

export const updateSettingKeyEnabledProp = (settingKey: Exclude<PassivePracticeStoreValueKeys, "general">, enabled: PassivePracticeData["enabled"]) => {
  passivePracticeSettingsStore.update((passivePracticeSettingsStoreValue) => {
    passivePracticeSettingsStoreValue.daySettings[settingKey]!.enabled = enabled;
    return passivePracticeSettingsStoreValue;
  });
};

export const addSettingKey = (settingKey: PassivePracticeStoreValueKeys) => {
  passivePracticeSettingsStore.update((passivePracticeSettingsStoreValue) => {
    initValueForSettingKey(settingKey, passivePracticeSettingsStoreValue);
    return passivePracticeSettingsStoreValue;
  });
};

export const removeSettingKey = (settingKey: PassivePracticeStoreValueKeys) => {
  passivePracticeSettingsStore.update((passivePracticeSettingsStoreValue) => {
    delete passivePracticeSettingsStoreValue.daySettings[settingKey];
    return passivePracticeSettingsStoreValue;
  });
};

export const updateTimeFrames = (settingKey: PassivePracticeStoreValueKeys, timeFrames: TimeFrame[]) => {
  passivePracticeSettingsStore.update((passivePracticeSettingsStoreValue) => {
    passivePracticeSettingsStoreValue.daySettings[settingKey]!.timeFrames = timeFrames;
    return passivePracticeSettingsStoreValue;
  });
};

export const copySettingsForDay = (settingKey: WEEK_DAYS_SHORTS_TYPE, targetSettingKey: WEEK_DAYS_SHORTS_TYPE) => {
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

export const reInit = (initialValue: PassivePracticeSettings) => {
  passivePracticeSettingsStore.set(initialValue);
};

type PassivePracticeSettingsStore = CustomWritableStore<PassivePracticeSettings> & {
  updateSettingKeyIntervalProp: typeof updateSettingKeyIntervalProp;
  updateSettingKeyEnabledProp: typeof updateSettingKeyEnabledProp;
  addSettingKey: typeof addSettingKey;
  removeSettingKey: typeof removeSettingKey;
  updateTimeFrames: typeof updateTimeFrames;
  copySettingsForDay: typeof copySettingsForDay;
  reInit: typeof reInit;
};

export const createPassivePracticeSettingsStore = (initialValue: PassivePracticeSettings) => {
  passivePracticeSettingsStore = CustomWritableStoreFactory(initialValue, {
    updateSettingKeyIntervalProp,
    updateSettingKeyEnabledProp,
    addSettingKey,
    removeSettingKey,
    updateTimeFrames,
    copySettingsForDay,
    reInit
  });
};

/* -------------------------------------------------------------------------- */
/*                                    store                                   */
/* -------------------------------------------------------------------------- */

export let passivePracticeSettingsStore: PassivePracticeSettingsStore;
