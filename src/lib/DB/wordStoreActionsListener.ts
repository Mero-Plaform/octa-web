import { wordsActionStore, type WordActionStoreAction, type WordActionStoreData } from '../dictionary/stores/wordsActionStore.js';
import { onAddWord, onDeleteWord, onEditWord } from './utils.js';

type WordStoreActionsHandlers = Record<WordActionStoreAction, Function>;

const handlers: WordStoreActionsHandlers = {
  add: onAddWord,
  edit: onEditWord,
  delete: onDeleteWord
};

const wordStoreActionsListener = ([action, wordId]: WordActionStoreData) => {
  handlers[action](wordId);
};

export const initDBWordStoreActionsListener = () => {
  wordsActionStore.subscribe(wordStoreActionsListener);
};
