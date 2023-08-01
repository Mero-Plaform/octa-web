import type { YearData } from '../../pages/statistic/interfaces/StatisticStore.js';
import { statisticUpdateStore } from '../../pages/statistic/stores/statisticUpdateStore.js';
import { utilsWithCatch, type UpdateStatistic } from '../utils.js';

const statisticStoreListener = (yearData: YearData) => {
  (<UpdateStatistic>utilsWithCatch.get("updateStatistic")!)(yearData);
};

export const initDBStatisticStoreListener = () => {
  statisticUpdateStore.subscribe(statisticStoreListener);
};
