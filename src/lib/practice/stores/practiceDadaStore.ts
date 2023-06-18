import { writable } from 'svelte/store';

export type PracticeDadaStore = {
  totalCount: number;
  successCount: number;
};

export const updatePracticeDadaStore = (totalCount: number, successCount: number) => {
  practiceDadaStore.set({
    successCount,
    totalCount
  });
};

export const practiceDadaStore = writable <PracticeDadaStore>();
