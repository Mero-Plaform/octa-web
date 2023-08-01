<script lang="ts">
  import {
    Accordion,
    AccordionItem,
    popup,
    type PopupSettings,
  } from "@skeletonlabs/skeleton";
  import { getContext } from "svelte";
  import { fly } from "svelte/transition";
  import PracticeTime from "./PracticeTime.svelte";

  const mainColor = getContext<string>("mainColor");

  const settingsPracticePassiveGeneral: PopupSettings = {
    event: "hover",
    target: `settingsPractice${getContext("generalSettingsPopup")}General`,
    placement: "top",
  };
</script>

<div transition:fly={{ y: 10 }}>
  <Accordion class="mt-2">
    <AccordionItem class="bg-white rounded-md">
      <svelte:fragment slot="summary">
        <div>
          General
          <span
            use:popup={settingsPracticePassiveGeneral}
            class="bg-{mainColor}-600 text-white px-[0.330rem] text-xs rounded-full border-white border-2 border-solid"
            >?</span
          >
        </div>
      </svelte:fragment>
      <svelte:fragment slot="content">
        <div class="p-2 bg-opacity-50 bg-{mainColor}-200 rounded-md">
          <PracticeTime settingKey="general" />
        </div>
      </svelte:fragment>
    </AccordionItem>
  </Accordion>
</div>
