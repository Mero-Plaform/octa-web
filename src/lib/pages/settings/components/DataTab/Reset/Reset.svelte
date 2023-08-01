<script lang="ts">
  import {
    onAppResetButtonClick,
    onDictionaryResetButtonClick,
    onStatisticResetButtonClick,
  } from "./resetUtils.js";
</script>

<div
  class="max-w-lg p-2 border-2 rounded-md bg-red-200 bg-opacity-50 text-red-900"
>
  <div class="border-red-400 border-2 rounded-md p-2 cursor-default select-none">Reset</div>
  <div class="flex gap-2 pt-2 flex-wrap justify-center">
    <button
      on:click={onDictionaryResetButtonClick}
      class="btn bg-red-300 rounded-md grow outline-none focus:brightness-110"
    >
      Dictionary reset
    </button>
    <button
      on:click={onStatisticResetButtonClick}
      class="btn bg-red-300 rounded-md grow outline-none focus:brightness-110"
    >
      Statistic reset
    </button>
    <button
      on:click={onAppResetButtonClick}
      class="btn bg-red-300 rounded-md grow outline-none focus:brightness-110"
    >
      App reset
    </button>
  </div>
</div>
