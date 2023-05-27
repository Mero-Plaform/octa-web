<script lang="ts">
  import AddWord from "./AddWord.svelte";
  import SearchWords from "./SearchWords.svelte";
  import WordsRenderer from "./WordsRenderer.svelte";
  import { Paginator } from "@skeletonlabs/skeleton";

  let page: {
    offset: number;
    limit: number;
    amounts: never[];
    size: number;
  };
</script>

<div class="flex flex-col h-screen">
  <div
    class="flex justify-center gap-3 w-full p-2 mt-4"
  >
    <AddWord />
    <SearchWords />
  </div>
  <div
    on:dragstart|preventDefault
    class="flex flex-wrap items-start justify-center gap-10 p-2 box-border w-full mt-7 overflow-auto grow"
  >
    <WordsRenderer bind:page/>
  </div>
  <div class="w-full p-2">
    <Paginator
      class="!flex-row space-y-0 [&_.paginator-label]:!hidden"
      text="cursor-default !mt-0"
      select="hidden"
      buttonClasses="btn bg-cyan-400 hover:bg-cyan-600 focus:bg-cyan-600 disabled:bg-cyan-300 rounded-md text-white text-lg p-2 px-4 outline-none"
      justify="justify-evenly"
      bind:settings={page}
    />
  </div>
</div>
