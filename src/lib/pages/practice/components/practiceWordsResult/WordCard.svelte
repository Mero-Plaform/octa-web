<script lang="ts">
  import type { Word } from "../../../dictionary/interfaces/Word.js";
  import octaSlateIconUrl from "/src/assets/icons/octopus-slate.svg";

  export let word: Word;
  export let state: boolean;
</script>

<div
  class="flex gap-2 {state ? 'bg-emerald-300' : 'bg-red-300'} 
    bg-opacity-30 hover:bg-opacity-50 p-2 rounded-md bg-[length:max(20%,30px)] bg-center bg-repeat-space transition-all"
  style={`background-image: url('${octaSlateIconUrl}')`}
>
  <div
    class="inline-flex flex-col justify-center grow gap-2 max-w-xs box-border rounded-md"
  >
    <div
      class="flex flex-wrap gap-2 p-2 max-h-28 overflow-auto bg-orange-300 bg-opacity-50 rounded-md"
    >
      {#each word.variants as variant}
        <span
          class="chip bg-orange-300 hover:filter-none grow break-all whitespace-pre-wrap cursor-default"
          >{variant}</span
        >
      {/each}
    </div>
    <div
      class="flex flex-wrap gap-2 p-2 max-h-28 overflow-auto bg-green-300 bg-opacity-50 rounded-md"
    >
      {#each word.translations as translation}
        <span
          class="chip bg-green-300 hover:filter-none grow break-all whitespace-pre-wrap cursor-default"
          >{translation}</span
        >
      {/each}
    </div>
    {#if word.description}
      <div
        class="max-h-24 overflow-auto w-full p-2 rounded-md bg-sky-300 bg-opacity-50 break-all whitespace-pre-wrap"
      >
        <div
          class="bg-sky-300 rounded-md text-xs p-2 cursor-default text-center"
        >
          {word.description}
        </div>
      </div>
    {/if}
  </div>
</div>
