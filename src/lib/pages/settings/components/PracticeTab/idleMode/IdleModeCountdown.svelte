<script lang="ts">
  import { scale } from "svelte/transition";
  import { idleModeCountdownViewStore } from "../../../stores/idleModeSettings/idleModeCountdownViewStore.js";
</script>

<div transition:scale class="pt-2 text-xl">
  <span class="cursor-default text-xs bg-white rounded-md p-2 text-teal-500"
    >Idle timer</span
  >
  <span
    class="inline-block w-24 text-white rounded-md p-2 bg-teal-400 bg-opacity-50 select-none align-middle"
    >{$idleModeCountdownViewStore}</span
  >
</div>
