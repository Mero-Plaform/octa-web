<script lang="ts">
  import { modalStore } from "@skeletonlabs/skeleton";
  import { removeWordIdStore } from "../../stores/removeWordIdStore.js";
  import { wordStore } from "../../stores/wordStore.js";

  const { variants, translations, description } =
    $wordStore.get($removeWordIdStore)!;
  let isRemoving = false;

  const onDelete = () => {
    isRemoving = true;
    wordStore.removeWord($removeWordIdStore);
    modalStore.close();
  };
</script>

<div class="gap-5 max-w-90% flex flex-col text-center">
  <div class="bg-red-400 rounded-md p-2 text-white cursor-default">
    Delete word?
  </div>
  <div class="bg-red-300 bg-opacity-50 rounded-md">
    {#each variants as variant}
      <span
        class="chip bg-orange-300 m-2 cursor-default hover:filter-none hover:bg-orange-400 focus:bg-orange-400 outline-none break-all whitespace-normal"
        >{variant}</span
      >
    {/each}
  </div>
  <div class="bg-red-300 bg-opacity-50 rounded-md">
    {#each translations as variant}
      <span
        class="chip bg-green-300 m-2 cursor-default hover:filter-none hover:bg-green-400 focus:bg-green-400 outline-none break-all whitespace-normal"
        >{variant}</span
      >
    {/each}
  </div>
  {#if description}
    <div class="w-full p-2 rounded-md bg-red-300 bg-opacity-50 break-all">
      <div
        class="max-h-24 overflow-auto bg-sky-300 rounded-md text-xs p-2 cursor-default text-center"
      >
        {description}
      </div>
    </div>
  {/if}
  <div>
    <button
      class="btn bg-red-400 hover:bg-red-500 focus:bg-red-500 rounded-md text-white outline-none"
      on:click={onDelete}
    >
      delete
    </button>
    <button
      class="btn bg-red-400 hover:bg-red-500 focus:bg-red-500 rounded-md text-white outline-none"
      on:click={() => modalStore.close()}
    >
      cancel
    </button>
  </div>
</div>
