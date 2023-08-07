import type { Word } from '../../pages/dictionary/interfaces/Word.js';
import { wordActionStore, type WordActionStoreData } from '../../pages/dictionary/stores/wordActionStore.js';
import { type OnAddWord, type OnDeleteWord, type OnEditWord } from '../utils.js';
import { utilsWithCatch } from '../utilsWithCatch.js';

let handlers: {
  add: (newWord: Word) => Promise<unknown>;
  edit: (editedWord: Word) => Promise<unknown>;
  delete: (wordId: string) => Promise<unknown>;
};

const setupHandlers = () => {
  handlers = {
    add: <OnAddWord>utilsWithCatch.get("onAddWord")!,
    edit: <OnEditWord>utilsWithCatch.get("onEditWord")!,
    delete: <OnDeleteWord>utilsWithCatch.get("onDeleteWord")!,
  };
}

const wordStoreActionsListener = ([action, data]: WordActionStoreData) => {
  handlers[action](data as Word & string);
};

export const initDBWordStoreActionsListener = () => {
  setupHandlers();
  wordActionStore.subscribe(wordStoreActionsListener);
};
