import { writable } from 'svelte/store';

const routerStore = writable('/');

export default routerStore;
