<script lang="ts">
  import { modalStore } from "@skeletonlabs/skeleton";
  import { removeWordStore } from "../../stores/removeWordStore.js";
  import { wordStore } from "../../stores/wordStore.js";

  const { variants, translations, description } = $removeWordStore!;
  let isRemoving = false;

  const onDelete = () => {
    isRemoving = true;
    wordStore.removeWord($removeWordStore!.id);
    modalStore.close();
  };
</script>

<div class="gap-5 max-w-90% flex flex-col text-center">
  <div class="select-none bg-red-400 rounded-md p-2 text-white cursor-default">
    Delete word
  </div>
  <div class="p-2 rounded-md border-red-300 border-2">
    <div
      class="flex flex-wrap justify-center gap-2 p-2 bg-red-300 bg-opacity-50 rounded-md max-h-24 overflow-auto"
    >
      {#each variants as variant}
        <span
          class="chip bg-orange-300 cursor-default hover:filter-none hover:bg-orange-400 focus:bg-orange-400 outline-none break-all whitespace-normal"
          >{variant}</span
        >
      {/each}
    </div>
  </div>
  <div class="p-2 rounded-md border-red-300 border-2">
    <div
      class="flex flex-wrap justify-center gap-2 p-2 bg-red-300 bg-opacity-50 rounded-md max-h-24 overflow-auto"
    >
      {#each translations as variant}
        <span
          class="chip bg-green-300 cursor-default hover:filter-none hover:bg-green-400 focus:bg-green-400 outline-none break-all whitespace-normal"
          >{variant}</span
        >
      {/each}
    </div>
  </div>
  {#if description}
    <div class="p-2 rounded-md border-red-300 border-2">
      <div
        class="w-full p-2 rounded-md bg-red-300 bg-opacity-50 break-all max-h-24 overflow-auto"
      >
        <div
          class="bg-sky-300 rounded-md text-xs p-2 cursor-default text-center"
        >
          {description}
        </div>
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
