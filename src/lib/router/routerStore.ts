import { writable } from 'svelte/store';

export type RouterStoreEnum = 'dictionary' | 'statistic' | 'practice' | 'settings' | 'exit';

export type RouterStoreValue = `/${RouterStoreEnum}`;

const routerStore = writable<RouterStoreValue>('/dictionary');

export default routerStore;
