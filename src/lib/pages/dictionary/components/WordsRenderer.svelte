<script lang="ts">
  import { onDestroy } from "svelte";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import StateText from "../../../shared/components/StateText.svelte";
  import type { Word } from "../interfaces/Word.js";
  import { searchWordsTextStore } from "../stores/searchWordsTextStore.js";
  import { wordsToRenderStore } from "../stores/wordsToRenderStore.js";
  import WordCard from "./WordCard.svelte";

  export let page = {
    offset: 0,
    limit: 10,
    amounts: [],
    size: $wordsToRenderStore.length,
  };

  let paginatedSource: Word[];

  const unsubscribeFromWordsToRenderStore = wordsToRenderStore.subscribe((words) => {
    page.offset = 0;
    paginatedSource = words.slice(
      page.offset * page.limit,
      page.offset * page.limit + page.limit
    );
    page.size = words.length;
  });

  onDestroy(() => {
    unsubscribeFromWordsToRenderStore();
  });
</script>

{#each paginatedSource as word (word.id)}
  <div animate:flip={{ duration: 300 }}>
    <WordCard {word} />
  </div>
{:else}
  <div
    transition:fade
    class="absolute h-90% flex flex-col items-center justify-center grow"
  >
    <StateText>
      {#if $searchWordsTextStore}
        NO RESULTS
      {:else}
        EMPTY
      {/if}
    </StateText>
  </div>
{/each}
