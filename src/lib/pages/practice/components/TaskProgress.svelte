<script lang="ts">
  import {
    practiceProgressStore,
    type PracticeProgressData,
  } from "../stores/practiceProgressStore.js";
    import { settingsStore } from '../stores/settingsStore.js';

  export let wrapStyleClasses = "";
  let successCount: number;
  let totalCount: number;
  let successCountStyles: string;

  const updateSuccessCountStyles = ({
    totalCount: totalCountStoreValue,
    successCount: successCountStoreValue,
  }: PracticeProgressData) => {
    totalCount = totalCountStoreValue;
    successCount = successCountStoreValue;

    if (totalCountStoreValue === 0) {
      successCountStyles = "text-slate-500";
      return;
    }

    const progressRatio = successCount / totalCount;

    if (progressRatio < 0.4) {
      successCountStyles = "text-red-300";
    } else if (progressRatio < 0.75) {
      successCountStyles = "text-orange-300";
    } else {
      successCountStyles = "text-green-300";
    }
  };

  practiceProgressStore.subscribe(updateSuccessCountStyles);
</script>

<div class={`w-90% text-center cursor-default mt-5 ${wrapStyleClasses}`}>
  <span class="text-sm text-slate-400">succeed:</span>
  <span class={`text-3xl ${successCountStyles}`}>
    {successCount}
  </span>
  {#if $settingsStore.practiceType === "section"}
    <span class="text-sm text-slate-400 ml-7">current:</span>
    <span class="text-3xl text-slate-500">{$practiceProgressStore.wordIds.length}</span>
  {/if}
  <span class="text-sm text-slate-400 ml-7">total:</span>
  <span class="text-3xl text-slate-500">{totalCount}</span>
</div>
