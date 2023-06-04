import { writable, type Writable } from 'svelte/store';
import type { SettingsStore } from '../interfaces/settings.js';

export const createSettingsStore = (initData: SettingsStore) => {
  settingsStore = writable<SettingsStore>({
    ...initData,
  });
};

export let settingsStore: Writable<SettingsStore>;
