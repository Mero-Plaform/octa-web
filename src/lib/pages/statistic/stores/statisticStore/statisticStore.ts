import type { CustomWritableStore } from '../../../../utils/customStores/CustomWritableStore.js';
import { CustomWritableStoreFactory } from '../../../../utils/customStores/CustomWritableStoreFactory.js';
import type { StatisticStore, Year, YearData } from '../../interfaces/StatisticStore.js';

export type StatisticStoreValue = Map<Year, YearData>;

export let statisticStore: CustomWritableStore<StatisticStore>;

const getInitialStatisticStoreValue = (statisticArr: YearData[]) => {
  const initialStatisticMap: StatisticStoreValue = new Map();

  statisticArr.forEach((yearData) => {
    initialStatisticMap.set(yearData.year, yearData);
  });

  return initialStatisticMap;
};

export const createStatisticStore = (statisticArr: YearData[]) => {
  statisticStore = CustomWritableStoreFactory(getInitialStatisticStoreValue(statisticArr));
};
