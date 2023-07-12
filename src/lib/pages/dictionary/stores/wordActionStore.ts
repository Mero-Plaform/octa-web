import { CustomWritableStoreWithoutInitialCallFactory } from '../../../utils/customStores/CustomWritableStoreWithoutInitialCallFactory.js';

export type WordActionStoreActions = 'add' | 'edit' | 'delete';

export type WordActionStoreData = [WordActionStoreActions, unknown];

/**
 * broadcast last action in wordStore (such as: <WordActionStoreActions>)
 */
export const wordActionStore = CustomWritableStoreWithoutInitialCallFactory<WordActionStoreData>();
