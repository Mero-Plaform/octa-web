<script lang="ts">
  import { ListBox, ListBoxItem, focusTrap } from "@skeletonlabs/skeleton";
  import routerStore from "../../../router/routerStore.js";
  import BowIconSvg from "../../../../assets/icons/bow-white.svg";
  import BookIconSvg from "../../../../assets/icons/book-white.svg";
  import StatsIconSvg from "../../../../assets/icons/stats-white.svg";
</script>

<ListBox
  rounded="rounded-md" 
  spacing="space-y-2"
  active="!bg-teal-500"
>
  <ListBoxItem
    on:click
    bind:group={$routerStore}
    name="medium"
    value="/dictionary"
    class="bg-teal-700 hover:!bg-teal-400 focus:!bg-teal-400 transition-all outline-none"
  >
    <svelte:fragment slot="lead"><img src={BookIconSvg} class="h-5" alt="book icon"/></svelte:fragment>
    Dictionary
  </ListBoxItem>
  <ListBoxItem
    on:click
    bind:group={$routerStore}
    name="medium"
    value="/practice"
    class="bg-teal-700 hover:!bg-teal-400 focus:!bg-teal-400 transition-all outline-none"
  >
    <svelte:fragment slot="lead"><img src={BowIconSvg} class="h-5" alt="bow icon"/></svelte:fragment>
    Practice
  </ListBoxItem>
  <ListBoxItem
    on:click
    bind:group={$routerStore}
    name="medium"
    value="/statistic"
    class="bg-teal-700 hover:!bg-teal-400 focus:!bg-teal-400 transition-all outline-none"
  >
    <svelte:fragment slot="lead"><img src={StatsIconSvg} class="h-5" alt="bow icon"/></svelte:fragment>
    Statistic
  </ListBoxItem>
</ListBox>
