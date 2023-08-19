import { MONTHS } from '../../../../utils/helpers.js';
import { wordActionStore, type WordActionStoreActions, type WordActionStoreData } from '../../../dictionary/stores/wordActionStore.js';
import { wordStore } from '../../../dictionary/stores/wordStore.js';
import type { PracticeTarget, SettingsStore } from '../../../practice/interfaces/settings.js';
import { practiceActionStore, type PracticeActionStoreActions } from '../../../practice/stores/practiceActionStore.js';
import { settingsStore } from '../../../practice/stores/settingsStore.js';
import type { Month, StatisticStore, Year, YearData } from '../../interfaces/StatisticStore.js';
import { statisticUpdateStore } from '../statisticUpdateStore.js';
import { MonthData } from './MonthData.js';
import { statisticStore } from './statisticStore.js';

/* -------------------------------------------------------------------------- */
/*                               practiceTarget                               */
/* -------------------------------------------------------------------------- */

let practiceTarget: PracticeTarget;

const settingsStoreListener = ({ practiceTarget: practiceTargetValue }: SettingsStore) => {
  practiceTarget = practiceTargetValue;
};

/* -------------------------------------------------------------------------- */
/*                                   helpers                                  */
/* -------------------------------------------------------------------------- */

const createInitialYearData = (curYear: Year) => {
  const yearData = {} as YearData;
  MONTHS.forEach((month) => {
    yearData[month] = new MonthData();
  });
  yearData.year = curYear;
  return yearData;
};

const getCurYearData = (statistic: StatisticStore, curYear: Year) =>
  statistic.has(curYear) ? statistic.get(curYear)! : createInitialYearData(curYear);

const getDateInfo = () => {
  return new Date().toLocaleString("en-US", { month: "long", year: "numeric" }).split(' ') as [Month, Year];
};

/* -------------------------------------------------------------------------- */
/*                           wordActionStoreListener                          */
/* -------------------------------------------------------------------------- */

const wordActionStoreListener = ([action, data]: WordActionStoreData) => {
  if (!(action in wordActionListeners)) { return; }
  wordActionListeners[action as AllowedValues](data);
};

const onDeleteWord = () => {
  statisticStore.update((statistic) => {
    const [curMonth, curYear] = getDateInfo();
    const curYearData = getCurYearData(statistic, curYear);

    curYearData[curMonth].totalWordsAmount = wordStore.value.size;
    curYearData[curMonth].deletedWordsAmount += 1;
    statistic.set(curYear, curYearData);
    statisticUpdateStore.set(curYearData);

    return statistic;
  });
};

const onAddWord = () => {
  statisticStore.update((statistic) => {
    const [curMonth, curYear] = getDateInfo();
    const curYearData = getCurYearData(statistic, curYear);

    curYearData[curMonth].totalWordsAmount = wordStore.value.size;
    curYearData[curMonth].addedWordsAmount += 1;
    statistic.set(curYear, curYearData);
    statisticUpdateStore.set(curYearData);

    return statistic;
  });
};

type AllowedValues = "add" | "delete";

const wordActionListeners: Record<Extract<WordActionStoreActions, AllowedValues>, Function> = {
  add: onAddWord,
  delete: onDeleteWord
};

/* -------------------------------------------------------------------------- */
/*                        practiceActionStoreListeners                        */
/* -------------------------------------------------------------------------- */

const statisticStoreUpdateOnPractice = (type: PracticeActionStoreActions, practiceTarget: PracticeTarget) => {
  statisticStore.update((statistic) => {
    const [curMonth, curYear] = getDateInfo();
    const curYearData = getCurYearData(statistic, curYear);

    // update specific practice result amount
    if (type === "successful") {
      curYearData[curMonth].successfulPracticeCount += 1;
    } else {
      curYearData[curMonth].unsuccessfulPracticeCount += 1;
    }

    // update specific practice target amount
    if (practiceTarget === "original") {
      curYearData[curMonth].wordOriginPracticeAmount += 1;
    } else {
      curYearData[curMonth].wordTranslationPracticeAmount += 1;
    }

    curYearData[curMonth].wordTotalPracticeAmount += 1;
    curYearData[curMonth].averagePracticeSuccess = Number((curYearData[curMonth].successfulPracticeCount / curYearData[curMonth].wordTotalPracticeAmount).toFixed(2)) * 100;

    statistic.set(curYear, curYearData);

    statisticUpdateStore.set(curYearData);

    return statistic;
  });
}

const onPracticeProgress = (type: PracticeActionStoreActions) => {
  statisticStoreUpdateOnPractice(type, practiceTarget);
};

/**
 * updating statisticUpdateStore to notify AppDB
 */
export const initStatisticStoreListeners = () => {
  settingsStore.subscribe(settingsStoreListener);
  wordActionStore.subscribe(wordActionStoreListener);
  practiceActionStore.subscribe(onPracticeProgress);
};

/* -------------------------------------------------------------------------- */
/*                          passive practice handler                          */
/* -------------------------------------------------------------------------- */

export const onPassivePractice = (type: PracticeActionStoreActions, practiceTarget: PracticeTarget) => {
  statisticStoreUpdateOnPractice(type, practiceTarget);
};
