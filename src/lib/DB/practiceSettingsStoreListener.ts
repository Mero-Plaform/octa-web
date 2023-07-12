import type { SettingsStore } from '../pages/practice/interfaces/settings.js';
import { settingsStore } from '../pages/practice/stores/settingsStore.js';
import { updatePracticeData } from './utils.js';

const practiceSettingsStoreListener = (settings: SettingsStore) => {
  updatePracticeData(settings);
};

export const initDBPracticeSettingsStoreListener = () => {
  settingsStore.subscribe(practiceSettingsStoreListener);
};
