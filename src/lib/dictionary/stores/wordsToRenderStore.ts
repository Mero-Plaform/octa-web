import { derived } from 'svelte/store';
import { wordsStore } from './wordsStore.js';
import { searchWordsTextStore } from './searchWordsTextStore.js';

export const wordsToRenderStore = derived([wordsStore, searchWordsTextStore], ([words, searchText]) => {
  return [...words!.values()]
    .filter(({ translations, variants, description }) =>
      variants.some((el) => el.includes(searchText))
      || translations.some((el) => el.includes(searchText))
      || description.includes(searchText));
});
