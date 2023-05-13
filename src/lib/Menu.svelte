<script lang="ts">
  import { ListBox, ListBoxItem } from "@skeletonlabs/skeleton";
  import routerStore from "./routerStore";
</script>

<ListBox rounded='rounded-0'>
	<ListBoxItem on:click bind:group={$routerStore} name="medium" value="/">
    <svelte:fragment slot="lead"><img src="/vite.svg" alt="vite icon" /></svelte:fragment>
	  Home
  </ListBoxItem>
	<ListBoxItem on:click bind:group={$routerStore} name="medium" value="/link1">
    <svelte:fragment slot="lead"><img src="/vite.svg" alt="vite icon" /></svelte:fragment>
	  Link 1
  </ListBoxItem>
	<ListBoxItem on:click bind:group={$routerStore} name="medium" value="/link2">
    <svelte:fragment slot="lead"><img src="/vite.svg" alt="vite icon" /></svelte:fragment>
	  Link 2
  </ListBoxItem>
</ListBox>
