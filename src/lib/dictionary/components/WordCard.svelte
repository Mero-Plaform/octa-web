<script lang="ts">
  import {
    modalStore,
    popup,
    type PopupSettings,
  } from "@skeletonlabs/skeleton";
  import { getIconMaskStyes } from '../../utils/helpers.js';
  import { removeWordIdStore } from '../stores/removeWordIdStore.js';
  import { editWordIdStore } from '../stores/editWordIdStore.js';
  import type { Word } from '../interfaces/Word.js';
  import editImageUrl from "/src/assets/icons/edit.svg";
  import deleteImageUrl from "/src/assets/icons/delete.svg";

  export let word: Word;

  const getLearnSuccessStyles = () => {
    if (word.learnSuccess === 0) {
      return "bg-slate-300 hover:bg-slate-400";
    } else if (word.learnSuccess < 40) {
      return "bg-orange-300 hover:bg-orange-400";
    } else if (word.learnSuccess < 75) {
      return "bg-amber-300 hover:bg-amber-400";
    } else {
      return "bg-green-300 hover:bg-green-400";
    }
  };

  const onWordRemove = (wordId: string) => {
    removeWordIdStore.set(wordId);
    modalStore.trigger({
      type: "component",
      component: "removeWord",
      backdropClasses: "!bg-red-200 !bg-opacity-50 backdrop-blur-sm",
    });
  };

  const onWordEdit = (wordId: string) => { 
    editWordIdStore.set(wordId);
    modalStore.trigger({
      type: "component",
      component: "editWord",
      backdropClasses: "!bg-purple-200 !bg-opacity-50 backdrop-blur-sm",
    });
  };

  const popupHover: PopupSettings = {
    event: "hover",
    target: "popupHover",
    placement: "right",
  };
</script>

<div class="flex gap-2 wordCard bg-white bg-opacity-30 p-2 rounded-md">
  <div
    class="inline-flex flex-col justify-center grow gap-2 max-w-xs box-border rounded-md"
  >
    <div
      class="flex flex-wrap gap-2 p-2 max-h-28 overflow-auto bg-orange-300 bg-opacity-50 rounded-md"
    >
      {#each word.variants as variant}
        <span
          class="chip bg-orange-300 hover:filter-none grow break-all whitespace-normal cursor-default"
          >{variant}</span
        >
      {/each}
    </div>
    <div
      class="flex flex-wrap gap-2 p-2 max-h-28 overflow-auto bg-green-300 bg-opacity-50 rounded-md"
    >
      {#each word.translations as translation}
        <span
          class="chip bg-green-300 hover:filter-none grow break-all whitespace-normal cursor-default"
          >{translation}</span
        >
      {/each}
    </div>
    {#if word.description}
      <div class="w-full p-2 rounded-md bg-sky-300 bg-opacity-50 break-all">
        <div
          class="max-h-24 overflow-auto bg-sky-300 rounded-md text-xs p-2 cursor-default text-center"
        >
          {word.description}
        </div>
      </div>
    {/if}
  </div>
  <div class="flex flex-col items-center gap-2">
    <span
      class="rounded-md text-center text-xm px-2 leading-8 cursor-default transition-all {getLearnSuccessStyles()}"
      use:popup={popupHover}
    >
      {word.learnSuccess}<span class="text-xss pointer-events-none">%</span>
    </span>
    <button
      on:click={() => onWordEdit(word.id)}
      type="button"
      class="h-8 w-8 rounded-md bg-purple-200 hover:bg-purple-300 focus:bg-purple-300 transition-all active:scale-90 outline-none"
    >
      <div
        class="h-1/2 w-1/2 m-auto bg-purple-500"
        style={getIconMaskStyes(editImageUrl)}
      />
    </button>
    <button
      on:click={() => onWordRemove(word.id)}
      type="button"
      class="h-8 w-8 rounded-md bg-red-200 hover:bg-red-300 focus:bg-red-300 transition-all active:scale-90 outline-none"
    >
      <div
        class="h-1/2 w-1/2 m-auto bg-red-500"
        style={getIconMaskStyes(deleteImageUrl)}
      />
    </button>
  </div>
</div>
