import { modalStore } from '@skeletonlabs/skeleton';
import type { Word } from '../../../interfaces/Word.js';
import { wordPracticeStore } from '../../../stores/wordPracticeStore.js';
import { wordStore } from '../../../stores/wordStore.js';

let word: Word;

wordPracticeStore.subscribe((w) => word = w!);

export const wordPracticeModalClose = () => {
  modalStore.close();
};

export const wordPracticeModalConfirmAnswer = (confirmResult: boolean) => {
  if (confirmResult) {
    wordStore.resetWordPractice(word);
    wordPracticeStore.set(wordStore.getById(word.id)!);
  }

  modalStore.trigger({
    type: "component",
    component: "wordPractice",
    backdropClasses:
      "!bg-pink-200 !bg-opacity-50 backdrop-blur-sm cursor-pointer !z-40" +
      (import.meta.env.VITE_BUILD_PLATFORM === "desktop" &&
        " h-[calc(100vh-24px)] bottom-0 top-auto"),
  });
};
