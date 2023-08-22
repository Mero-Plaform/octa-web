import type { AppSettings } from '../../pages/settings/interfaces/appSettings.js';
import { appSettingsStore } from '../../pages/settings/stores/appSettingsStore/appSettingsStore.js';
import { DBUtilsFacade } from '../DBUtilsFacade.js';

const appSettingsStoreListener = (settings: AppSettings) => {
  DBUtilsFacade.updateAppSettingsData(settings);
};

export const initDBAppSettingsStoreListener = () => {
  appSettingsStore.subscribe(appSettingsStoreListener);
};
