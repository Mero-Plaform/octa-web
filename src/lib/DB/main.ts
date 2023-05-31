import type { Word } from '../dictionary/interfaces/Word.js';
import { createWordStore } from '../dictionary/stores/wordStore.js';
import { getAllDictionaryAsArray } from './utils.js';
import { initDBWordStoreActionsListener } from './wordStoreActionsListener.js';

export const initDB = async () => {
  const dictionaryArr = await getAllDictionaryAsArray()
  const wordsMap = new Map<Word['id'], Word>();
  dictionaryArr.forEach(({ id, ...properties }) => {
    wordsMap.set(id, { id, ...properties });
  });
  createWordStore(wordsMap);
  initDBWordStoreActionsListener();
};
