<script lang="ts">
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { getContext } from "svelte";
  import type { PracticeStores } from "../../../interfaces/practiceStores.js";

  const mainColor = getContext<string>("mainColor");
  const { settingsStore } = getContext<PracticeStores>("stores");
</script>

<div class="flex gap-2 pt-2 flex-wrap justify-center items-center">
  <span
    class:opacity-50={$settingsStore.enabled}
    class="cursor-default text-xs bg-white rounded-md p-2 text-{mainColor}-500"
  >
    off
  </span>
  <SlideToggle
    name="passivePractice"
    class="bg-gray-400 outline-none hover:!brightness-110 focus:brightness-110"
    active="bg-{mainColor}-500"
    bind:checked={$settingsStore.enabled}
  />
  <span
    class:opacity-50={!$settingsStore.enabled}
    class="cursor-default text-xs bg-white rounded-md p-2 text-{mainColor}-500"
  >
    On
  </span>
</div>
