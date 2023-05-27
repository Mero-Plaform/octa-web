<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { loadingScreenStore } from "./loadingScreenStore";
</script>

{#if $loadingScreenStore}
  <div
    class="h-screen w-screen flex justify-center items-center fixed top-0 left-0 bg-slate-600 z-[-1]"
    transition:fade={{duration: 200}}
  >
    loading layer Try Drawer instead of this comp
  </div>
{/if}
