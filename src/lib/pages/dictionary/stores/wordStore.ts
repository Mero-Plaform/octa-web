import type { CustomWritableStore } from '../../../utils/customStores/CustomWritableStore.js';
import { CustomWritableStoreFactory } from '../../../utils/customStores/CustomWritableStoreFactory.js';
import type { Word } from '../interfaces/Word.js';
import { wordActionStore } from './wordActionStore.js';

/**
 * resetting word practice data
 */
const resetWordPractice = (word: Word) => {
  const practiceNulledWord = {
    ...word,
    learnSuccess: 0,
    practiceCount: 0,
    successfulPracticeCount: 0,
  };

  updateWord(practiceNulledWord);
  wordActionStore.set(['edit', practiceNulledWord]);
};

/**
 * updating word data in wordStore by overwriting
 */
const updateWord = (updatedWord: Word) => {
  wordStore.update((wordsMap) => {
    return wordsMap.set(updatedWord.id, updatedWord);
  });
};

const getById = (wordId: string): Word | undefined => {
  return wordStore.value.get(wordId);
};

type NewWordData = Omit<Word, "learnSuccess" | "id" | "practiceCount" | "successfulPracticeCount">;
type EditWordData = NewWordData;

const addWord = (newWordData: NewWordData) => {
  const newWordId = String(new Date().getTime());
  const newWord = {
    id: newWordId,
    learnSuccess: 0,
    practiceCount: 0,
    successfulPracticeCount: 0,
    ...newWordData,
  };

  updateWord(newWord);
  wordActionStore.set(['add', newWord]);
};

const editWord = (word: Word, editedWordData: EditWordData) => {
  const { learnSuccess, practiceCount, successfulPracticeCount } = word;
  const editedWord = {
    id: word.id,
    learnSuccess,
    practiceCount,
    successfulPracticeCount,
    ...editedWordData
  };

  updateWord(editedWord);
  wordActionStore.set(['edit', editedWord]);
};

const removeWord = (wordId: string) => {
  wordStore.update((wordsMap) => {
    wordsMap.delete(wordId);
    return wordsMap;
  });

  wordActionStore.set(['delete', wordId]);
};

const floatPracticePrecision = 2;

const onUnsuccessfulPractice = (wordId: Word["id"]) => {
  const word = getById(wordId)!;
  const updatedPracticeCount = word.practiceCount + 1;
  const updatedLearnSuccess = (word.successfulPracticeCount * 100) / updatedPracticeCount;
  const roundedLearnSuccess = Number(updatedLearnSuccess.toFixed(floatPracticePrecision));

  const updatedWord = {
    ...word,
    practiceCount: updatedPracticeCount,
    learnSuccess: roundedLearnSuccess,
  };

  updateWord(updatedWord);
  wordActionStore.set(['edit', updatedWord]);
};

const onSuccessfulPractice = (wordId: Word["id"]) => {
  const word = getById(wordId)!;
  const updatedPracticeCount = word.practiceCount + 1;
  const updatedSuccessPracticeCount = word.successfulPracticeCount + 1;
  const updatedLearnSuccess = (updatedSuccessPracticeCount * 100) / updatedPracticeCount;
  const roundedLearnSuccess = Number(updatedLearnSuccess.toFixed(floatPracticePrecision));

  const updatedWord = {
    ...word,
    practiceCount: updatedPracticeCount,
    successfulPracticeCount: updatedSuccessPracticeCount,
    learnSuccess: roundedLearnSuccess,
  };

  updateWord(updatedWord);
  wordActionStore.set(['edit', updatedWord]);
};

type WordStore = CustomWritableStore<Map<string, Word>> & {
  getById: (wordId: string) => Word | undefined;
  removeWord: (wordId: string) => void;
  resetWordPractice: (word: Word) => void;
  editWord: (word: Word, editedWordData: EditWordData) => void;
  addWord: (newWordData: NewWordData) => void;
  onUnsuccessfulPractice: (wordId: Word["id"]) => void;
  onSuccessfulPractice: (wordId: Word["id"]) => void;
};

/**
 * creating word store from DB's dictionary 
 */
export const createWordStore = (dictionaryArr: Word[]) => {
  const wordsMap = new Map<Word['id'], Word>();
  dictionaryArr.forEach(({ id, ...properties }) => {
    wordsMap.set(id, { id, ...properties });
  });

  wordStore = CustomWritableStoreFactory(wordsMap, {
    getById,
    removeWord,
    resetWordPractice,
    editWord,
    addWord,
    onUnsuccessfulPractice,
    onSuccessfulPractice
  });
};

export let wordStore: WordStore;
