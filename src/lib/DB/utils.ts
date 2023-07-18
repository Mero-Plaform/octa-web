import type { Word } from '../pages/dictionary/interfaces/Word.js';
import type { SettingsStore } from '../pages/practice/interfaces/settings.js';
import type { YearData } from '../pages/statistic/interfaces/StatisticStore.js';
import { appDB } from './AppDB.js';

/* -------------------------------------------------------------------------- */
/*                                 dictionary                                 */
/* -------------------------------------------------------------------------- */

export const onAddWord = (newWord: Word) => {
  appDB.dictionary.add({
    ...newWord
  });
};

export const onEditWord = (editedWord: Word) => {
  appDB.dictionary.put(editedWord);
};

export const onDeleteWord = (wordId: Word['id']) => {
  appDB.dictionary.delete(wordId);
};

export const getDictionaryDataAsArray = () => {
  return appDB.dictionary.toArray();
};

/* -------------------------------------------------------------------------- */
/*                                  practice                                  */
/* -------------------------------------------------------------------------- */

export const getPracticeData = () => {
  return appDB.practice.get({ id: 1 });
};

export const initPracticeData = (practiceInitialValues: SettingsStore) => {
  appDB.practice.add({
    ...practiceInitialValues
  });
};

/**
 * the only key containing data in practice table
 */
const practiceDataKey = 1;
export const updatePracticeData = (practiceData: SettingsStore) => {
  appDB.practice.update(practiceDataKey, practiceData);
};

/* -------------------------------------------------------------------------- */
/*                                  statistic                                 */
/* -------------------------------------------------------------------------- */

export const updateStatistic = (yearData: YearData) => {
  appDB.statistic.put(yearData);
};

export const getStatisticDataAsArray = () => {
  return appDB.statistic.toArray();
};

export const initStatisticData = (statisticInitialValues: YearData) => {
  appDB.statistic.add({
    ...statisticInitialValues
  });
};
