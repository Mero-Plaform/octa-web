<script lang="ts">
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import StateText from "../../../shared/components/StateText.svelte";
  import { searchWordsTextStore } from "../stores/searchWordsTextStore.js";
  import { wordsToRenderStore } from "../stores/wordsToRenderStore.js";
  import WordCard from "./WordCard.svelte";
</script>

{#each $wordsToRenderStore as word (word.id)}
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
