<script lang="ts">
  import { Drawer, drawerStore } from "@skeletonlabs/skeleton";
  import MenuDrawer from "../AppMenu/MenuDrawer.svelte";
  import CustomLoadingDrawer from "./loadingDrawer/CustomLoadingDrawer.svelte";
</script>

<Drawer>
  {#if $drawerStore.id === "mainMenu"}
    <MenuDrawer />
  {:else if $drawerStore.id === "loading"}
    <CustomLoadingDrawer />
  {:else}
    <!-- (fallback contents) -->
  {/if}
</Drawer>
