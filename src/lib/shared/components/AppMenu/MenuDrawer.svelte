<script lang="ts">
  import { ListBox, ListBoxItem, drawerStore } from "@skeletonlabs/skeleton";
  import BookIconSvg from "../../../../assets/icons/book-white.svg";
  import BowIconSvg from "../../../../assets/icons/bow-white.svg";
  import ClearIconSvg from "../../../../assets/icons/clear-white.svg";
  import SettingsIconSvg from "../../../../assets/icons/settings-white.svg";
  import StatsIconSvg from "../../../../assets/icons/stats-white.svg";
  import routerStore from "../../../router/routerStore.js";
  import { sendToIpcMain } from "../../desktopAppBuild/ipcUtils.js";

  const closeMenu = () => drawerStore.close();

  const menuItemsList = [
    {
      title: "Dictionary",
      value: "/dictionary",
      imgSrc: BookIconSvg,
      imgAlt: "book icon",
      onClick: closeMenu,
    },
    {
      title: "Practice",
      value: "/practice",
      imgSrc: BowIconSvg,
      imgAlt: "bow icon",
      onClick: closeMenu,
    },
    {
      title: "Statistic",
      value: "/statistic",
      imgSrc: StatsIconSvg,
      imgAlt: "stats icon",
      onClick: closeMenu,
    },
    {
      title: "Settings",
      value: "/settings",
      imgSrc: SettingsIconSvg,
      imgAlt: "settings icon",
      onClick: closeMenu,
    },
  ];

  if (import.meta.env.VITE_BUILD_PLATFORM === "desktop") {
    menuItemsList.push({
      title: "Exit",
      value: "/exit",
      imgSrc: ClearIconSvg,
      imgAlt: "exit icon",
      onClick: () => {
        sendToIpcMain("onAppExit");
        closeMenu();
      },
    });
  }
</script>

<ListBox rounded="rounded-md" spacing="space-y-2" active="!bg-teal-500">
  {#each menuItemsList as { title, value, imgSrc, imgAlt, onClick }}
    <ListBoxItem
      on:click={onClick}
      bind:group={$routerStore}
      name="medium"
      {value}
      class="select-none bg-teal-700 hover:!bg-teal-400 focus:!bg-teal-400 active:scale-95 transition-all"
    >
      <svelte:fragment slot="lead">
        <img src={imgSrc} class="h-5" alt={imgAlt} />
      </svelte:fragment>
      {title}
    </ListBoxItem>
  {/each}
</ListBox>
