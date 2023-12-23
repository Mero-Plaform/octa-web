import { derived } from 'svelte/store';
import { dictionaryPaginationSettingsStore } from './dictionaryPaginationSettingsStore.js';

export const dictionaryPageOffsetStore = derived(dictionaryPaginationSettingsStore, (pageSettings) => pageSettings.offset);
