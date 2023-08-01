<script lang="ts">
  import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
  import { getContext } from "svelte";
  import { scale } from "svelte/transition";
  import {
    WEEK_DAYS_SHORT_TO_LONG,
    type WEEK_DAYS_SHORTS_TYPE,
  } from "../../../../../utils/helpers.js";
  import type { PracticeStores } from "../../../interfaces/practiceStores.js";
  import PassivePracticeTimeForWeekDay from "./TimeForWeekDay.svelte";

  export let chosenDay: WEEK_DAYS_SHORTS_TYPE;

  const mainColor = getContext<string>("mainColor");
  const { settingsStore } = getContext<PracticeStores>("stores");
</script>

<div transition:scale>
  <Accordion class="mt-2">
    <AccordionItem
      class="bg-white rounded-md {!$settingsStore.daySettings[chosenDay]
        ?.enabled
        ? '!bg-gray-300 '
        : ''}"
    >
      <svelte:fragment slot="summary">
        <div>
          {WEEK_DAYS_SHORT_TO_LONG[chosenDay]}
        </div>
      </svelte:fragment>
      <svelte:fragment slot="content">
        <div class="p-2 bg-opacity-50 bg-{mainColor}-200 rounded-md">
          <PassivePracticeTimeForWeekDay settingKey={chosenDay} />
        </div>
      </svelte:fragment>
    </AccordionItem>
  </Accordion>
</div>
