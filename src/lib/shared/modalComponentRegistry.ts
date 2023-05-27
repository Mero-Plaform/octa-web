import AddWordModal from '/src/lib/dictionary/components/modals/AddWordModal.svelte';
import EditWordModal from '/src/lib/dictionary/components/modals/EditWordModal.svelte';
import DeleteWordModal from '/src/lib/dictionary/components/modals/DeleteWordModal.svelte';
import { type ModalComponent } from "@skeletonlabs/skeleton";

export const modalComponentRegistry: Record<string, ModalComponent> = {
  addWord: {
    ref: AddWordModal,
  },

  removeWord: { 
    ref: DeleteWordModal,
  },

  editWord: {
    ref: EditWordModal,
  },
};
