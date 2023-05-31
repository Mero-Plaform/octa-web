import type { Word } from '../dictionary/interfaces/Word.js';
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

export const getAllDictionaryAsArray = () => {
  return appDB.dictionary.toArray();
};
