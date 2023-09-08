import { modalStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import { getConfirmModalSettings } from '../../../../../shared/components/ConfirmModal/ConfirmModalUtils.js';
import { openAddWordModal } from '../../../../../utils/helpers.js';
import { addWordModalCacheStore, resetAddWordModalCacheStore } from '../../../stores/addWordModalCacheStore.js';

export const onAddWordModalCloseConfirmAnswer = (closeAddWordModal: boolean) => {
  if (closeAddWordModal) {
    resetAddWordModalCacheStore();
  } else {
    openAddWordModal();
  }
};

export const onAddWordModalClose = () => {
  modalStore.close();
  const addWordModalCacheStoreValue = get(addWordModalCacheStore);

  // if addWordModal is not empty
  if (
    addWordModalCacheStoreValue.newWordVariantsList.length !== 0 ||
    addWordModalCacheStoreValue.newWordTranslationsList.length !== 0 ||
    addWordModalCacheStoreValue.newWordDescription.trim() !== ""
  ) {
    // open confirm modal to proceed addWordModal close
    modalStore.trigger(
      getConfirmModalSettings({
        backdropColor: "cyan",
        color: "cyan",
        body: `All entered word data will be <i class="text-cyan-400 bg-white rounded-md p-1">lost</i>.`,
        backdropActionName: "addWordModalCloseConfirmAnswer",
        response: onAddWordModalCloseConfirmAnswer
      })
    );
  } else {
    resetAddWordModalCacheStore();
  }
};
