import { derived, type Readable } from 'svelte/store';
import type { AppSettings } from '../../interfaces/appSettings.js';
import { activePracticeSettingsStore } from '../activePractice/activePracticeSettingsStore.js';
import { basicSettingsStore } from '../basicSettingsStore.js';
import { passivePracticeSettingsStore } from '../passivePractice/passivePracticeSettingsStore.js';

export let appSettingsStore: Readable<AppSettings>;

export const createAppSettingsStore = () => {
  appSettingsStore = derived(
    [basicSettingsStore, passivePracticeSettingsStore, activePracticeSettingsStore],
    ([$basicSettingsStore, $passivePracticeSettingsStore, $activePracticeSettingsStore]) => {

      return {
        basic: { ...$basicSettingsStore },
        practice: {
          passive: { ...$passivePracticeSettingsStore },
          active: { ...$activePracticeSettingsStore }
        }
      };
    });
};
