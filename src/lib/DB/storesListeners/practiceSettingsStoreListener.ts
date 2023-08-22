import type { SettingsStore } from '../../pages/practice/interfaces/settings.js';
import { settingsStore } from '../../pages/practice/stores/settingsStore.js';
import { DBUtilsFacade } from '../DBUtilsFacade.js';

const practiceSettingsStoreListener = (settings: SettingsStore) => {
  DBUtilsFacade.updatePracticeData(settings);
};

export const initDBPracticeSettingsStoreListener = () => {
  settingsStore.subscribe(practiceSettingsStoreListener);
};
