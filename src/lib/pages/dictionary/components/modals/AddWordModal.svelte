<script lang="ts">
  import { modalStore } from "@skeletonlabs/skeleton";
  import CustomInputChip from "../../../../utils/components/customInputChip/CustomInputChip.svelte";
  import { wordStore } from "../../stores/wordStore.js";

  const chipsAddButtonBaseStyles =
    "bg-cyan-300 hover:bg-cyan-400 focus:bg-cyan-400 border-2 border-cyan-400 brightness-100 active:scale-90 p-2 leading-3 text-center absolute -top-2 -right-2 rounded-md  transition-all";
  const chipsAddButtonErrorStyles = "!bg-red-300 border-red-400";
  const chipsAddButtonImageBaseStyles = "bg-white";
  const chipsAddButtonErrorImageStyle = "";

  let newWordVariantsList: string[] = [];
  let newWordTranslationsList: string[] = [];
  let newWordDescription = "";

  let variantsChipsComponent: CustomInputChip;
  let translationsChipsComponent: CustomInputChip;
  let descriptionElem: HTMLTextAreaElement;

  const resetData = () => {
    newWordDescription = "";
    variantsChipsComponent.reset();
    translationsChipsComponent.reset();
    descriptionElem.value = "";
  };

  const onAddWord = () => {
    wordStore.addWord({
      variants: newWordVariantsList,
      translations: newWordTranslationsList,
      description: newWordDescription.trim(),
    });
    resetData();
  };
</script>

<div
  class="max-w-90% gap-5 flex flex-col text-center selection:text-white selection:bg-cyan-500 overflow-hidden cursor-default px-5"
>
  <div class="select-none bg-cyan-400 text-white rounded-md p-2">
    Add word
  </div>
  <CustomInputChip
    bind:this={variantsChipsComponent}
    bind:list={newWordVariantsList}
    InputChipStyles="text-cyan-900 [&_.input-chip-list]:justify-center [&_.input-chip-list]:rounded-md [&_.input-chip-list]:p-2 [&_.input-chip-list]:bg-cyan-400 [&_.input-chip-list]:bg-opacity-50 [&_.input-chip-list]:max-h-24 [&_.input-chip-list]:overflow-auto !border-cyan-300 border-2 !cursor-default hover:filter-none [&_input]: [&_input]:p-2 [&_input]:rounded-md [&_input]:bg-cyan-200 hover:[&_input]:bg-cyan-300 focus:[&_input]:bg-cyan-300 [&_input]:transition-all [&_input]:border-b-2 [&_input]:border-cyan-300 placeholder:[&_input]:!text-cyan-950"
    chips="text-slate-950 bg-orange-300 hover:filter-none hover:bg-orange-400 focus:bg-orange-400  break-all whitespace-normal"
    buttonBaseStyles={chipsAddButtonBaseStyles}
    buttonErrorStyles={chipsAddButtonErrorStyles}
    buttonImageBaseStyles={chipsAddButtonImageBaseStyles}
    buttonImageErrorStyles={chipsAddButtonErrorImageStyle}
    placeholder="Enter word variant..."
    rounded="rounded-md"
  />

  <CustomInputChip
    bind:this={translationsChipsComponent}
    bind:list={newWordTranslationsList}
    InputChipStyles="text-cyan-900 [&_.input-chip-list]:justify-center [&_.input-chip-list]:rounded-md [&_.input-chip-list]:p-2 [&_.input-chip-list]:bg-cyan-400 [&_.input-chip-list]:bg-opacity-50 [&_.input-chip-list]:max-h-24 [&_.input-chip-list]:overflow-auto !border-cyan-300 border-2 !cursor-default hover:filter-none [&_input]: [&_input]:p-2 [&_input]:rounded-md [&_input]:bg-cyan-200 hover:[&_input]:bg-cyan-300 focus:[&_input]:bg-cyan-300  [&_input]:transition-all [&_input]:border-b-2 [&_input]:border-cyan-300 placeholder:[&_input]:text-cyan-950"
    chips="text-slate-950 bg-green-300 hover:filter-none hover:bg-green-400 focus:bg-green-400  break-all whitespace-normal"
    buttonBaseStyles={chipsAddButtonBaseStyles}
    buttonErrorStyles={chipsAddButtonErrorStyles}
    buttonImageBaseStyles={chipsAddButtonImageBaseStyles}
    buttonImageErrorStyles={chipsAddButtonErrorImageStyle}
    placeholder="Enter word translation..."
    rounded="rounded-md"
  />

  <div class="p-2 border-2 border-cyan-300 rounded-md">
    <textarea
      bind:this={descriptionElem}
      bind:value={newWordDescription}
      class="w-full text-cyan-900 resize-none p-2 rounded-md bg-cyan-400 bg-opacity-50 hover:bg-cyan-300 focus:bg-cyan-300 transition-all placeholder:text-cyan-950"
      rows="3"
      placeholder="Enter word description..."
    />
  </div>

  <div>
    <button
      on:click={onAddWord}
      disabled={newWordVariantsList.length === 0 ||
        newWordTranslationsList.length === 0}
      class="btn disabled:bg-cyan-300 bg-cyan-400 hover:bg-cyan-600 focus:bg-cyan-600 rounded-md text-white"
    >
      add
    </button>
    <button
      on:click={() => modalStore.close()}
      class="btn bg-cyan-400 hover:bg-cyan-600 focus:bg-cyan-600 rounded-md text-white"
    >
      close
    </button>
  </div>
</div>
