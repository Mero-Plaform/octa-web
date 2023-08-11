import { writable, type Writable } from 'svelte/store';
import type { SettingsStore } from '../interfaces/settings.js';

export const createSettingsStore = (initData: SettingsStore) => {
  settingsStore = writable<SettingsStore>({
    ...initData,
  });
};

/**
 * contain practice page practice setup (e.g. target, type)
 */
export let settingsStore: Writable<SettingsStore>;
