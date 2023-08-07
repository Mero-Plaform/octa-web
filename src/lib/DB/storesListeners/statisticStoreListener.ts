import type { YearData } from '../../pages/statistic/interfaces/StatisticStore.js';
import { statisticUpdateStore } from '../../pages/statistic/stores/statisticUpdateStore.js';
import type { UpdateStatistic } from '../utils.js';
import { utilsWithCatch } from '../utilsWithCatch.js';

const statisticStoreListener = (yearData: YearData) => {
  (<UpdateStatistic>utilsWithCatch.get("updateStatistic")!)(yearData);
};

export const initDBStatisticStoreListener = () => {
  statisticUpdateStore.subscribe(statisticStoreListener);
};
