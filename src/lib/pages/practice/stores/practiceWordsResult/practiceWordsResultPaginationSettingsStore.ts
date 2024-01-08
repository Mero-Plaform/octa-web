import { writable } from 'svelte/store';

export const practiceWordsResultPaginationSettingsStore = writable({
  offset: 0,
  limit: 10,
  amounts: [],
  size: 0
});
