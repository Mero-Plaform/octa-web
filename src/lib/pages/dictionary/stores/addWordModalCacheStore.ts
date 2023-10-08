import { writable } from 'svelte/store';

type AddWordModalCacheStoreValue = {
  newWordVariantsInput: string;
  newWordVariantsList: string[];
  newWordTranslationsInput: string;
  newWordTranslationsList: string[];
  newWordDescription: string;
};

export const addWordModalCacheStore = writable<AddWordModalCacheStoreValue>({
  newWordVariantsInput: "",
  newWordVariantsList: [],
  newWordTranslationsInput: "",
  newWordTranslationsList: [],
  newWordDescription: "",
});

export const resetAddWordModalCacheStore = () => {
  addWordModalCacheStore.set({
    newWordVariantsInput: "",
    newWordVariantsList: [],
    newWordTranslationsInput: "",
    newWordTranslationsList: [],
    newWordDescription: "",
  });
};
