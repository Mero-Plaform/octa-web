import { writable } from 'svelte/store';

type sectionTaskStoreData = {
  wordsCount: number;
};

export let sectionTaskStore = writable<sectionTaskStoreData>();
