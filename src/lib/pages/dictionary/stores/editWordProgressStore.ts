import { modalStore } from "@skeletonlabs/skeleton";
import { get, writable } from 'svelte/store';
import { getConfirmModalSettings } from "../../../shared/components/ConfirmModal/ConfirmModalUtils.js";
import { openEditWordModal } from "../../../utils/helpers.js";
import type { Word } from '../interfaces/Word.js';
import { editWordStore } from "./editWordStore.js";

type EditWordProgressStoreData = Word & {
  variantInputValue: string;
  translationInputValue: string;
};

let didChanges = false;
let editWordData: Omit<EditWordProgressStoreData, "variantInputValue" | "translationInputValue">;
let variantInputValue: EditWordProgressStoreData["variantInputValue"];
let translationInputValue: EditWordProgressStoreData["translationInputValue"];

/**
 * keeps current editWordModal data
 */
export const editWordProgressStore = writable<EditWordProgressStoreData>();

const resetEditWordProgress = () => {
  variantInputValue = "";
  translationInputValue = "";
  didChanges = false;
};

/**
 * show confirm modal on closed(not save) if did changes to word in editWordModal or inputs are not empty
 */
export const checkForChangesToCancel = () => {
  modalStore.close();
  ({ variantInputValue, translationInputValue, ...editWordData } = get(editWordProgressStore));
  const editWordOriginalData = get(editWordStore);

  variantInputValue = variantInputValue.trim();
  translationInputValue = translationInputValue.trim();

  if (
    didChanges
    || variantInputValue
    || translationInputValue
    || editWordData.description !== editWordOriginalData!.description
    || editWordData.variants.join("") !== editWordOriginalData!.variants.join("")
    || editWordData.translations.join("") !== editWordOriginalData!.translations.join("")
  ) {
    modalStore.trigger(
      getConfirmModalSettings({
        backdropColor: "purple",
        color: "purple",
        body: `All edited word data will be <i class="text-purple-400 bg-white rounded-md p-1">lost</i>.`,
        backdropActionName: "onEditWordModalCloseConfirmAnswer",
        response: onEditWordModalCloseConfirmAnswer
      })
    );
  } else {
    resetEditWordProgress();
  }
};

export const onEditWordModalCloseConfirmAnswer = (closeAddWordModal: boolean) => {
  if (closeAddWordModal) { resetEditWordProgress(); return; }

  didChanges = true;
  editWordStore.set(editWordData);
  openEditWordModal();
};
