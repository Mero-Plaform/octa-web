export type PracticeTarget = "original" | "translation";
export type PracticeType = "random" | "worst" | "section";
export type SectionSize = number;
export type LastSectionWordIndex = number;

export type SettingsStore = {
  lastSectionWordIndex: LastSectionWordIndex;
  sectionSize: SectionSize;
  practiceTarget: PracticeTarget;
  practiceType: PracticeType;
};
