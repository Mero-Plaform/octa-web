<script lang="ts">
  import { Tab, TabGroup } from "@skeletonlabs/skeleton";
  import { fade } from "svelte/transition";
  import BasicTab from "./BasicTab.svelte";
  import DataTab from "./DataTab/DataTab/DataTab.svelte";
  import PracticeTab from "./PracticeTab/PracticeTab.svelte";

  // chosen tab (DataTab)
  let tabSet: number = 0;
</script>

<div transition:fade class="absolute h-screen w-screen">
  <TabGroup
    justify="justify-center"
    active="!bg-opacity-100 !text-white"
    hover="hover:brightness-110"
    rounded="rounded-md"
    border=""
    class="w-full mt-5 [&_.tab-list]:gap-10 text-indigo-900 [&_.tab]:outline-none"
  >
    <Tab
      bind:group={tabSet}
      name="tab1"
      value={0}
      class="select-none bg-pink-400 border-b-2 border-pink-400 bg-opacity-20 text-pink-900"
    >
      Data
    </Tab>
    <Tab
      bind:group={tabSet}
      name="tab2"
      value={1}
      class="select-none bg-green-400 border-b-2 border-green-400 bg-opacity-20 text-green-900"
    >
      Practice
    </Tab>
    <Tab
      bind:group={tabSet}
      name="tab3"
      value={2}
      class="select-none bg-cyan-400 border-b-2 border-cyan-400 bg-opacity-20 text-cyan-900"
    >
      Basic
    </Tab>
    <svelte:fragment slot="panel">
      {#if tabSet === 0}
        <DataTab />
      {:else if tabSet === 1}
        <PracticeTab />
      {:else if tabSet === 2}
        <BasicTab />
      {/if}
    </svelte:fragment>
  </TabGroup>
</div>
