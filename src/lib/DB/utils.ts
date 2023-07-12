import type { Word } from '../pages/dictionary/interfaces/Word.js';
import type { SettingsStore } from '../pages/practice/interfaces/settings.js';
import type { StatisticStoreValues, Year } from '../pages/statistic/interfaces/StatisticStore.js';
import { appDB } from './AppDB.js';

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

export const updateStatistic = (yearData: StatisticStoreValues) => {
  appDB.statistic.put(yearData);
};

export const getStatisticDataAsArray = () => {
  return appDB.statistic.toArray();
};
