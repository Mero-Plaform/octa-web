import { type ModalComponent } from "@skeletonlabs/skeleton";
import AddWordModal from '../dictionary/components/modals/AddWordModal.svelte';
import DeleteWordModal from '../dictionary/components/modals/DeleteWordModal.svelte';
import EditWordModal from '../dictionary/components/modals/EditWordModal.svelte';
import Loading from './Loading.svelte';

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
