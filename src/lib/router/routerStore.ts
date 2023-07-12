import { writable } from 'svelte/store';

const routerStore = writable('/dictionary');

export default routerStore;
