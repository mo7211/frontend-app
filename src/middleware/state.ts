import { User } from "firebase/auth";
import { Building } from "../core/types";

export interface State {
  user: User | null;
  building: string | null;
}

export const initialState: State = {
  user: null,
  building: null,
}