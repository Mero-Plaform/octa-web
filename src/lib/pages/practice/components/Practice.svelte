<script lang="ts">
  import { onDestroy, type ComponentType } from "svelte";
  import { fade } from "svelte/transition";
  import StateText from "../../../shared/components/StateText.svelte";
  import { wordStore } from "../../dictionary/stores/wordStore.js";
  import type { PracticeType } from "../interfaces/settings.js";
  import { practiceViewStore } from "../stores/practiceViewStore.js";
  import { settingsStore } from "../stores/settingsStore.js";
  import Settings from "./Settings.svelte";
  import TaskBase from "./TaskBase.svelte";
  import TaskSection from "./TaskSection.svelte";
  import { onSettings } from "./practiceUtils.js";
  import PracticeWordsResult from "./practiceWordsResult/PracticeWordsResult.svelte";

  const practiceTypeComponents: Record<PracticeType, ComponentType> = {
    worst: TaskBase,
    random: TaskBase,
    section: TaskSection,
  };

  $: practiceHandlerComponent =
    practiceTypeComponents[$settingsStore.practiceType];

  // return to settings page on switch app pages
  onDestroy(onSettings);
</script>

<div
  transition:fade
  class="absolute flex justify-center items-center h-full w-full"
>
  {#if $wordStore.size === 0}
    <div transition:fade class="absolute">
      <StateText>
        Dictionary is empty
        <br /><br />
        Add some words for practice
      </StateText>
    </div>
  {:else if $practiceViewStore === "settings"}
    <Settings />
  {:else if $practiceViewStore === "practiced words"}
    <PracticeWordsResult />
  {:else if $practiceViewStore === "task"}
    <svelte:component this={practiceHandlerComponent} />
  {/if}
</div>
