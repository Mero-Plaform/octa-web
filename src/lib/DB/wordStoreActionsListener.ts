import { wordActionStore, type WordActionStoreActions, type WordActionStoreData } from '../pages/dictionary/stores/wordActionStore.js';
import { onAddWord, onDeleteWord, onEditWord } from './utils.js';

type WordStoreActionsHandlers = Record<WordActionStoreActions, Function>;

const handlers: WordStoreActionsHandlers = {
  add: onAddWord,
  edit: onEditWord,
  delete: onDeleteWord
};

const wordStoreActionsListener = ([action, wordId]: WordActionStoreData) => {
  handlers[action](wordId);
};

export const initDBWordStoreActionsListener = () => {
  wordActionStore.subscribe(wordStoreActionsListener);
};
