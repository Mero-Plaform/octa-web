
import Dexie, { type Table } from 'dexie';
import type { Word } from '../dictionary/interfaces/Word.js';
import type { SettingsStore } from '../practice/interfaces/settings.js';

export class AppDB extends Dexie {
  dictionary!: Table<Word>;
  practice!: Table<SettingsStore>;

  constructor() {
    super('AppDB');
    this.version(1).stores({
      dictionary: 'id',
      practice: '++id'
    });
  }
}

export const appDB = new AppDB();
