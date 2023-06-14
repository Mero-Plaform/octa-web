<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import SearchInput from "../../utils/components/SearchInput/SearchInput.svelte";
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

  const onInputFocus = () => {
    document.addEventListener("keydown", onKeydown);
  };

  const onInputBlur = () => {
    document.removeEventListener("keydown", onKeydown);
  };

  const addInputListener = () => {
    inputElem.addEventListener("focus", onInputFocus);
    inputElem.addEventListener("blur", onInputBlur);
  };

  const removeInputListener = () => {
    inputElem.removeEventListener("focus", onInputFocus);
    inputElem.removeEventListener("blur", onInputBlur);
  };

  onMount(addInputListener);
  onDestroy(removeInputListener);

  let disableSearchOnEmptyDictionary: boolean;

  $: disableSearchOnEmptyDictionary = !Boolean($wordStore.size);
</script>

<SearchInput
  bind:disabled={disableSearchOnEmptyDictionary}
  bind:inputElem
  bind:value={$searchWordsTextStore}
  wrapStyles="max-w-md w-1/2 relative group"
  inputStyles="text-cyan-900 rounded-md p-2 w-full border-b-2 border-cyan-400 bg-white bg-opacity-50 group-hover:bg-opacity-100 focus:bg-opacity-100 selection:bg-cyan-500 selection:text-white outline-none pr-10 transition-all placeholder:text-cyan-700/70 disabled:bg-slate-400 disabled:bg-opacity-50 disabled:cursor-not-allowed"
  buttonStyles="rounded-md absolute top-2 right-2 outline-none"
  buttonClickHandler={clearInput}
  iconSrc={clearImageUrl}
  iconStyles="h-6 w-6 inline-block hover:scale-110 active:scale-90 bg-cyan-600 transition-all"
  placeholder="Search in dictionary..."
/>
