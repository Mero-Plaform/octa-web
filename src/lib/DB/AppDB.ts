
import Dexie, { type Table } from 'dexie';
import type { Word } from '../dictionary/interfaces/Word.js';

export class AppDB extends Dexie {
  dictionary!: Table<Word>;

  constructor() {
    super('AppDB');
    this.version(1).stores({
      dictionary: 'id'
    });
  }
}

export const appDB = new AppDB();
