<script lang="ts">
  import { Modal, Toast } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";
  import Router from "./lib/router/Router.svelte";
  import routerStore from "./lib/router/routerStore.js";
  import Menu from "./lib/shared/components/AppMenu/Menu.svelte";
  import Drawer from "./lib/shared/components/Drawer/Drawer.svelte";
  import Popups from "./lib/shared/components/Popups.svelte";
  import { modalComponentRegistry } from "./lib/shared/modalComponentRegistry.js";

  // initial page
  $routerStore = "/settings";

  if (import.meta.env.VITE_BUILD_PLATFORM === "web") {
    onMount(async () => {
      (await import("./lib/utils/webPlatrom/buildHelpers.js")).onAppRendered();
    });
  }
</script>

<Popups />

<Drawer />

<Menu />

<Modal components={modalComponentRegistry} />

<Router />

<Toast />
