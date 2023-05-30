import { CustomWritableStoreFactory } from '../../utils/CustomWritableStoreFactory.js';
import type { Word } from '../interfaces/Word.js';
import { wordsActionStore } from './wordsActionStore.js';

const getById = (wordId: string): Word | undefined => {
  return wordStore.value.get(wordId);
};

type NewWordData = Omit<Word, 'learnSuccess' | 'id'>;
type EditWordData = NewWordData;

const addWord = (newWordData: NewWordData) => {
  const newWordId = String(new Date().getTime());
  const newWord = {
    id: newWordId,
    learnSuccess: 0,
    ...newWordData,
  };

  wordStore.update((wordsMap) => {
    return wordsMap.set(newWord.id, newWord);
  });

  wordsActionStore.set(['add', newWord]);
};

const editWord = (wordId: string, editedWordData: EditWordData) => {
  const learnSuccess = wordStore.getById(wordId)!.learnSuccess;
  const editedWord = { id: wordId, learnSuccess, ...editedWordData };
  wordStore.update((wordsMap) => {
    return wordsMap.set(wordId, editedWord);
  });

  wordsActionStore.set(['edit', editedWord]);
};

const removeWord = (wordId: string) => {
  wordStore.update((wordsMap) => {
    wordsMap.delete(wordId);
    return wordsMap;
  });

  wordsActionStore.set(['delete', wordId]);
};

export const wordStore = CustomWritableStoreFactory(new Map<Word['id'], Word>(), {
  getById,
  removeWord,
  editWord,
  addWord
});
