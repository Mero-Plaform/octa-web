import type { Word } from '../dictionary/interfaces/Word.js';
import type { SettingsStore } from '../practice/interfaces/settings.js';
import { appDB } from './AppDB.js';

export const onAddWord = (newWord: Word) => {
  appDB.dictionary.add({
    ...newWord
  });
};

export const onEditWord = (editedWord: Word) => {
  appDB.dictionary.put(editedWord, editedWord.id);
};

export const onDeleteWord = (wordId: Word['id']) => {
  appDB.dictionary.delete(wordId);
};

export const getDictionaryDataAsArray = () => {
  return appDB.dictionary.toArray();
};

export const getPracticeData = () => {
  return appDB.practice.where({ id: 1 }).first();
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
