import { derived } from 'svelte/store';
import { searchWordsTextStore } from '/src/lib/dictionary/stores/searchWordsTextStore.js';
import { wordsStore } from './wordsStore.js';

export const wordsToRenderStore = derived([wordsStore, searchWordsTextStore], ([words, searchText]) => {
  return [...words.values()]
    .filter(({ translations, variants, description }) =>
      variants.some((el) => el.includes(searchText))
      || translations.some((el) => el.includes(searchText))
      || description.includes(searchText));
});
