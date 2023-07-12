export type Year = string;

export type Month = "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

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

export type StatisticStoreValues = Record<Month, MonthData> & { year: Year; };

export type StatisticStore = Map<Year, StatisticStoreValues>;
