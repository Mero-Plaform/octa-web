import type { Word } from '../../pages/dictionary/interfaces/Word.js';
import { wordActionStore, type WordActionStoreData } from '../../pages/dictionary/stores/wordActionStore.js';
import { utilsWithCatch, type OnAddWord, type OnDeleteWord, type OnEditWord } from '../utils.js';

const handlers = {
  add: <OnAddWord>utilsWithCatch.get("onAddWord")!,
  edit: <OnEditWord>utilsWithCatch.get("onEditWord")!,
  delete: <OnDeleteWord>utilsWithCatch.get("onDeleteWord")!,
};

const wordStoreActionsListener = ([action, data]: WordActionStoreData) => {
  handlers[action](data as Word & string);
};

export const initDBWordStoreActionsListener = () => {
  wordActionStore.subscribe(wordStoreActionsListener);
};
