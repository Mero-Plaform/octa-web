import { writable } from 'svelte/store';

export type PracticeProgressData = {
  totalCount: number;
  successCount: number;
};

export const updatePracticeDataStore = (totalCount: number, successCount: number) => {
  practiceProgressStore.set({
    successCount,
    totalCount
  });
};

export const practiceProgressStore = writable<PracticeProgressData>();
