import type { BasicSettings } from '../../interfaces/basicSettings.js';
import type { PracticeSettings } from '../../interfaces/practice.js';
import { activePracticeSettingsStore } from '../activePractice/activePracticeSettingsStore.js';
import { basicSettingsStore } from '../basicSettingsStore.js';
import { passivePracticeSettingsStore } from '../passivePractice/passivePracticeSettingsStore.js';
import { appSettingsStore } from './appSettingsStore.js';

const onPassivePracticeSettingsStoreChange = (passiveStoreValue: PracticeSettings) => {
  appSettingsStore.update((appSettingsStoreValue) => {
    appSettingsStoreValue.practice.passive = { ...passiveStoreValue };
    return appSettingsStoreValue;
  });
};

const onActivePracticeSettingsStoreChange = (activeStoreValue: PracticeSettings) => {
  appSettingsStore.update((appSettingsStoreValue) => {
    appSettingsStoreValue.practice.active = { ...activeStoreValue };
    return appSettingsStoreValue;
  });
};

const onBasicSettingsStoreChange = (basicStoreValue: BasicSettings) => {
  appSettingsStore.update((appSettingsStoreValue) => ({
    ...appSettingsStoreValue,
    basic: { ...basicStoreValue }
  }));
};

export const initSettingStoresListeners = () => {
  passivePracticeSettingsStore.subscribe(onPassivePracticeSettingsStoreChange);
  activePracticeSettingsStore.subscribe(onActivePracticeSettingsStoreChange);
  basicSettingsStore.subscribe(onBasicSettingsStoreChange);
};
