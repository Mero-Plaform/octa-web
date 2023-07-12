import { type ModalComponent } from "@skeletonlabs/skeleton";
import AddWordModal from '../pages/dictionary/components/modals/AddWordModal.svelte';
import DeleteWordModal from '../pages/dictionary/components/modals/DeleteWordModal.svelte';
import EditWordModal from '../pages/dictionary/components/modals/EditWordModal.svelte';
import WordPracticeModal from '../pages/dictionary/components/modals/WordPracticeModal.svelte';

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

  wordPractice: {
    ref: WordPracticeModal,
  },
};
