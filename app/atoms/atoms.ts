import { atom } from "recoil";

export interface userAtom {
  username: string;
}

export const userAtom = atom<userAtom>({
  key: "user",
  default: { username: "" },
});
