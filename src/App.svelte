<script lang="ts">
  import {
    Modal,
  } from "@skeletonlabs/skeleton";
  import Menu from "./lib/shared/components/AppMenu/Menu.svelte";
  import Dictionary from "./lib/dictionary/components/Dictionary.svelte";
  import Popups from "./lib/shared/components/Popups.svelte";
  import { modalComponentRegistry } from "./lib/shared/modalComponentRegistry.js";
  import Router from './lib/router/Router.svelte';
</script>

<Menu/>

<Modal components={modalComponentRegistry}/>

<Dictionary />

<Router />

<Popups />
