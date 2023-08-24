<script lang="ts">
  import type { ComponentType } from "svelte";
  import { fade } from "svelte/transition";
  import StateText from "../../../shared/components/StateText.svelte";
  import { wordStore } from "../../dictionary/stores/wordStore.js";
  import type { PracticeType } from "../interfaces/settings.js";
  import { settingsStore } from "../stores/settingsStore.js";
  import Settings from "./Settings.svelte";
  import TaskBase from "./TaskBase.svelte";
  import TaskSection from "./TaskSection.svelte";

  let practiceView: "task" | "settings" = "settings";

  const onStart = () => {
    practiceView = "task";
  };

  const onSettings = () => {
    practiceView = "settings";
  };

  const practiceTypeComponents: Record<PracticeType, ComponentType> = {
    worst: TaskBase,
    random: TaskBase,
    section: TaskSection,
  };

  $: practiceHandlerComponent =
    practiceTypeComponents[$settingsStore.practiceType];
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
  {:else if practiceView === "settings"}
    <Settings on:start={onStart} />
  {:else}
    <svelte:component
      this={practiceHandlerComponent}
      on:settings={onSettings}
    />
  {/if}
</div>
