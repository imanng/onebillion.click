import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const selectedPartAtom = atom<string | null>(null);

export const totalClicksAtom = atomWithStorage("totalClicks", 0);
