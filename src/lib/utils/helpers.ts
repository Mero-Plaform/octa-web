import { InputHardHandler, type ConstructorParams } from './inputHardHandler.js';

export const getIconMaskStyes = (iconSrc: string) => {
  return `-webkit-mask: url(${iconSrc}) no-repeat center / contain; mask: url(${iconSrc}) no-repeat center / contain`;
};

/**
 * shuffle data to new array (not deep copy)
 */
export const shuffle = <T = unknown>(data: T[] | IterableIterator<T>) => [...data].sort(() => Math.random() - 0.5);

export function* createIteratorFromArr<T = unknown>(arr: T[]) {
  const length = arr.length;
  for (let curItemIndex = 0; curItemIndex < length; curItemIndex += 1) {
    yield arr[curItemIndex];
  }
};

export const inputHardHandlerCreator = (params: ConstructorParams) => new InputHardHandler(params);

export const getLearnSuccessPassiveStyles = (learnSuccess: number) => {
  if (learnSuccess === 0) {
    return "bg-slate-400";
  } else if (learnSuccess < 40) {
    return "bg-orange-400";
  } else if (learnSuccess < 75) {
    return "bg-amber-400";
  } else {
    return "bg-green-400";
  }
};

export const getLearnSuccessActiveStyles = (learnSuccess: number) => {
  if (learnSuccess === 0) {
    return "bg-slate-300 hover:bg-slate-400 focus:bg-slate-400";
  } else if (learnSuccess < 40) {
    return "bg-orange-300 hover:bg-orange-400 focus:bg-orange-400";
  } else if (learnSuccess < 75) {
    return "bg-amber-300 hover:bg-amber-400 focus:bg-amber-400";
  } else {
    return "bg-green-300 hover:bg-green-400 focus:bg-green-400";
  }
};
