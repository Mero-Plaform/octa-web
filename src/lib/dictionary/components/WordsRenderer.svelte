<script lang="ts">
  import { crossfade } from "svelte/transition";
  import { flip } from 'svelte/animate';
  import { onDestroy } from "svelte";
  import { quintOut } from 'svelte/easing';
  import { searchWordsTextStore } from '../stores/searchWordsTextStore.js';
  import { wordsToRenderStore } from '../stores/wordsToRenderStore.js';
  import type { Word } from '../interfaces/Word.js';
  import WordCard from './WordCard.svelte';
  
  export let page = {
    offset: 0,
    limit: 10,
    amounts: [],
    size: $wordsToRenderStore.length,
  };

  const updatePaginatorPageSize = () => {
    page.size = $wordsToRenderStore.length;
  };

  const unsubscribeUpdatePaginatorPageSize = wordsToRenderStore.subscribe(updatePaginatorPageSize);

  let paginatedSource: Word[];

  $: paginatedSource = $wordsToRenderStore.slice(
    page.offset * page.limit,
    page.offset * page.limit + page.limit
  );

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;

      return {
        duration: 200,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      };
    },
  });

  onDestroy(() => {
    unsubscribeUpdatePaginatorPageSize();
  });
</script>

{#each paginatedSource as word (word.id)}
  <div
    animate:flip={{ duration: 300 }}
    in:receive={{ key: word.id }}
    out:send={{ key: word.id }}
  >
    <WordCard {word} />
  </div>
{:else}
  <div class="h-full flex flex-col items-center justify-center grow">
    <div
      class="text-center text-slate-300 text-4xl cursor-default tracking-[2rem] translate-x-3 -translate-y-7 leading-loose max-w-90wv"
    >
      {#if $searchWordsTextStore}
        NO RESULTS
      {:else}
        EMPTY
      {/if}
    </div>
  </div>
{/each}
