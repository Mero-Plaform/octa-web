<script lang="ts">
  import { Paginator } from "@skeletonlabs/skeleton";
  import { fade } from "svelte/transition";
  import {
    buttonBaseClasses,
    zincButtonColorClasses,
  } from "../../../../shared/styleClassesDeclarations.js";
  import { wordStore } from "../../../dictionary/stores/wordStore.js";
  import { practiceProgressStore } from "../../stores/practiceProgressStore.js";
  import { practiceViewStore } from "../../stores/practiceViewStore.js";
  import { practiceResultWordsToRenderStore } from "../../stores/practiceWordsResult/practiceResultWordsToRenderStore.js";
  import { practiceWordsResultPaginationSettingsStore } from "../../stores/practiceWordsResult/practiceWordsResultPaginationSettingsStore.js";
  import WordCard from "./WordCard.svelte";

  practiceWordsResultPaginationSettingsStore.update((settings) => ({
    ...settings,
    size: $practiceProgressStore.wordIds.length,
  }));

  const onBack = () => {
    practiceViewStore.set("task");
  };
</script>

<div transition:fade class="absolute flex flex-col h-full w-full">
  <div
    class="relative flex flex-wrap items-start justify-center gap-10 p-2 box-border w-full mt-7 overflow-auto grow"
  >
    {#each $practiceResultWordsToRenderStore as wordId, wordIndex}
      <WordCard
        word={wordStore.getById(wordId)}
        state={$practiceProgressStore.stats[wordIndex]}
      />
    {/each}
  </div>
  <div class="w-full p-2">
    <Paginator
      class="!flex-row space-y-0 [&_.paginator-label]:!hidden"
      text="cursor-default !mt-0"
      select="hidden"
      controlSeparator="gap-2"
      buttonClasses="btn border-none bg-cyan-400 hover:!bg-cyan-600 focus:bg-cyan-600 disabled:bg-cyan-300 rounded-md text-white text-lg p-2 px-4 "
      justify="justify-evenly"
      bind:settings={$practiceWordsResultPaginationSettingsStore}
    />
  </div>
  <div class="w-full pb-2 text-center">
    <button
      class="{buttonBaseClasses} {zincButtonColorClasses}"
      on:click={onBack}
    >
      back
    </button>
  </div>
</div>
