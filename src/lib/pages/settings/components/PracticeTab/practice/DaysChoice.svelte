<script lang="ts">
  import { getContext } from "svelte";
  import { scale } from "svelte/transition";
  import {
    WEEK_DAYS_SHORTS,
    type WEEK_DAYS_SHORTS_TYPE,
  } from "../../../../../utils/helpers.js";

  export let chosenPracticeDays: Array<WEEK_DAYS_SHORTS_TYPE>;
  export let onDayClick: (day: WEEK_DAYS_SHORTS_TYPE) => void;
  export let onAllDaysClick: () => void;

  const weekdaysStyles = getContext("weekdaysStyles");
  const weekendsStyles = getContext("weekendsStyles");
</script>

<div transition:scale class="mt-2 flex flex-wrap justify-center gap-2">
  <button
      on:click={onAllDaysClick}
      class="chip text-white select-none bg-slate-500 {weekdaysStyles}"
    >
      All
    </button>
  {#each WEEK_DAYS_SHORTS as day}
    <button
      on:click={() => onDayClick(day)}
      class="chip text-white select-none {day !== 'Sat' && day !== 'Sun'
        ? weekdaysStyles
        : weekendsStyles} {chosenPracticeDays.includes(day)
        ? 'brightness-100'
        : 'brightness-75'}"
    >
      {day}
    </button>
  {/each}
</div>
