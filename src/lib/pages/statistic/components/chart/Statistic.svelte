<script lang="ts">
  import Chart from "chart.js/auto";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { chartDataSetsStore } from "../../stores/chartDataSetsStore.js";
  import { chartLabelsStore } from "../../stores/chartLabelsStore.js";
  import {
    dataSelectEnum,
    dataSelectStore,
  } from "../../stores/dataSelectStore.js";
  import { dateSelectStore } from "../../stores/dateSelectStore.js";
  import { statisticStore } from "../../stores/statisticStore/statisticStore.js";
  import type { ChartData } from "./ChartData.js";

  let canvas: HTMLCanvasElement;
  let context: CanvasRenderingContext2D;
  let chart: Chart<"line", unknown[], string>;

  const onChartDataSetsStoreUpdate = ($chartDataSetsStore: ChartData[]) => {
    //@ts-ignore
    chart.data.labels = $chartLabelsStore;
    chart.data.datasets = $chartDataSetsStore;
    chart.update();
  };

  onMount(() => {
    context = canvas.getContext("2d")!;

    chart = new Chart(context, {
      type: "line",
      data: {
        //@ts-ignore
        labels: $chartLabelsStore,
        datasets: $chartDataSetsStore,
      },
      options: {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
            },
          },
        },
      },
    });

    return chartDataSetsStore.subscribe(onChartDataSetsStoreUpdate);
  });
</script>

<div
  transition:fade
  class="absolute flex flex-col justify-center items-center gap-5 h-full w-full"
>
  <select
    bind:value={$dateSelectStore}
    class="select mt-5 w-1/2 max-w-md rounded-md border-2 border-violet-300 bg-violet-200 text-violet-900 focus:border-violet-500"
  >
    <option value="all">all time</option>
    {#each [...$statisticStore.keys()] as year}
      <option value={year}>{year}</option>
    {/each}
  </select>

  <select
    bind:value={$dataSelectStore}
    class="select w-1/2 max-w-md rounded-md border-2 border-violet-300 bg-violet-200 text-violet-900 focus:border-violet-500"
  >
    {#each dataSelectEnum as data}
      <option value={data}>{data}</option>
    {/each}
  </select>

  <div
    class="h-[calc(100%-10rem)] w-90% flex flex-col justify-center items-center"
  >
    <canvas bind:this={canvas} class="h-full w-full" />
  </div>
</div>
