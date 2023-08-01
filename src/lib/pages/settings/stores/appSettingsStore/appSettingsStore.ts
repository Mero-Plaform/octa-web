import type { CustomWritableStore } from '../../../../utils/customStores/CustomWritableStore.js';
import { CustomWritableStoreFactory } from '../../../../utils/customStores/CustomWritableStoreFactory.js';
import type { AppSettings } from '../../interfaces/appSettings.js';
import { initSettingStoresListeners } from './appSettingsStoreUtils.js';

export let appSettingsStore: CustomWritableStore<AppSettings> & {
  reInit: typeof reInit;
};

const reInit = (initialValue: AppSettings) => {
  appSettingsStore.value = initialValue;
};

export const createAppSettingsStore = (initialValue: AppSettings) => {
  appSettingsStore = CustomWritableStoreFactory(initialValue, {
    reInit
  });
  initSettingStoresListeners();
};
