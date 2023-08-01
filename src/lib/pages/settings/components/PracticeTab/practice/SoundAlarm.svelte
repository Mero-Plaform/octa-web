<script lang="ts">
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { getContext } from "svelte";
  import { scale } from "svelte/transition";
  import type { PracticeStores } from "../../../interfaces/practiceStores.js";

  const { settingsStore } = getContext<PracticeStores>("stores");
  const mainColor = getContext<string>("mainColor");
</script>

<div transition:scale class="flex gap-2 pt-2 flex-wrap justify-center">
  <span
    class:opacity-50={!$settingsStore.soundNotification}
    class="cursor-default text-xs bg-white rounded-md p-2 text-{mainColor}-500"
  >
    Sound alarm
  </span>
  <SlideToggle
    name="passivePractice"
    class="bg-gray-400  hover:!brightness-110 focus:brightness-110"
    active="bg-{mainColor}-500"
    bind:checked={$settingsStore.soundNotification}
  />
</div>
