import { DBUtilsFacade } from "../../../../DB/DBUtilsFacade.js";
import { getStatisticInitialValues } from "../../../../DB/initialData/statisticInitialValues.js";
import { MONTHS } from '../../../../utils/helpers.js';
import { type YearData } from '../../interfaces/StatisticStore.js';
import { chartLabelsStore } from '../../stores/chartLabelsStore.js';
import type { DataSelectStoreValue } from '../../stores/dataSelectStore.js';
import type { DateSelectStoreValue } from '../../stores/dateSelectStore.js';
import type { MonthData } from '../../stores/statisticStore/MonthData.js';
import { statisticStore } from '../../stores/statisticStore/statisticStore.js';
import { ChartData } from './ChartData.js';

const CHART_BORDER_COLOR: { [key: string]: string; } = {
  addedWordsAmount: "red",
  deletedWordsAmount: "black",
  totalWordsAmount: "orange",
  wordTranslation: "pink",
  averagePracticeSuccess: "teal",
  successfulPracticeCount: "deepskyblue",
  unsuccessfulPracticeCount: "grey",
  wordOriginPracticeAmount: "maroon",
  wordTranslationPracticeAmount: "green",
  wordTotalPracticeAmount: "blue",
};

const allWorkKeys: MonthDataWorkKeys = [
  "addedWordsAmount",
  "deletedWordsAmount",
  "totalWordsAmount",
  "averagePracticeSuccess",
  "successfulPracticeCount",
  "unsuccessfulPracticeCount",
  "wordOriginPracticeAmount",
  "wordTranslationPracticeAmount",
  "wordTotalPracticeAmount",
];

const wordsWorkKeys: MonthDataWorkKeys = [
  allWorkKeys[0], // addedWordsAmount
  allWorkKeys[1], // deletedWordsAmount
  allWorkKeys[2], // totalWordsAmount
];

const practiceWorkKeys: MonthDataWorkKeys = [
  allWorkKeys[3], // averagePracticeSuccess
  allWorkKeys[4], // successfulPracticeCount
  allWorkKeys[5], // unsuccessfulPracticeCount
  allWorkKeys[6], // wordOriginPracticeAmount
  allWorkKeys[7], // wordTranslationPracticeAmount
  allWorkKeys[8], // wordTotalPracticeAmount
];

const workKeysGroups: { [key: DataSelectStoreValue[number]]: MonthDataWorkKeys; } = {
  "all": allWorkKeys,
  "words": wordsWorkKeys,
  "practice": practiceWorkKeys
};

type MonthDataWorkKeys = Array<keyof MonthData>;

/* -------------------------------------------------------------------------- */
/*                                 data select                                */
/* -------------------------------------------------------------------------- */

const specificDataFilterHandler = ({ year, ...monthsData }: YearData, dataWorkKeys: MonthDataWorkKeys): ChartData[] => {
  const datasets = new Map<MonthDataWorkKeys[number], ChartData>();

  dataWorkKeys.forEach((key) => {
    datasets.set(key, new ChartData(key, CHART_BORDER_COLOR[key]));
  });

  // monthData is without year field
  Object.values(monthsData).forEach((monthData) => {
    dataWorkKeys.forEach((key) => {
      datasets.get(key)!.data.push(monthData[key]);
    });
  });

  return [...datasets.values()];
};

const allYearsFilterHandler = (statisticData: YearData[], dataWorkKeys: MonthDataWorkKeys): ChartData[] => {
  const datasets = new Map<MonthDataWorkKeys[number], ChartData>();

  dataWorkKeys.forEach((key) => {
    datasets.set(key, new ChartData(key, CHART_BORDER_COLOR[key]));
  });

  const statisticMonthSum = new Map<MonthDataWorkKeys[number], number>();

  statisticData.forEach(({ year, ...monthsData }) => {
    // monthData is without year field
    Object.values(monthsData).forEach((monthData) => {
      dataWorkKeys.forEach((key) => {
        statisticMonthSum.set(key, statisticMonthSum.get(key) || 0 + monthData[key]);
      });
    });

    dataWorkKeys.forEach((key) => {
      datasets.get(key)!.data.push(statisticMonthSum.get(key)!);
      statisticMonthSum.set(key, 0);
    });
  });

  return [...datasets.values()];
};

type FilterByData = (data: DataSelectStoreValue, date: string, statisticData: YearData | YearData[]) => ChartData[];

export const filterByData: FilterByData = (data, date, statisticData) => {
  if (date === "all") {
    return allYearsFilterHandler(statisticData as YearData[], workKeysGroups[data]);
  } else {
    return specificDataFilterHandler(statisticData as YearData, workKeysGroups[data]);
  }
};

/* -------------------------------------------------------------------------- */
/*                                 date select                                */
/* -------------------------------------------------------------------------- */

const onDateAll = () => {
  chartLabelsStore.set([...statisticStore.value.keys()]);
  return [...statisticStore.value.values()];
};

const onSpecificDate = (date: DateSelectStoreValue) => {
  chartLabelsStore.set(MONTHS);
  return statisticStore.value.get(date)!;
};

export const filterByDate = (date: DateSelectStoreValue) =>
  date === "all" ? onDateAll() : onSpecificDate(date);

/* -------------------------------------------------------------------------- */
/*                              new year arrives                              */
/* -------------------------------------------------------------------------- */

/**
 * checking that the new year has arrived and creating it's data entry
 */
export const addingNewArrivedYearToStatisticIfNeeded = (currentStatisticData: YearData[]) => {
  const currentYear = String((new Date()).getFullYear());

  if (currentStatisticData.some(({ year }) => year === currentYear)) {
    return;
  }

  const newYearStatistic = getStatisticInitialValues()[0];
  currentStatisticData.push(newYearStatistic);
  return DBUtilsFacade.updateStatistic(newYearStatistic);
};
