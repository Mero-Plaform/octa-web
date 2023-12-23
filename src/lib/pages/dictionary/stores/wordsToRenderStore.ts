import { derived } from 'svelte/store';
import { dictionaryPageOffsetStore } from './dictionaryPageOffsetStore.js';
import { dictionaryPaginationSettingsStore } from './dictionaryPaginationSettingsStore.js';
import { searchWordsTextStore } from './searchWordsTextStore.js';
import { wordStore } from './wordStore.js';

let prevSearchText = "";

export const wordsToRenderStore = derived([wordStore, searchWordsTextStore, dictionaryPageOffsetStore], ([words, searchText, pageOffset]) => {
  const wordsForRender = [...words!.values()]
    .filter(({ translations, variants, description }) =>
      variants.some((el) => el.toLowerCase().includes(searchText))
      || translations.some((el) => el.toLowerCase().includes(searchText))
      || description.toLowerCase().includes(searchText));

  const offset = searchText === prevSearchText ? pageOffset : 0;
  prevSearchText = searchText;

  const wordsToRenderAtCurrentPage = wordsForRender.slice(
    offset * 10,
    offset * 10 + 10,
  );

  dictionaryPaginationSettingsStore.update((settings) => ({
    ...settings,
    offset,
    size: wordsForRender.length
  }));

  return wordsToRenderAtCurrentPage;
});
