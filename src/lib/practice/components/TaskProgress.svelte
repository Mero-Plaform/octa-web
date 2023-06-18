<script lang="ts">
  import {
    practiceDadaStore,
    type PracticeDadaStore,
  } from "../stores/practiceDadaStore.js";

  export let styleClasses = "";
  let successCount: number;
  let totalCount: number;
  let successCountStyles: string;

  const updateSuccessCountStyles = ({
    totalCount: totalCountStoreValue,
    successCount: successCountStoreValue,
  }: PracticeDadaStore) => {
    totalCount = totalCountStoreValue;
    successCount = successCountStoreValue;

    const progressRatio =
      successCount / (totalCount === 1 ? totalCount : totalCount - 1);

    if (progressRatio < 0.4) {
      successCountStyles = "text-red-300";
    } else if (progressRatio < 0.75) {
      successCountStyles = "text-orange-300";
    } else {
      successCountStyles = "text-green-300";
    }
  };

  practiceDadaStore.subscribe(updateSuccessCountStyles);
</script>

<div
  class={`text-center text-4xl cursor-default tracking-[2rem] translate-x-3 mt-10 ${styleClasses}`}
>
  <span class={successCountStyles}>
    {successCount}
  </span>
  / {totalCount}
</div>
