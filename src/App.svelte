<script lang="ts">
  import { Modal, Toast } from "@skeletonlabs/skeleton";
  import Router from "./lib/router/Router.svelte";
  import routerStore from "./lib/router/routerStore.js";
  import Menu from "./lib/shared/components/AppMenu/Menu.svelte";
  import Drawer from "./lib/shared/components/Drawer/Drawer.svelte";
  import Popups from "./lib/shared/components/Popups.svelte";
  import { modalComponentRegistry } from "./lib/shared/modalComponentRegistry.js";

  // initial page
  $routerStore = "/dictionary";
</script>

<Popups />

<Drawer />

<Menu />

<Modal components={modalComponentRegistry} />

<Router />

<Toast />
