import React, { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext<any>({});

export const ContextWrapper = ({ children }) => {
  const [isDosen, setIsDosen] = useState(false);
  const [studentClass, setStudentClass] = useState("");
  const [userData, setUserData] = useState({});
  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        isDosen,
        setIsDosen,
        studentClass,
        setStudentClass,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
