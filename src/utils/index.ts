import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 10);

export function createId(prefix: string, size = 10) {
  return `${prefix}${nanoid(size)}`;
}

export function arrayMove<T extends any[]>(
  array: T,
  from: number,
  to: number
): T {
  if (from === to) {
    return array;
  }

  const newArray = array.slice() as T;
  newArray.splice(to, 0, newArray.splice(from, 1)[0]);

  return newArray;
}
