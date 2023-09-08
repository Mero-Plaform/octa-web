import { writable } from 'svelte/store';

type AddWordModalCacheStoreValue = {
  newWordVariantsList: string[];
  newWordTranslationsList: string[];
  newWordDescription: string;
};

const initialValue = {
  newWordVariantsList: [],
  newWordTranslationsList: [],
  newWordDescription: ""
};

export const addWordModalCacheStore = writable<AddWordModalCacheStoreValue>({ ...initialValue });

export const resetAddWordModalCacheStore = () => {
  addWordModalCacheStore.set({ ...initialValue });
};
