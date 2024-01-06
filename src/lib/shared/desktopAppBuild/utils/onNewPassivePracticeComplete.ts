import type { Word } from "../../../pages/dictionary/interfaces/Word.js";
import { wordStore } from "../../../pages/dictionary/stores/wordStore.js";
import type { PracticeTarget } from "../../../pages/practice/interfaces/settings.js";
import { onPassivePractice } from "../../../pages/statistic/stores/statisticStore/statisticStoreUtils.js";

export const onNewPassivePracticeComplete = (_: unknown, result: boolean, wordId: Word["id"], practiceTarget: PracticeTarget) => {
  if (result) {
    wordStore.onSuccessfulPractice(wordId);
    onPassivePractice("successful", practiceTarget);
  } else {
    wordStore.onUnsuccessfulPractice(wordId);
    onPassivePractice("unsuccessful", practiceTarget);
  }
};
