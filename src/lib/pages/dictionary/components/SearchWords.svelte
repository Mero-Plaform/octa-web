<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import SearchInput from "../../../utils/components/SearchInput/SearchInput.svelte";
  import { createDebounce } from "../../../utils/helpers.js";
  import { searchWordsTextStore } from "../stores/searchWordsTextStore.js";
  import { wordStore } from "../stores/wordStore.js";
  import clearImageUrl from "/src/assets/icons/clear.svg";

  let inputElem: HTMLInputElement;

  const onKeydown = ({ code }: { code: string }) => {
    if (code !== "Escape") {
      return;
    }
    clearInput();
  };

  const clearInput = () => {
    inputElem.value = "";
    $searchWordsTextStore = "";
  };

  const updateSearchWordsTextStore = () => {
    $searchWordsTextStore = inputElem.value.trim();
  };

  const updateSearchWordsTextStoreDebounce = createDebounce(
    updateSearchWordsTextStore,
    500
  );

  const onInputInput = () => {
    if (inputElem.value === "") {
      updateSearchWordsTextStore();
    } else {
      updateSearchWordsTextStoreDebounce();
    }
  };

  const onInputFocus = () => {
    document.addEventListener("keydown", onKeydown);
  };

  const onInputBlur = () => {
    document.removeEventListener("keydown", onKeydown);
  };

  const addInputListener = () => {
    inputElem.addEventListener("input", onInputInput);
    inputElem.addEventListener("focus", onInputFocus);
    inputElem.addEventListener("blur", onInputBlur);
  };

  const removeInputListener = () => {
    inputElem.removeEventListener("input", onInputInput);
    inputElem.removeEventListener("focus", onInputFocus);
    inputElem.removeEventListener("blur", onInputBlur);
  };

  onMount(addInputListener);
  onDestroy(removeInputListener);

  let disableSearchOnEmptyDictionary: boolean;

  // disable search input if no words
  $: disableSearchOnEmptyDictionary = !Boolean($wordStore.size);

  // clear search input if it's disabled
  $: $searchWordsTextStore = disableSearchOnEmptyDictionary
    ? ""
    : $searchWordsTextStore;
</script>

<SearchInput
  bind:disabled={disableSearchOnEmptyDictionary}
  bind:inputElem
  wrapStyles="max-w-md w-1/2 relative group"
  inputStyles="text-cyan-900 rounded-md p-2 w-full border-b-2 border-cyan-400 bg-white bg-opacity-50 group-hover:bg-opacity-100 focus:bg-opacity-100 selection:bg-cyan-500 selection:text-white  pr-10 transition-all placeholder:text-cyan-700/70 disabled:bg-slate-400 disabled:bg-opacity-50 disabled:cursor-not-allowed"
  buttonStyles="rounded-md absolute top-2 right-2 "
  buttonClickHandler={clearInput}
  iconSrc={clearImageUrl}
  iconStyles="h-6 w-6 inline-block hover:scale-110 active:scale-90 bg-cyan-600 transition-all"
  placeholder="Search in dictionary..."
/>
