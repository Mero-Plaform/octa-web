<script lang="ts">
  import { SlideToggle } from "@skeletonlabs/skeleton";

  export let showPracticeTarget: boolean;
</script>

<div>
  <span
    class:bg-opacity-50={showPracticeTarget}
    class="chip bg-slate-500 text-white cursor-default !filter-none"
  >
    hide
  </span>
  <SlideToggle
    name="slide"
    class="bg-slate-500 hover:brightness-95 focus:brightness-95 align-middle mx-2 "
    active="bg-pink-500"
    bind:checked={showPracticeTarget}
    size="sm"
  />
  <span
    class:bg-opacity-50={!showPracticeTarget}
    class="chip bg-pink-500 text-white cursor-default !filter-none"
  >
    show
  </span>
</div>
