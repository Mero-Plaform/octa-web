import type { SettingsStore } from '../../pages/practice/interfaces/settings.js';
import { settingsStore } from '../../pages/practice/stores/settingsStore.js';
import type { UpdatePracticeData } from '../utils.js';
import { utilsWithCatch } from '../utilsWithCatch.js';

const practiceSettingsStoreListener = (settings: SettingsStore) => {
  <UpdatePracticeData>utilsWithCatch.get("updatePracticeData")!(settings);
};

export const initDBPracticeSettingsStoreListener = () => {
  settingsStore.subscribe(practiceSettingsStoreListener);
};
