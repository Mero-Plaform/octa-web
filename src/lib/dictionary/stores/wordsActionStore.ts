import { CustomWritableStoreWithoutInitialCallFactory } from '../../utils/customStores/CustomWritableStoreWithoutInitialCallFactory.js';

export type WordActionStoreAction = 'add' | 'edit' | 'delete';

export type WordActionStoreData = [WordActionStoreAction, unknown];

/**
 * broadcast last action in wordStore (e.g. add, edit, delete)
 */
export const wordsActionStore = CustomWritableStoreWithoutInitialCallFactory<WordActionStoreData>();
