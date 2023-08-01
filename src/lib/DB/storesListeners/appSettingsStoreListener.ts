import type { AppSettings } from '../../pages/settings/interfaces/appSettings.js';
import { appSettingsStore } from '../../pages/settings/stores/appSettingsStore/appSettingsStore.js';
import { utilsWithCatch, type UpdateAppSettingsData } from '../utils.js';

const appSettingsStoreListener = (settings: AppSettings) => {
  (<UpdateAppSettingsData>utilsWithCatch.get("updateAppSettingsData")!)(settings);
};

export const initDBAppSettingsStoreListener = () => {
  appSettingsStore.subscribe(appSettingsStoreListener);
};
