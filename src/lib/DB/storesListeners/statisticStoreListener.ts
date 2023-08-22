import type { YearData } from '../../pages/statistic/interfaces/StatisticStore.js';
import { statisticUpdateStore } from '../../pages/statistic/stores/statisticUpdateStore.js';
import { DBUtilsFacade } from '../DBUtilsFacade.js';

const statisticStoreListener = (yearData: YearData) => {
  DBUtilsFacade.updateStatistic(yearData);
};

export const initDBStatisticStoreListener = () => {
  statisticUpdateStore.subscribe(statisticStoreListener);
};
