<script lang="ts">
  import { getIconMaskStyes } from '/src/lib/utils/helpers.js';

  export let disabled = false;
  export let value = "";
  export let wrapStyles = "";
  export let placeholder = "";
  export let inputStyles = "";
  export let iconSrc = "";
  export let iconStyles = "";
  export let buttonStyles = ""
  export let buttonClickHandler: (event: MouseEvent) => void | undefined = undefined!;
  export let inputElem;
</script>

<div class={wrapStyles}>
  <input bind:this={inputElem} bind:value {placeholder} class={inputStyles} disabled={disabled}/>
  {#if iconSrc}
    <button class={buttonStyles} on:click={buttonClickHandler} disabled={disabled}>
      <div class={iconStyles} style={getIconMaskStyes(iconSrc)}></div>
    </button>
  {/if}
</div>
