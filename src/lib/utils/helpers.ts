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
}

export const inputHardHandlerCreator = (params: ConstructorParams) => new InputHardHandler(params);
