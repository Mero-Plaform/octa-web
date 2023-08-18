<script lang="ts">
  import { fade } from "svelte/transition";
  import StateText from "../../../shared/components/StateText.svelte";
  import type { ClickHandler } from "../../../shared/interfaces/basic.js";
  import TaskProgress from "./TaskProgress.svelte";

  export let title: string;
  export let restartBtnText: string;
  export let settingsBtnText: string;
  export let onRestart: ClickHandler;
  export let onSettings: ClickHandler;
</script>

<div transition:fade class="flex flex-col items-center gap-[3vh] w-full">
  <StateText additionalStyles="translate-y-0">{title}</StateText>
  <TaskProgress wrapStyleClasses="mb-10" />
  <div>
    <button
      class="btn text-white bg-zinc-500 border-b-2 rounded-md hover:filter-none hover:bg-zinc-400 focus:bg-zinc-400"
      on:click={onRestart}
    >
      {restartBtnText}
    </button>
    <button
      class="btn text-white bg-zinc-500 border-b-2 rounded-md hover:filter-none hover:bg-zinc-400 focus:bg-zinc-400"
      on:click={onSettings}
    >
      {settingsBtnText}
    </button>
  </div>
</div>
