import type { Word } from '../interfaces/Word.js';
import { CustomWritableStoreFactory } from '../../utils/components/customInputChip/CustomStoreFactory.js';
import { wordsActionStore } from './wordsActionStore.js';

const getById = (wordId: string): Word | undefined => {
  return wordStore.value.get(wordId);
};

type NewWordData = Omit<Word, 'learnSuccess' | 'id'>;
type EditWordData = NewWordData;

const addWord = (newWordData: NewWordData) => {
  const newWordId = String(new Date().getTime());
  const newWord = {
    id: newWordId,
    learnSuccess: 0,
    ...newWordData,
  };

  wordStore.update((wordsMap) => {
    return wordsMap.set(newWord.id, newWord);
  });

  wordsActionStore.set(['add', newWordId]);
};

const editWord = (wordId: string, editWord: EditWordData) => {
  const learnSuccess = wordStore.getById(wordId)!.learnSuccess;
  wordStore.update((wordsMap) => {
    return wordsMap.set(wordId, { id: wordId, learnSuccess, ...editWord });
  });
};

const removeWord = (wordId: string) => {
  wordStore.update((wordsMap) => {
    wordsMap.delete(wordId);
    return wordsMap;
  });
};

export const wordStore = CustomWritableStoreFactory(new Map<Word['id'], Word>(), {
  getById,
  removeWord,
  editWord,
  addWord
});
