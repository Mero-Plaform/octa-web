<script lang="ts">
  import { fade } from "svelte/transition";
  import type { ClickHandler } from "../../shared/interfaces/basic.js";
  import TaskProgress from "./TaskProgress.svelte";

  export let title: string;
  export let restartBtnText: string;
  export let settingsBtnText: string;
  export let onRestart: ClickHandler;
  export let onSettings: ClickHandler;
</script>

<div transition:fade class="flex flex-col gap-[3vh] w-full">
  <div
    class="text-center text-slate-300 text-4xl cursor-default tracking-[2rem] translate-x-3 m-sm:tracking-[1rem] leading-loose"
  >
    {title}
  </div>
  <TaskProgress styleClasses="m-0 mb-10"/>
  <div>
    <button
      class="btn text-white bg-zinc-500 border-b-2 rounded-md hover:filter-none hover:bg-zinc-400 focus:bg-zinc-400 outline-none"
      on:click={onRestart}
    >
      {restartBtnText}
    </button>
    <button
      class="btn text-white bg-zinc-500 border-b-2 rounded-md hover:filter-none hover:bg-zinc-400 focus:bg-zinc-400 outline-none"
      on:click={onSettings}
    >
      {settingsBtnText}
    </button>
  </div>
</div>
