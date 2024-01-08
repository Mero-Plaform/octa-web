<script lang="ts">
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
  import { fade } from "svelte/transition";
  import {
    buttonBaseClasses,
    zincButtonColorClasses,
  } from "../../../shared/styleClassesDeclarations.js";
  import { inputHardHandlerCreator } from "../../../utils/helpers.js";
  import { practiceTaskEnded } from "../stores/practiceTaskEnded.js";
  import { practiceViewStore } from "../stores/practiceViewStore.js";
  import { settingsStore } from "../stores/settingsStore.js";
  import infinityWhiteImageUrl from "/src/assets/icons/infinity-white.svg";

  const btnFillClasses = "!text-white !bg-opacity-100";
  const radioItemClasses =
    "select-none border-b-2 transition-all hover:text-white focus:text-white";

  const sectionSizeInputHandler = inputHardHandlerCreator({
    prevValue: String($settingsStore.sectionSize),
    checker: (value: string) => /^[1-9]\d*$/.test(value),
    resolveCallback: (data) => {
      settingsStore.update((settings) => ({
        ...settings,
        sectionSize: Number(data.curValue),
      }));
    },
  }) as unknown as (
    event: Event & { currentTarget: EventTarget & HTMLInputElement },
  ) => void;

  const onStartClick = () => {
    practiceTaskEnded.set(false);
    practiceViewStore.set("task");
  };

  const onSectionSizeChange = () => {
    $settingsStore.practiceType = "section";
  };
</script>

<div class="flex flex-col justify-evenly h-full absolute" transition:fade>
  <div class="text-center">
    <div>
      <RadioGroup border="border-none" class="gap-2">
        <RadioItem
          bind:group={$settingsStore.practiceTarget}
          name="practiceTarget"
          rounded="rounded-md"
          value="original"
          class="{radioItemClasses} bg-orange-400 bg-opacity-20 border-orange-400  text-orange-500 hover:bg-orange-400 focus:bg-orange-400"
          fill="bg-orange-500 {btnFillClasses}"
        >
          original
        </RadioItem>
        <RadioItem
          bind:group={$settingsStore.practiceTarget}
          name="practiceTarget"
          rounded="rounded-md"
          value="translation"
          class="{radioItemClasses} bg-green-400 bg-opacity-20 border-green-400  text-green-500 hover:bg-green-400 focus:bg-green-400"
          fill="bg-green-500 {btnFillClasses}"
        >
          translation
        </RadioItem>
      </RadioGroup>
    </div>

    <div>
      <RadioGroup border="border-none" class="gap-2">
        <RadioItem
          bind:group={$settingsStore.practiceType}
          name="practiceType"
          rounded="rounded-md"
          value="random"
          class="{radioItemClasses} py-2 bg-purple-400 bg-opacity-20 border-purple-400  text-purple-500 hover:bg-purple-400 focus:bg-purple-400"
          fill="bg-purple-500 {btnFillClasses}"
        >
          random
          <img
            class="h-5 inline"
            src={infinityWhiteImageUrl}
            alt="infinity icon"
          />
        </RadioItem>
        <RadioItem
          bind:group={$settingsStore.practiceType}
          name="practiceType"
          rounded="rounded-md"
          value="worst"
          class="{radioItemClasses} py-2 bg-blue-500 bg-opacity-20 border-blue-400  text-blue-500 hover:bg-blue-400 focus:bg-blue-400"
          fill="bg-blue-500 {btnFillClasses}"
        >
          worst
          <img
            class="h-5 inline"
            src={infinityWhiteImageUrl}
            alt="infinity icon"
          />
        </RadioItem>
        <RadioItem
          bind:group={$settingsStore.practiceType}
          name="practiceType"
          rounded="rounded-md"
          value="section"
          class="{radioItemClasses} bg-pink-500 bg-opacity-20 border-pink-400  text-pink-500 hover:bg-pink-400 focus:bg-pink-400"
          fill="bg-pink-500 {btnFillClasses}"
        >
          section
          <input
            maxlength="3"
            on:input={sectionSizeInputHandler}
            on:input={onSectionSizeChange}
            on:dragstart|preventDefault
            value={$settingsStore.sectionSize}
            class="bg-opacity-70 bg-white p-1 w-12 ml-1 text-center rounded-md text-pink-600 selection:bg-pink-500 selection:text-white"
          />
        </RadioItem>
      </RadioGroup>
    </div>
  </div>
  <div class="text-center">
    <button
      on:click={onStartClick}
      class="{buttonBaseClasses} {zincButtonColorClasses}"
    >
      start
    </button>
  </div>
</div>
