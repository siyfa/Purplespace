import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { isPersistedState } from "../apiCalls";

const sessionState = isPersistedState("user");
const INITIAL_STATE = {
  user: sessionState || null,
  loading: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
