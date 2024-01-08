<script lang="ts">
  import { modalStore } from "@skeletonlabs/skeleton";
  import {
    getIconMaskStyes,
    getLearnSuccessActiveStyles,
    openEditWordModal,
    showToast,
  } from "../../../utils/helpers.js";
  import type { Word } from "../interfaces/Word.js";
  import { editWordProgressStore } from "../stores/editWordProgressStore.js";
  import { editWordStore } from "../stores/editWordStore.js";
  import { removeWordStore } from "../stores/removeWordStore.js";
  import { wordPracticeStore } from "../stores/wordPracticeStore.js";
  import deleteIconUrl from "/src/assets/icons/delete.svg";
  import editIconUrl from "/src/assets/icons/edit.svg";
  import octaSlateIconUrl from "/src/assets/icons/octopus-slate.svg";

  export let word: Word;

  const onWordRemove = () => {
    removeWordStore.set(word);
    modalStore.trigger({
      type: "component",
      component: "removeWord",
      backdropClasses:
        "!bg-red-200 !bg-opacity-50 backdrop-blur-sm cursor-pointer !z-40" +
        (import.meta.env.VITE_BUILD_PLATFORM === "desktop" &&
          " h-[calc(100vh-24px)] bottom-0 top-auto"),
    });
  };

  const onWordEdit = () => {
    editWordStore.set(word);
    editWordProgressStore.set({
      ...word,
      variantInputValue: "",
      translationInputValue: "",
    });

    openEditWordModal();
  };

  const onWordPractice = () => {
    wordPracticeStore.set(word);
    modalStore.trigger({
      type: "component",
      component: "wordPractice",
      backdropClasses:
        "!bg-pink-200 !bg-opacity-50 backdrop-blur-sm cursor-pointer !z-40" +
        (import.meta.env.VITE_BUILD_PLATFORM === "desktop" &&
          " h-[calc(100vh-24px)] bottom-0 top-auto"),
    });
  };

  const copyChipData = ({
    target,
  }: MouseEvent & { currentTarget: HTMLElement }) => {
    if (!(target as HTMLSpanElement).classList.contains("chip")) {
      return;
    }

    navigator.clipboard.writeText((target as HTMLSpanElement).textContent!);
    showToast("Copied to clipboard", "bg-cyan-400", 2000);
  };
</script>

<div
  class="flex gap-2 bg-white bg-opacity-30 hover:bg-opacity-50 p-2 rounded-md bg-[length:20%] bg-repeat-space transition-all"
  style={`background-image: url('${octaSlateIconUrl}')`}
>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="inline-flex flex-col justify-center grow gap-2 max-w-xs box-border rounded-md"
    on:click={copyChipData}
  >
    <div
      class="flex flex-wrap gap-2 p-2 max-h-28 overflow-auto bg-orange-300 bg-opacity-50 rounded-md"
    >
      {#each word.variants as variant}
        <span
          class="chip bg-orange-300 grow break-all whitespace-pre-wrap"
          >{variant}</span
        >
      {/each}
    </div>
    <div
      class="flex flex-wrap gap-2 p-2 max-h-28 overflow-auto bg-green-300 bg-opacity-50 rounded-md"
    >
      {#each word.translations as translation}
        <span
          class="chip bg-green-300 grow break-all whitespace-pre-wrap"
          >{translation}</span
        >
      {/each}
    </div>
    {#if word.description}
      <div
        class="description max-h-24 overflow-auto w-full p-2 rounded-md bg-sky-300 bg-opacity-50 break-all whitespace-pre-wrap pointer-events-none"
      >
        <div
          class="bg-sky-300 rounded-md text-xs p-2 cursor-default text-center"
        >
          {word.description}
        </div>
      </div>
    {/if}
  </div>
  <div class="flex flex-col items-center gap-2">
    <button
      class="rounded-md text-center text-xm px-2 leading-8 transition-all active:scale-90 {getLearnSuccessActiveStyles(
        word.learnSuccess,
      )}"
      on:click={onWordPractice}
    >
      {word.learnSuccess}<!--
      --><span class="text-xss pointer-events-none"
        >%</span
      >
    </button>
    <button
      on:click={onWordEdit}
      type="button"
      class="h-8 w-8 rounded-md bg-purple-200 hover:bg-purple-300 focus:bg-purple-300 transition-all active:scale-90"
    >
      <div
        class="h-1/2 w-1/2 m-auto bg-purple-500"
        style={getIconMaskStyes(editIconUrl)}
      />
    </button>
    <button
      on:click={onWordRemove}
      type="button"
      class="h-8 w-8 rounded-md bg-red-200 hover:bg-red-300 focus:bg-red-300 transition-all active:scale-90"
    >
      <div
        class="h-1/2 w-1/2 m-auto bg-red-500"
        style={getIconMaskStyes(deleteIconUrl)}
      />
    </button>
  </div>
</div>
