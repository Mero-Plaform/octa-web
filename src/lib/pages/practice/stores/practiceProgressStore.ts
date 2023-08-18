import { writable } from 'svelte/store';
import type { Word } from '../../dictionary/interfaces/Word.js';

export type PracticeProgressData = {
  totalCount: number;
  successCount: number;
  wordIds: Word["id"][];
  stats: boolean[];
};

let wordIds: Word["id"][] = [];
let stats: boolean[] = [];

export const updatePracticeDataStore = (totalCount: PracticeProgressData["totalCount"], successCount: PracticeProgressData["successCount"], wordId: PracticeProgressData["wordIds"][number], stat: PracticeProgressData["stats"][number]) => {
  wordIds.push(wordId);
  stats.push(stat);
  practiceProgressStore.set({
    successCount,
    totalCount,
    wordIds,
    stats
  });
};

/**
 * setting totalCount to passed prop, successCount to 0, empties wordIds & stats
 */
export const resetPracticeDataStore = (totalCount: PracticeProgressData["totalCount"]) => {
  wordIds = [];
  stats = [];
  practiceProgressStore.set({
    successCount: 0,
    totalCount,
    wordIds,
    stats
  });
};

export const practiceProgressStore = writable<PracticeProgressData>();
