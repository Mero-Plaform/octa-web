<script lang="ts">
  import {
    Drawer,
    drawerStore,
  } from "@skeletonlabs/skeleton";
  import MenuButton from "./MenuButton.svelte";
  import MenuInner from "./MenuInner.svelte";
</script>

<Drawer>
  <MenuInner on:click={() => drawerStore.close()} />
</Drawer>

<MenuButton/>
