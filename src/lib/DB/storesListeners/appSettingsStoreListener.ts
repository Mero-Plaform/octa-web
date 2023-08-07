import type { AppSettings } from '../../pages/settings/interfaces/appSettings.js';
import { appSettingsStore } from '../../pages/settings/stores/appSettingsStore/appSettingsStore.js';
import type { UpdateAppSettingsData } from '../utils.js';
import { utilsWithCatch } from '../utilsWithCatch.js';

const appSettingsStoreListener = (settings: AppSettings) => {
  (<UpdateAppSettingsData>utilsWithCatch.get("updateAppSettingsData")!)(settings);
};

export const initDBAppSettingsStoreListener = () => {
  appSettingsStore.subscribe(appSettingsStoreListener);
};
