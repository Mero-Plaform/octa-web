import { type CustomWritableStore, CustomWritableStoreFactory } from '../../utils/CustomWritableStoreFactory.js';
import type { Word } from '../interfaces/Word.js';
import { wordsActionStore } from './wordsActionStore.js';

const getById = (wordId: string): Word | undefined => {
  return wordStore.value.get(wordId);
};

type NewWordData = Omit<Word, 'learnSuccess' | 'id'>;
type EditWordData = Omit<Word, 'id'>;

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
  const editedWord = { id: wordId, ...editedWordData };
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

type WordStore = CustomWritableStore<Map<string, Word>> & {
  getById: (wordId: string) => Word | undefined;
  removeWord: (wordId: string) => void;
  editWord: (wordId: string, editedWordData: EditWordData) => void;
  addWord: (newWordData: NewWordData) => void;
};

export const createWordStore = (storeValue: Map<Word['id'], Word>) => {
  wordStore = CustomWritableStoreFactory(storeValue, {
    getById,
    removeWord,
    editWord,
    addWord
  });
};

export let wordStore: WordStore;
