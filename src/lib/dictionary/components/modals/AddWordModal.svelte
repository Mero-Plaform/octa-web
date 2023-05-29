<script lang="ts">
  import { modalStore } from "@skeletonlabs/skeleton";
  import { wordsStore } from '../../stores/wordsStore.js';
  import CustomInputChip from '../../../utils/components/customInputChip/CustomInputChip.svelte';

  const chipsAddButtonBaseStyles =
    "bg-cyan-300 hover:bg-cyan-400 focus:bg-cyan-400 border-2 border-cyan-400 brightness-100 active:scale-90 p-2 leading-3 text-center absolute -top-2 -right-2 rounded-md outline-none transition-all";
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
    wordsStore.addWord({
      variants: newWordVariantsList,
      translations: newWordTranslationsList,
      description: newWordDescription.trim(),
    });
    resetData();
  };
</script>

<div
  class="max-w-90% gap-5 flex flex-col text-center selection:text-white selection:bg-cyan-500"
>
  <div class="bg-cyan-400 text-white rounded-md p-2 cursor-default">
    Add word
  </div>
  <CustomInputChip
    bind:this={variantsChipsComponent}
    bind:list={newWordVariantsList}
    InputChipStyles="text-cyan-900 [&_.input-chip-list]:max-h-24 [&_.input-chip-list]:overflow-auto !border-cyan-300 border-2 !cursor-default hover:filter-none [&_input]:outline-none [&_input]:p-2 [&_input]:rounded-md [&_input]:bg-cyan-200 hover:[&_input]:bg-cyan-300 focus:[&_input]:bg-cyan-300 [&_input]:transition-all [&_input]:border-b-2 [&_input]:border-cyan-300 [&_input]:placeholder:text-cyan-950"
    chips="text-slate-950 bg-orange-300 hover:filter-none hover:bg-orange-400 focus:bg-orange-400 outline-none break-all whitespace-normal"
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
    InputChipStyles="text-cyan-900 [&_.input-chip-list]:max-h-24 [&_.input-chip-list]:overflow-auto !border-cyan-300 border-2 !cursor-default hover:filter-none [&_input]:outline-none [&_input]:p-2 [&_input]:rounded-md [&_input]:bg-cyan-200 hover:[&_input]:bg-cyan-300 focus:[&_input]:bg-cyan-300  [&_input]:transition-all [&_input]:border-b-2 [&_input]:border-cyan-300 [&_input]:placeholder:text-cyan-950"
    chips="text-slate-950 bg-green-300 hover:filter-none hover:bg-green-400 focus:bg-green-400 outline-none break-all whitespace-normal"
    buttonBaseStyles={chipsAddButtonBaseStyles}
    buttonErrorStyles={chipsAddButtonErrorStyles}
    buttonImageBaseStyles={chipsAddButtonImageBaseStyles}
    buttonImageErrorStyles={chipsAddButtonErrorImageStyle}
    placeholder="Enter word translation..."
    rounded="rounded-md"
  />

  <textarea
    bind:this={descriptionElem}
    bind:value={newWordDescription}
    class="text-cyan-900 resize-none p-2 rounded-md border-2 border-cyan-300 outline-none bg-cyan-200 hover:bg-cyan-300 focus:bg-cyan-300 transition-all placeholder:text-cyan-950"
    rows="3"
    placeholder="Enter word description..."
  />

  <div>
    <button
      on:click={onAddWord}
      disabled={newWordVariantsList.length === 0 ||
        newWordTranslationsList.length === 0}
      class="btn disabled:bg-cyan-300 bg-cyan-400 hover:bg-cyan-600 focus:bg-cyan-600 rounded-md text-white outline-none"
    >
      add
    </button>
    <button
      on:click={() => modalStore.close()}
      class="btn bg-cyan-400 hover:bg-cyan-600 focus:bg-cyan-600 rounded-md text-white outline-none"
    >
      close
    </button>
  </div>
</div>
