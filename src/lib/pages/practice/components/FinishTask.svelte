<script lang="ts">
  import { fade } from "svelte/transition";
  import StateText from "../../../shared/components/StateText.svelte";
  import type { ClickHandler } from "../../../shared/interfaces/basic.js";
  import {
    buttonBaseClasses,
    zincButtonColorClasses,
  } from "../../../shared/styleClassesDeclarations.js";
  import { practiceFinishStateTextStore } from "../stores/practiceFinishStateTextStore.js";
  import { practiceResultWordsToRenderStore } from "../stores/practiceWordsResult/practiceResultWordsToRenderStore.js";
  import TaskProgress from "./TaskProgress.svelte";
  import { onPracticedWords, onSettings } from "./practiceUtils.js";

  export let restartBtnText: string;
  export let onRestart: ClickHandler;
</script>

<div transition:fade class="flex flex-col items-center gap-[3vh] w-full">
  <StateText additionalStyles="translate-y-0"
    >{$practiceFinishStateTextStore}</StateText
  >
  <TaskProgress wrapStyleClasses="mb-10" />
  <div>
    <button
      class="{buttonBaseClasses} {zincButtonColorClasses}"
      on:click={onRestart}
    >
      {restartBtnText}
    </button>
    <button
      disabled={$practiceResultWordsToRenderStore.length === 0}
      class="{buttonBaseClasses} {zincButtonColorClasses}"
      on:click={onPracticedWords}
    >
      practiced words
    </button>
    <button
      class="{buttonBaseClasses} {zincButtonColorClasses}"
      on:click={onSettings}
    >
      practice settings
    </button>
  </div>
</div>
