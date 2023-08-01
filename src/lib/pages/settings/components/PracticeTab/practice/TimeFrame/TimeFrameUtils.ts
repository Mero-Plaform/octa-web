import type { TimeFrame } from '../../../../../statistic/interfaces/TimeFrame.js';

export const errVariants = {
  invalid: "Time frame is invalid",
  overlap: "Time frame is overlapping",
} as const;

/**
  * returns timeFrameIndex if there is an overlap and -1 otherwise
  */
export const checkTimeFramesOverlap = ({ from: newFrom, to: newTo, timeFrames }: TimeFrame & { timeFrames: TimeFrame[]; }) =>
  timeFrames.findIndex(({ from, to }) =>
    (newFrom >= from && newFrom <= to) ||
      (newTo <= from && newTo >= to) ||
      (newFrom >= from && newTo <= to) ||
      (newFrom <= from && newTo >= to)
      ? true
      : false
  );

/**
 * returns true if timeFrame is valid, otherwise returns false
 */
export const checkTimeFrameValid = ({ from: newFrom, to: newTo }: TimeFrame) =>
  newFrom >= newTo ? false : true;
