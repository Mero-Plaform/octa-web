import { derived } from "svelte/store";
import { practiceProgressStore } from "../practiceProgressStore.js";
import { practiceWordsResultPaginationSettingsStore } from "./practiceWordsResultPaginationSettingsStore.js";

export const practiceResultWordsToRenderStore = derived(
  [
    practiceProgressStore,
    practiceWordsResultPaginationSettingsStore,
  ],
  ([
    $practiceProgressStore,
    $practiceWordsResultPaginationSettingsStore
  ]) => {
    return $practiceProgressStore.wordIds.slice(
      $practiceWordsResultPaginationSettingsStore.offset * 10,
      $practiceWordsResultPaginationSettingsStore.offset * 10 + 10,
    );
  });
