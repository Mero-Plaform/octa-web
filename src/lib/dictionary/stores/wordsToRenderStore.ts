import { derived } from 'svelte/store';
import { searchWordsTextStore } from './searchWordsTextStore.js';
import { wordStore } from './wordStore.js';

export const wordsToRenderStore = derived([wordStore, searchWordsTextStore], ([words, searchText]) => {
  return [...words!.values()]
    .filter(({ translations, variants, description }) =>
      variants.some((el) => el.includes(searchText))
      || translations.some((el) => el.includes(searchText))
      || description.includes(searchText));
});
