import { atomFamily, atomWithStorage } from "jotai/utils";

type IImagePart = {
  id: string;
  count?: number;
};

export const imagePartFamily = atomFamily(
  ({ id, count }: IImagePart) =>
    atomWithStorage(
      id,
      { count: count ?? 0 },
      {
        getItem(key, initialValue) {
          const storedValue = localStorage.getItem(key);
          try {
            return JSON.parse(storedValue ?? "");
          } catch {
            return initialValue;
          }
        },
        setItem(key, value) {
          localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem(key) {
          localStorage.removeItem(key);
        },
      }
    ),
  (a, b) => a.id === b.id
);
