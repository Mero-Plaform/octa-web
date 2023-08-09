<script lang="ts">
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { basicSettingsStore } from "../../stores/basicSettingsStore.js";
</script>

<div class="flex gap-2 flex-wrap justify-center">
  <div class="text-xs   bg-white text-yellow-500 p-2 rounded-md cursor-default">Open app window at start</div>
  <span
    class:opacity-50={$basicSettingsStore.openAppWindowAtStart}
    class="cursor-default text-xs bg-white rounded-md p-2 text-yellow-500"
  >
    off
  </span>
  <SlideToggle
    name="passivePractice"
    class="bg-gray-400  hover:!brightness-110 focus:brightness-110"
    active="bg-yellow-500"
    bind:checked={$basicSettingsStore.openAppWindowAtStart}
  />
  <span
    class:opacity-50={!$basicSettingsStore.openAppWindowAtStart}
    class="cursor-default text-xs bg-white rounded-md p-2 text-yellow-500"
  >
    On
  </span>
</div>
