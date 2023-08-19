import { derived } from 'svelte/store';
import type { ChartData } from '../components/chart/ChartData.js';
import { filterByData, filterByDate } from '../components/chart/statisticUtils.js';
import type { YearData } from '../interfaces/StatisticStore.js';
import { dataSelectStore } from './dataSelectStore.js';
import { dateSelectStore } from './dateSelectStore.js';
import { statisticStore } from './statisticStore/statisticStore.js';

// statisticStore for new passive practice data appears
export const chartDataSetsStore = derived([dateSelectStore, dataSelectStore, statisticStore], (
  [$dateSelectStore, $dataSelectStore]) => {
  let statisticFilterByDate: YearData | YearData[];
  let statisticFilterByData: ChartData[];

  statisticFilterByDate = filterByDate($dateSelectStore);
  statisticFilterByData = filterByData($dataSelectStore, $dateSelectStore, statisticFilterByDate);
  
  return statisticFilterByData;
});
