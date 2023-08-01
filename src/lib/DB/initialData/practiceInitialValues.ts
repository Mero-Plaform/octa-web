import { cloneObject } from '../../utils/helpers.js';

const practiceInitialValues = {
  practiceTarget: "original",
  practiceType: "section",
  sectionLastWordId: null,
  sectionSize: 10,
} as const;

export const getPracticeInitialValues = () => cloneObject(practiceInitialValues);
