import type { Word } from '../../dictionary/interfaces/Word.js';

export type PracticeTarget = "original" | "translation";
export type PracticeType = "random" | "worst" | "section";
export type SectionSize = number;
export type SectionLastWordId = Word["id"] | null;

export type SettingsStore = {
  sectionLastWordId: SectionLastWordId;
  sectionSize: SectionSize;
  practiceTarget: PracticeTarget;
  practiceType: PracticeType;
};
