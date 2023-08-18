<script lang="ts">
  import {
    practiceProgressStore,
    type PracticeProgressData,
  } from "../stores/practiceProgressStore.js";

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
  <span class="text-sm text-slate-400 ml-7">total:</span>
  <span class="text-3xl text-slate-500">{totalCount}</span>
  <!-- <div class="mt-5 flex flex-wrap justify-center h-10 gap-1 w-full">
    {#each $practiceProgressStore.stats as stat}
      <span
        class={`basis-3 h-3 ${stat ? "bg-slate-400" : "bg-red-400"} rounded-sm`}
      />
    {/each}
  </div> -->
</div>
