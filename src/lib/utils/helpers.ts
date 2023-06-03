export const getIconMaskStyes = (iconSrc: string) => {
  return `-webkit-mask: url(${iconSrc}) no-repeat center / contain; mask: url(${iconSrc}) no-repeat center / contain`;
};

export const shuffleArr = <T = unknown>(arr: T[] | IterableIterator<T>) => [...arr].sort(() => Math.random() - 0.5);
