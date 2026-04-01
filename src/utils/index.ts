import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 10);

export function createId(prefix: string, size = 10) {
  return `${prefix}${nanoid(size)}`;
}
