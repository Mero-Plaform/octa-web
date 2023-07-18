import type { YearData } from '../../pages/statistic/interfaces/StatisticStore.js';
import { MonthData } from '../../pages/statistic/stores/statisticStore/MonthData.js';
import { MONTHS } from '../../utils/helpers.js';

export const statisticInitialValues = () => {
  const currentYear = String((new Date()).getFullYear());
  const yearData = {} as YearData;
  MONTHS.forEach((monthName) => {
    yearData[monthName] = new MonthData();
  });
  yearData.year = currentYear;
  
  return [yearData];
};
