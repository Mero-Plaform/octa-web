import { writable, type Writable } from 'svelte/store';
import type { BasicSettings } from '../interfaces/basicSettings.js';

export let basicSettingsStore: Writable<BasicSettings>;

export const createBasicSettingsStore = (initialValue: BasicSettings) => {
  basicSettingsStore = writable(initialValue);
};
