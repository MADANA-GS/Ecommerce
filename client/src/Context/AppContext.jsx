import { createContext } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
const data = 10;

  return <AppContext.Provider value={{data}}>{children}</AppContext.Provider>;
};
