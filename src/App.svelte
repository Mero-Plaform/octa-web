<script lang="ts">
  import { Modal, Toast } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import Router from "./lib/router/Router.svelte";
  import routerStore from "./lib/router/routerStore.js";
  import Header from "./lib/shared/components/AppDesktopHeader/Header.svelte";
  import MenuButton from "./lib/shared/components/AppMenu/MenuButton.svelte";
  import Drawer from "./lib/shared/components/Drawer/Drawer.svelte";
  import Popups from "./lib/shared/components/Popups.svelte";
  import { modalComponentRegistry } from "./lib/shared/modalComponent/modalComponentRegistry.js";
  import { modalOnBackdropHandler } from "./lib/shared/modalComponent/modalsBackdropHandlers/modalOnBackdropHandler.js";
  import BgOctaAnimation from "./lib/utils/components/BgOctaAnimation/BgOctaAnimation.svelte";

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
  on:backdrop={modalOnBackdropHandler}
/>

<Toast />

<MenuButton />

{#if import.meta.env.VITE_BUILD_PLATFORM === "desktop"}
  <Header />
{/if}

<BgOctaAnimation octaNumber={7} />

<!-- render app content -->
<Router />
