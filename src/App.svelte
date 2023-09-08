<script lang="ts">
  import { Modal, Toast } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import Router from "./lib/router/Router.svelte";
  import routerStore from "./lib/router/routerStore.js";
  import Header from "./lib/shared/components/AppDesktopHeader/Header.svelte";
  import MenuButton from "./lib/shared/components/AppMenu/MenuButton.svelte";
  import Drawer from "./lib/shared/components/Drawer/Drawer.svelte";
  import Popups from "./lib/shared/components/Popups.svelte";
  import { modalComponentBackdropHandler } from "./lib/shared/modalComponent/modalsBackdropHandlers/modalComponentBackdropHandler.js";
  import { modalComponentRegistry } from "./lib/shared/modalComponent/modalComponentRegistry.js";

  // initial page
  $routerStore = "/dictionary";

  if (import.meta.env.VITE_BUILD_PLATFORM === "web") {
    onMount(async () => {
      (
        await import("./lib/utils/webPlatform/appLoadedHandler.js")
      ).onAppRendered();
    });
  }
</script>

<Popups />

<Drawer />

<Modal
  components={modalComponentRegistry}
  on:backdrop={modalComponentBackdropHandler}
/>

<Toast />

<MenuButton />

{#if import.meta.env.VITE_BUILD_PLATFORM === "desktop"}
  <Header />
{/if}

<!-- render app content -->
<Router />
