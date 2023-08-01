import { derived } from 'svelte/store';
import type { ChartData } from '../components/chart/ChartData.js';
import { filterByData, filterByDate } from '../components/chart/statisticUtils.js';
import type { YearData } from '../interfaces/StatisticStore.js';
import { dataSelectStore } from './dataSelectStore.js';
import { dateSelectStore } from './dateSelectStore.js';

export const chartDataSetsStore = derived([dateSelectStore, dataSelectStore], (
  [$dateSelectStore, $dataSelectStore]) => {
  let statisticFilterByDate: YearData | YearData[];
  let statisticFilterByData: ChartData[];

  statisticFilterByDate = filterByDate($dateSelectStore);
  statisticFilterByData = filterByData($dataSelectStore, $dateSelectStore, statisticFilterByDate);
  
  return statisticFilterByData;
});
