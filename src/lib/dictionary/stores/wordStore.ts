import type { CustomWritableStore } from '../../utils/customStores/CustomWritableStore.js';
import { CustomWritableStoreFactory } from '../../utils/customStores/CustomWritableStoreFactory.js';
import type { Word } from '../interfaces/Word.js';
import { wordsActionStore } from './wordsActionStore.js';

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
  wordsActionStore.set(['add', newWord]);
};

const editWord = (wordId: string, editedWordData: EditWordData) => {
  const { learnSuccess, practiceCount, successfulPracticeCount } = getById(wordId)!;
  const editedWord = { 
    id: wordId, 
    learnSuccess,
    practiceCount,
    successfulPracticeCount,
    ...editedWordData 
  };

  updateWord(editedWord);
  wordsActionStore.set(['edit', editedWord]);
};

const removeWord = (wordId: string) => {
  wordStore.update((wordsMap) => {
    wordsMap.delete(wordId);
    return wordsMap;
  });

  wordsActionStore.set(['delete', wordId]);
};

const onUnsuccessfulPractice = (wordId: Word["id"]) => {
  const word = getById(wordId)!;
  const updatedPracticeCount = word.practiceCount + 1;
  const updatedLearnSuccess = (word.successfulPracticeCount * 100) / updatedPracticeCount;

  const updatedWord = {
    ...word,
    practiceCount: updatedPracticeCount,
    learnSuccess: updatedLearnSuccess,
  };

  updateWord(updatedWord);
  wordsActionStore.set(['edit', updatedWord]);
};

const onSuccessfulPractice = (wordId: Word["id"]) => {
  const word = getById(wordId)!;
  const updatedPracticeCount = word.practiceCount + 1;
  const updatedSuccessPracticeCount = word.successfulPracticeCount + 1;
  const updatedLearnSuccess = (updatedSuccessPracticeCount * 100) / updatedPracticeCount;

  const updatedWord = {
    ...word,
    practiceCount: updatedPracticeCount,
    successfulPracticeCount: updatedSuccessPracticeCount,
    learnSuccess: updatedLearnSuccess,
  };

  updateWord(updatedWord);
  wordsActionStore.set(['edit', updatedWord]);
};

type WordStore = CustomWritableStore<Map<string, Word>> & {
  getById: (wordId: string) => Word | undefined;
  removeWord: (wordId: string) => void;
  editWord: (wordId: string, editedWordData: EditWordData) => void;
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
    editWord,
    addWord,
    onUnsuccessfulPractice,
    onSuccessfulPractice
  });
};

export let wordStore: WordStore;
