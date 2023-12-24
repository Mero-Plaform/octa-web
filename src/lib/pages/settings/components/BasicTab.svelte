<script lang="ts">
  import { fade } from "svelte/transition";
  import StartWithSystemEnabler from "./BasicTab/StartWithSystemEnabler.svelte";
  import StartAppAsMinimized from "./BasicTab/StartAppAsMinimized.svelte";
</script>

<div
  class="h-[calc(100%-85px)] w-full flex flex-col justify-evenly items-center text-center gap-5 absolute"
  transition:fade
>
  <!-- <StartWithSystemEnabler /> -->
  <StartAppAsMinimized />
</div>
