<script lang="ts">
  import { InputChip } from "@skeletonlabs/skeleton";
  import { getIconMaskStyes } from "../../helpers.js";
  import plusImageUrl from "/src/assets/icons/plus.svg";

  export let placeholder = "";
  export let rounded = "";
  export let list: string[] = [];
  export let chips = "";
  export let InputChipStyles = "";
  export let buttonBaseStyles = "";
  export let buttonErrorStyles = "";
  export let buttonImageBaseStyles = "";
  export let buttonImageErrorStyles = "";
  export let chipCurValue = "";
  let buttonError = false;

  export const reset = () => {
    chipCurValue = "";
    buttonError = false;
    list = [];
  };

  const onAddButtonClick = () => {
    chipCurValue = chipCurValue.trim();
    if (chipCurValue === "") {
      buttonError = true;
      return;
    }
    if (list.includes(chipCurValue)) {
      buttonError = true;
      return;
    }
    buttonError = false;
    list = [...list, chipCurValue];
    chipCurValue = "";
  };

  const onInput = () => {
    if (buttonError) {
      buttonError = false;
    }
  };
</script>

<div class="relative">
  <InputChip
    bind:input={chipCurValue}
    bind:value={list}
    bind:chips
    on:input={onInput}
    class={InputChipStyles}
    name="customChip"
    {rounded}
    {placeholder}
    validation={(val) => val.trim() !== ""}
  />
  <button
    class="{buttonBaseStyles} {buttonError && buttonErrorStyles}"
    on:click={onAddButtonClick}
  >
    <div
      class="h-4 w-4 m-auto {buttonImageBaseStyles} {buttonError &&
        buttonImageErrorStyles}"
      style={getIconMaskStyes(plusImageUrl)}
    />
  </button>
</div>
