<script lang="ts">
  import { ProgressBar } from "@skeletonlabs/skeleton";
  import { loadingDrawerProgressBarStylesStore } from "./loadingDrawerProgressBarStylesStore.js";
</script>

<div class="h-full w-full flex items-center">
  <ProgressBar
    meter={`bg-${$loadingDrawerProgressBarStylesStore.progressBarBgColor}-500`}
    value={undefined}
  />
</div>
