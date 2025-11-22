import type { TokensArraySchemaType, UserDataSchemaType } from "../../core/schemas";



export interface AppContextType {
  user: UserDataSchemaType | null;
  setUserData: () => void;
  signOut: () => void;
}
