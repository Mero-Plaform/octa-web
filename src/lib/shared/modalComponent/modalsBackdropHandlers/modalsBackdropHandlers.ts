import { onAddWordModalClose, onAddWordModalCloseConfirmAnswer } from '../../../pages/dictionary/components/modals/AddWordModal/utils.js';
import { wordPracticeModalClose, wordPracticeModalConfirmAnswer } from '../../../pages/dictionary/components/modals/WordPracticeModal/utils.js';
import { onAppReset, onDictionaryReset, onStatisticReset } from '../../../pages/settings/components/DataTab/Reset/resetUtils.js';
import { onDayCopySettingsCallback } from '../../../pages/settings/components/PracticeTab/practice/CopySettings/utils.js';
import { transferActionStoreSet } from '../../../pages/settings/stores/transferActionStore.js';

export type ModalsBackdropHandlersType = {
  readonly addWordModalClose: () => void;
  readonly addWordModalCloseConfirmAnswer: (closeAddWordModal: boolean) => void;
  readonly wordPracticeModalClose: () => void;
  readonly wordPracticeModalCloseConfirmAnswer: (confirmResult: boolean) => void;
  readonly transferImportConfirmAnswer: (action: boolean) => void;
  readonly dictionaryResetConfirmAnswer: (response: boolean) => Promise<void>;
  readonly statisticResetConfirmAnswer: (response: boolean) => Promise<void>;
  readonly appResetConfirmAnswer: (response: boolean) => Promise<void>;
  readonly copyPracticeDaySettingsConfirmAnswer: (modalResult: boolean) => void;
};

export let modalsBackdropHandlers: ModalsBackdropHandlersType;

export const initModalsBackdropHandlers = () => {
  modalsBackdropHandlers = {
    addWordModalClose: onAddWordModalClose,
    addWordModalCloseConfirmAnswer: onAddWordModalCloseConfirmAnswer,
    wordPracticeModalClose: wordPracticeModalClose,
    wordPracticeModalCloseConfirmAnswer: wordPracticeModalConfirmAnswer,
    transferImportConfirmAnswer: transferActionStoreSet,
    dictionaryResetConfirmAnswer: onDictionaryReset,
    statisticResetConfirmAnswer: onStatisticReset,
    appResetConfirmAnswer: onAppReset,
    copyPracticeDaySettingsConfirmAnswer: onDayCopySettingsCallback,
  };
};
