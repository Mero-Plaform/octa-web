<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { idleModeStore } from "../../../stores/idleModeSettings/idleModeStore.js";
  import IdleModeCarousel from "./IdleModeCarousel.svelte";
  import IdleModeCountdown from "./IdleModeCountdown.svelte";
  import IdleModeSwitcher from "./IdleModeSwitcher.svelte";
</script>

<div
  transition:fade
  class="absolute max-w-md w-90% left-1/2 -translate-x-1/2 max-h-[calc(100vh-190px)] overflow-y-auto overflow-x-hidden p-2 border-2 rounded-md bg-teal-200 bg-opacity-50 text-teal-900"
>
  <div
    class="border-teal-400 border-2 rounded-md p-2 cursor-default select-none"
  >
    Idle
  </div>
  <IdleModeSwitcher />

  {#if $idleModeStore.isEnabled}
    <div transition:slide>
      <IdleModeCountdown />
      <IdleModeCarousel />
    </div>
  {/if}
</div>
