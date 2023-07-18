import { MONTHS } from '../../../utils/helpers.js';

export type Year = string;

export type Month = typeof MONTHS[number];

export type MonthData = {
  totalWordsAmount: number;
  addedWordsAmount: number;
  deletedWordsAmount: number;
  wordTotalPracticeAmount: number;
  wordOriginPracticeAmount: number;
  wordTranslationPracticeAmount: number;
  averagePracticeSuccess: number;
  successfulPracticeCount: number;
  unsuccessfulPracticeCount: number;
};

export type YearData = Record<Month, MonthData> & { year: Year; };

export type StatisticStore = Map<Year, YearData>;
