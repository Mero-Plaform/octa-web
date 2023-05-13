<script lang="ts">
  import {
    Drawer,
    drawerStore,
    type DrawerSettings,
  } from "@skeletonlabs/skeleton";
  import Menu from "./lib/Menu.svelte";
  import Router from "./lib/Router.svelte";

  const drawerSettings: DrawerSettings = {
    id: "example-3",
    bgDrawer: "bg-purple-900 text-white",
    width: "w-[250px] md:w-[250px]",
    height: "h-max",
    padding: "p-4",
    rounded: "rounded-xl",
  };
</script>

<button
  on:click={() => drawerStore.open(drawerSettings)}
  class="fixed top-3 left-3"
>
  <img src="src/assets/svelte.svg" alt="svelte icon" />
</button>

<Router />
<Drawer>
  <Menu on:click={() => drawerStore.close()} />
</Drawer>
