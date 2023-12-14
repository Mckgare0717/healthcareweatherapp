// DarkModeContext.js
import React, { createContext, useContext, useState,useEffect } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode === "dark-theme" ? "light-theme" : "dark-theme"
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme)
  }

  useEffect (() => {
    const storedTheme = localStorage.getItem("theme") || "dark-theme"
    setIsDarkMode(storedTheme)
}, [])

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
