import { writable } from 'svelte/store';

type AddWordModalCacheStoreValue = {
  newWordVariantsList: string[];
  newWordTranslationsList: string[];
  newWordDescription: string;
};

export const addWordModalCacheStore = writable<AddWordModalCacheStoreValue>({
  newWordVariantsList: [],
  newWordTranslationsList: [],
  newWordDescription: "",
});

export const resetAddWordModalCacheStore = () => {
  addWordModalCacheStore.set({
    newWordVariantsList: [],
    newWordTranslationsList: [],
    newWordDescription: "",
  });
};
