<script lang="ts">
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
  import { fade } from "svelte/transition";
  import type { ClickHandler } from "../../../shared/interfaces/basic.js";
  import type { Word } from "../../dictionary/interfaces/Word.js";
  import { settingsStore } from "../stores/settingsStore.js";
  import TaskProgress from "./TaskProgress.svelte";
  import WordData from "./WordData.svelte";
  import WordDataViewToggle from "./WordDataViewToggle.svelte";

  export let variants: Word["variants"];
  export let translations: Word["translations"];
  export let description: Word["description"];
  export let selectedTaskResult: null | boolean = null;
  export let onNext: ClickHandler;
  export let onSettings: ClickHandler;

  const resetShowPracticeTarget = () => {
    showPracticeTarget = false;
  };

  let showPracticeTarget = false;
</script>

<div
  transition:fade
  class="flex flex-col justify-center items-center gap-[3vh] h-full w-90% p-2 absolute select-none"
>
  <WordData
    show={showPracticeTarget}
    coverStyles="absolute bg-orange-400 w-full transition-all rounded-md font-bold text-orange-800 flex justify-center items-center"
    hide={$settingsStore.practiceTarget === "original"}
    data={variants}
    wrapStyles="overflow-y-auto flex flex-wrap gap-2 p-2 max-h-28 bg-orange-300 bg-opacity-50 rounded-md"
    chipStyles="overflow-hidden relative chip text-orange-800 bg-orange-300 hover:filter-none grow break-all whitespace-normal cursor-default"
  />

  <WordDataViewToggle bind:showPracticeTarget />

  <WordData
    show={showPracticeTarget}
    coverStyles="absolute bg-green-400 w-full transition-all rounded-md font-bold text-green-800 flex justify-center items-center"
    hide={$settingsStore.practiceTarget === "translation"}
    data={translations}
    wrapStyles="flex flex-wrap gap-2 p-2 max-h-28 overflow-y-auto bg-green-300 bg-opacity-50 rounded-md"
    chipStyles="chip overflow-hidden relative text-green-800 bg-green-300 hover:filter-none grow break-all whitespace-normal cursor-default"
  />

  {#if description}
    <div
      class="p-2 max-h-28 overflow-y-auto bg-sky-300 bg-opacity-50 rounded-md"
    >
      <div
        class="chip break-all whitespace-normal p-2 bg-sky-300 rounded-md !filter-none cursor-default"
      >
        {description}
      </div>
    </div>
  {/if}

  <div>
    <RadioGroup border="border-none" class="gap-2">
      <RadioItem
        bind:group={selectedTaskResult}
        name="curTaskResult"
        rounded="rounded-md"
        class="border-b-2 border-slate-400  text-slate-400 transition-all hover:text-white hover:bg-slate-400 hover:bg-opacity-40 focus:text-white focus:bg-slate-400 focus:bg-opacity-40"
        fill="!bg-slate-500 !text-white"
        value={true}
      >
        success
      </RadioItem>
      <RadioItem
        bind:group={selectedTaskResult}
        name="curTaskResult"
        rounded="rounded-md"
        class="border-b-2 border-slate-400  text-slate-400 transition-all hover:text-white hover:bg-slate-400 hover:bg-opacity-40 focus:text-white focus:bg-slate-400 focus:bg-opacity-40"
        fill="!bg-slate-500 !text-white"
        value={false}
      >
        fail
      </RadioItem>
    </RadioGroup>
  </div>

  <div>
    <button
      disabled={selectedTaskResult === null}
      class="btn mr-2 text-white bg-zinc-500 border-b-2 rounded-md hover:filter-none hover:bg-zinc-400 focus:bg-zinc-400"
      on:click={onNext}
      on:click={resetShowPracticeTarget}
    >
      next
    </button>
    <button
      class="btn text-white bg-zinc-500 border-b-2 rounded-md hover:filter-none hover:bg-zinc-400 focus:bg-zinc-400"
      on:click|once={onSettings}
    >
      stop
    </button>
  </div>
  <TaskProgress wrapStyleClasses="mt-0"/>
</div>
