<script lang="ts">
  import {
    Modal, Toast,
  } from "@skeletonlabs/skeleton";
  import Menu from "./lib/shared/components/AppMenu/Menu.svelte";
  import Popups from "./lib/shared/components/Popups.svelte";
  import { modalComponentRegistry } from "./lib/shared/modalComponentRegistry.js";
  import Router from './lib/router/Router.svelte';
  import routerStore from './lib/router/routerStore.js';

  $routerStore = '/link1';
</script>

<Menu/>

<Modal components={modalComponentRegistry}/>

<Router />

<Popups />

<Toast />
