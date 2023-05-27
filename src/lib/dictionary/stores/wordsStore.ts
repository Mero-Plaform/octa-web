import { get, writable } from 'svelte/store';
import type { Word } from './Word.js';

/**
 * contains all dictionary words
 */
export const wordsStore = writable(new Map<Word['id'], Word>());

type NewWordData = Omit<Word, 'learnSuccess' | 'id'>;
type EditWordData = NewWordData;

export const getWordById = (wordId: string) => {
  return get(wordsStore).get(wordId);
};

export const addWord = (newWordData: NewWordData) => {
  const newWord = {
    id: String(new Date().getTime()),
    learnSuccess: 0,
    ...newWordData,
  };

  wordsStore.update((wordsMap) => {
    return wordsMap.set(newWord.id, newWord);
  });
};

export const editWord = (wordId: string, editWord: EditWordData) => {
  const learnSuccess = getWordById(wordId)!.learnSuccess;
  wordsStore.update((wordsMap) => {
    return wordsMap.set(wordId, { id: wordId, learnSuccess, ...editWord });
  });
};

export const removeWord = (wordId: string) => {
  wordsStore.update((wordsMap) => {
    wordsMap.delete(wordId);
    return wordsMap;
  });
};
