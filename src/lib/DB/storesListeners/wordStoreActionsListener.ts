import type { Word } from '../../pages/dictionary/interfaces/Word.js';
import { wordActionStore, type WordActionStoreData } from '../../pages/dictionary/stores/wordActionStore.js';
import { DBUtilsFacade } from '../DBUtilsFacade.js';

let handlers: {
  add: (newWord: Word) => Promise<unknown>;
  edit: (editedWord: Word) => Promise<unknown>;
  delete: (wordId: string) => Promise<unknown>;
};

const setupHandlers = () => {
  handlers = {
    add: DBUtilsFacade.onAddWord,
    edit: DBUtilsFacade.onEditWord,
    delete: DBUtilsFacade.onDeleteWord,
  };
};

const wordStoreActionsListener = ([action, data]: WordActionStoreData) => {
  handlers[action](data as Word & string);
};

export const initDBWordStoreActionsListener = () => {
  setupHandlers();
  wordActionStore.subscribe(wordStoreActionsListener);
};
