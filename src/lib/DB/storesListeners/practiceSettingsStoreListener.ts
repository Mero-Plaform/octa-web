import type { SettingsStore } from '../../pages/practice/interfaces/settings.js';
import { settingsStore } from '../../pages/practice/stores/settingsStore.js';
import { utilsWithCatch, type UpdatePracticeData } from '../utils.js';

const practiceSettingsStoreListener = (settings: SettingsStore) => {
  (<UpdatePracticeData>utilsWithCatch.get("updatePracticeData")!)(settings);
};

export const initDBPracticeSettingsStoreListener = () => {
  settingsStore.subscribe(practiceSettingsStoreListener);
};
