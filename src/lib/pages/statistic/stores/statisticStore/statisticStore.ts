import { writable, type Writable } from 'svelte/store';
import type { StatisticStore, StatisticStoreValues } from '../../interfaces/StatisticStore.js';

export let statisticStore: Writable<StatisticStore>;

export const createStatisticStore = (statisticArr: StatisticStoreValues[]) => {
  const initialStatisticMap = new Map();
  statisticArr.forEach((yearData) => {
    initialStatisticMap.set(yearData.year, yearData);
  });
  statisticStore = writable(initialStatisticMap);
};
