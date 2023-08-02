<script lang="ts">
  import { fade } from "svelte/transition";
  import Reset from "../Reset/Reset.svelte";
  import Transfer from "../Transfer.svelte";
</script>

<div
  class="h-[calc(100%-85px)] w-full flex flex-col justify-evenly items-center text-center gap-5 absolute"
  transition:fade
>
  <Transfer />
  <Reset />
</div>
