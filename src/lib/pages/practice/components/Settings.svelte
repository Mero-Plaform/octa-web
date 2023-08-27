<script lang="ts">
  import { RadioGroup, RadioItem } from "@skeletonlabs/skeleton";
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { inputHardHandlerCreator } from "../../../utils/helpers.js";
  import { settingsStore } from "../stores/settingsStore.js";
  import infinityWhiteImageUrl from "/src/assets/icons/infinity-white.svg";

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
    event: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) => void;

  const dispatcher = createEventDispatcher();

  const onStartClick = () => {
    dispatcher("start");
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
          class="select-none border-b-2 bg-orange-400 bg-opacity-20 border-orange-400  text-orange-500 transition-all hover:text-white hover:bg-orange-400 focus:bg-orange-400 focus:text-white"
          fill="bg-orange-500 !text-white !bg-opacity-100"
        >
          original
        </RadioItem>
        <RadioItem
          bind:group={$settingsStore.practiceTarget}
          name="practiceTarget"
          rounded="rounded-md"
          value="translation"
          class="select-none border-b-2 bg-green-400 bg-opacity-20 border-green-400  text-green-500 transition-all hover:text-white hover:bg-green-400 focus:bg-green-400 focus:text-white"
          fill="bg-green-500 !text-white !bg-opacity-100"
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
          class="select-none border-b-2 py-2 bg-purple-400 bg-opacity-20 border-purple-400  text-purple-500 transition-all hover:text-white hover:bg-purple-400 focus:bg-purple-400 focus:text-white"
          fill="bg-purple-500 !text-white !bg-opacity-100"
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
          class="select-none border-b-2 py-2 bg-blue-500 bg-opacity-20 border-blue-400  text-blue-500 transition-all hover:text-white hover:bg-blue-400 focus:bg-blue-400 focus:text-white"
          fill="bg-blue-500 !text-white !bg-opacity-100"
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
          class="select-none border-b-2 bg-pink-500 bg-opacity-20 border-pink-400  text-pink-500 transition-all hover:text-white hover:bg-pink-400 focus:bg-pink-400 focus:text-white"
          fill="bg-pink-500 !text-white !bg-opacity-100"
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
      on:click|once={onStartClick}
      class="btn text-white bg-zinc-500 border-b-2 rounded-md hover:filter-none hover:bg-zinc-400 focus:bg-zinc-400"
    >
      start
    </button>
  </div>
</div>
