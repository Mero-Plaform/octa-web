<script lang="ts">
  import { modalStore } from "@skeletonlabs/skeleton";
  import CustomInputChip from "../../../../utils/components/customInputChip/CustomInputChip.svelte";
  import { editWordStore } from "../../stores/editWordStore.js";
  import { wordStore } from "../../stores/wordStore.js";

  const chipsAddButtonBaseStyles =
    "bg-purple-300 hover:bg-purple-400 focus:bg-purple-400 border-2 border-purple-400 p-2 hover:brightness-100 active:scale-90 leading-3 text-center absolute -top-2 -right-2 rounded-md  transition-all";
  const chipsAddButtonErrorStyles = "!bg-red-300 border-red-400";
  const chipsAddButtonImageBaseStyles = "bg-white";
  const chipsAddButtonErrorImageStyle = "";

  let {
    variants: editableWordVariantsList,
    translations: editableWordTranslationsList,
    description: editableWordDescription,
  } = $editWordStore!;

  const onEditWord = () => {
    wordStore.editWord($editWordStore!, {
      variants: editableWordVariantsList,
      translations: editableWordTranslationsList,
      description: editableWordDescription.trim(),
    });
    modalStore.close();
  };
</script>

<div
  class="max-w-90% gap-5 flex flex-col text-center selection:text-white selection:bg-purple-500 overflow-hidden px-5 cursor-default"
>
  <div
    class="select-none bg-purple-400 text-white rounded-md p-2"
  >
    Edit word
  </div>
  <CustomInputChip
    bind:list={editableWordVariantsList}
    buttonBaseStyles={chipsAddButtonBaseStyles}
    buttonErrorStyles={chipsAddButtonErrorStyles}
    buttonImageBaseStyles={chipsAddButtonImageBaseStyles}
    buttonImageErrorStyles={chipsAddButtonErrorImageStyle}
    InputChipStyles="text-purple-900 [&_.input-chip-list]:justify-center [&_.input-chip-list]:rounded-md [&_.input-chip-list]:p-2 [&_.input-chip-list]:bg-purple-400 [&_.input-chip-list]:bg-opacity-50 [&_.input-chip-list]:max-h-24 [&_.input-chip-list]:overflow-auto !border-purple-300 border-2 !cursor-default hover:filter-none [&_input]: [&_input]:p-2 [&_input]:rounded-md [&_input]:bg-purple-200 hover:[&_input]:bg-purple-300 focus:[&_input]:bg-purple-300 [&_input]:transition-all [&_input]:border-b-2 [&_input]:border-purple-300 placeholder:[&_input]:text-purple-950"
    chips="text-slate-950 bg-orange-300 hover:filter-none hover:bg-orange-400 focus:bg-orange-400  break-all whitespace-pre-wrap"
    placeholder="Enter word variant..."
    rounded="rounded-md"
  />

  <CustomInputChip
    bind:list={editableWordTranslationsList}
    buttonBaseStyles={chipsAddButtonBaseStyles}
    buttonErrorStyles={chipsAddButtonErrorStyles}
    buttonImageBaseStyles={chipsAddButtonImageBaseStyles}
    buttonImageErrorStyles={chipsAddButtonErrorImageStyle}
    InputChipStyles="text-purple-900 [&_.input-chip-list]:justify-center [&_.input-chip-list]:rounded-md [&_.input-chip-list]:p-2 [&_.input-chip-list]:bg-purple-400 [&_.input-chip-list]:bg-opacity-50 [&_.input-chip-list]:max-h-24 [&_.input-chip-list]:overflow-auto !border-purple-300 border-2 !cursor-default hover:filter-none [&_input]: [&_input]:p-2 [&_input]:rounded-md [&_input]:bg-purple-200 hover:[&_input]:bg-purple-300 focus:[&_input]:bg-purple-300 [&_input]:transition-all [&_input]:border-b-2 [&_input]:border-purple-300 placeholder:[&_input]:text-purple-950"
    chips="text-slate-950 bg-green-300 hover:filter-none hover:bg-green-400 focus:bg-green-400  break-all whitespace-pre-wrap"
    placeholder="Enter word translation..."
    rounded="rounded-md"
  />

  <div class="p-2 border-2 border-purple-300 rounded-md">
    <textarea
      bind:value={editableWordDescription}
      class="w-full text-purple-800 resize-none p-2 rounded-md bg-purple-400 bg-opacity-50 focus:bg-purple-300 hover:bg-purple-300 transition-all placeholder:text-purple-950"
      rows="3"
      placeholder="Enter word description..."
    />
  </div>

  <div>
    <button
      on:click={onEditWord}
      disabled={editableWordVariantsList.length === 0 ||
        editableWordTranslationsList.length === 0}
      class="btn disabled:bg-purple-300 bg-purple-400 hover:bg-purple-500 focus:bg-purple-500 rounded-md text-white"
    >
      save
    </button>
    <button
      on:click={() => modalStore.close()}
      class="btn bg-purple-400 hover:bg-purple-500 focus:bg-purple-500 rounded-md text-white"
    >
      cancel
    </button>
  </div>
</div>
