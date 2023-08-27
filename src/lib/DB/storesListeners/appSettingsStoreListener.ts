import type { Unsubscriber } from 'svelte/store';
import type { AppSettings } from '../../pages/settings/interfaces/appSettings.js';
import { appSettingsStore } from '../../pages/settings/stores/appSettingsStore/appSettingsStore.js';
import { DBUtilsFacade } from '../DBUtilsFacade.js';

const appSettingsStoreListener = (settings: AppSettings) => {
  DBUtilsFacade.updateAppSettingsData(settings);
};

let appSettingsStoreUnsubscriber: Unsubscriber;

export const initDBAppSettingsStoreListener = () => {
  appSettingsStoreUnsubscriber = appSettingsStore.subscribe(appSettingsStoreListener);
};

export const stopDBAppSettingsStoreListener = () => {
  appSettingsStoreUnsubscriber();
};
