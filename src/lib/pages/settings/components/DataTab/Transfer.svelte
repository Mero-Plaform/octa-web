<script lang="ts">
  import { FileDropzone, modalStore } from "@skeletonlabs/skeleton";
  import {
    type ImportAppDBData,
  } from "../../../../DB/utils.js";
  import { getConfirmModalSettings } from "../../../../shared/components/ConfirmModal/ConfirmModalUtils.js";
  import {
    closeLoadingDrawer,
    openLoadingDrawer,
  } from "../../../../shared/components/Drawer/loadingDrawer/loadingDrawerUtils.js";
  import { getIconMaskStyes } from "../../../../utils/helpers.js";
  import { reInitWordStoreFromDB } from "../../../dictionary/stores/wordStore.js";
  import { exportAppData } from "./DataTab/DataTabUtils.js";
  import FileRemoveWhiteIconUrl from "/src/assets/icons/file-remove-white.svg";
  import FileSmileWhiteIconUrl from "/src/assets/icons/file-smile-white.svg";
    import { utilsWithCatch } from '../../../../DB/utilsWithCatch.js';

  const loadingDrawerSettings = {
    bgBackdropColor: "emerald",
    progressBarBgColor: "emerald",
  };
  let isDragEnter = false;
  let inputTag: HTMLInputElement;
  let inputIcon = FileRemoveWhiteIconUrl;
  let inputFileName = "empty";
  let errFileType = false;
  let importDataDisabled = true;
  let files: FileList;

  const onDragEnter = () => {
    isDragEnter = true;
  };

  const onDragLeave = () => {
    isDragEnter = false;
  };

  const onFileDropzoneChange = (e: Event) => {
    inputTag = e.target as HTMLInputElement;

    if (files.length === 0) {
      inputIcon = FileRemoveWhiteIconUrl;
      inputFileName = "empty";
      errFileType = false;
      importDataDisabled = true;
    } else {
      const [fileName, fileType] = files[0].name.split(".");
      inputIcon = FileSmileWhiteIconUrl;
      inputFileName =
        fileName.length > 10
          ? fileName.slice(0, 10) + `... .${fileType}`
          : files[0].name;

      if (fileType !== "dic") {
        errFileType = true;
        importDataDisabled = true;
      } else {
        errFileType = false;
        importDataDisabled = false;
      }
    }
  };

  const onImportDataModalResponse = async (result: boolean | undefined) => {
    if (!result) {
      return;
    }

    openLoadingDrawer(loadingDrawerSettings);
    await (<ImportAppDBData>utilsWithCatch.get("importAppDBData")!)(files[0]);
    reInitWordStoreFromDB();
    inputTag.value = "";
    inputTag.dispatchEvent(new CustomEvent("change"));
    closeLoadingDrawer();
  };

  const onExportAppData = async () => {
    openLoadingDrawer(loadingDrawerSettings);
    await exportAppData();
    closeLoadingDrawer();
  };

  const onImportButtonClick = () => {
    modalStore.trigger(
      getConfirmModalSettings({
        backdropColor: "emerald",
        body: "Import data from file will <i class='text-red-300 bg-white px-1 rounded-md'>delete</i> all existing ones!",
        color: "emerald",
        callback: onImportDataModalResponse,
      })
    );
  };
</script>

<div
  class="max-w-lg p-2 border-2 rounded-md bg-emerald-200 bg-opacity-50 text-emerald-900"
>
  <div
    class="w-full border-emerald-400 border-2 rounded-md p-2 cursor-default select-none"
  >
    Transfer
  </div>
  <div class="flex gap-2 mt-2">
    <FileDropzone
      name="importData"
      rounded="rounded-md"
      class={isDragEnter && "bg-emerald-300"}
      bind:files
      on:change={onFileDropzoneChange}
      on:dragenter={onDragEnter}
      on:dragleave={onDragLeave}
      on:drop={onDragLeave}
      accept=".dic"
    >
      <svelte:fragment slot="lead">
        <div
          class="h-10 w-10 m-auto bg-emerald-500"
          style={getIconMaskStyes(inputIcon)}
        />
        <div>{inputFileName}</div>
      </svelte:fragment>
      <svelte:fragment slot="message"
        >Choose a file | drag & drop</svelte:fragment
      >
      <svelte:fragment slot="meta">
        <div class:animate-pulse={errFileType} class:text-red-700={errFileType}>
          only DIC files allowed
        </div>
      </svelte:fragment>
    </FileDropzone>
    <div class="flex flex-col gap-2 w-1/2">
      <button
        on:click={onImportButtonClick}
        disabled={importDataDisabled}
        class="btn grow bg-emerald-300 text-emerald-900 rounded-md focus:brightness-110"
      >
        Import app data
      </button>
      <button
        class="btn grow bg-emerald-300 text-emerald-900 rounded-md focus:brightness-110"
        on:click={onExportAppData}
      >
        Export app data
      </button>
    </div>
  </div>
</div>
