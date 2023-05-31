<script lang="ts">
  import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
  import routerStore from '../../../router/routerStore.js';
</script>

<ListBox rounded='rounded-0'>
	<ListBoxItem on:click bind:group={$routerStore} name="medium" value="/">
    <svelte:fragment slot="lead"><img src="/vite.svg" alt="vite icon" /></svelte:fragment>
	  Dictionary
  </ListBoxItem>
	<ListBoxItem on:click bind:group={$routerStore} name="medium" value="/link1">
    <svelte:fragment slot="lead"><img src="/vite.svg" alt="vite icon" /></svelte:fragment>
	  Pracitce
  </ListBoxItem>
</ListBox>
