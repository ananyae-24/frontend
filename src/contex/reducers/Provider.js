import React, { createContext, useReducer } from "react";
import gameReducer from "./game";
import gameinit from "../initialstate/game";
export const GlobalContext = createContext({});
const GlobalProvider = ({ children }) => {
  const [gameState, gameDispatch] = useReducer(gameReducer, gameinit);
  return (
    <GlobalContext.Provider value={{ gameState, gameDispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
