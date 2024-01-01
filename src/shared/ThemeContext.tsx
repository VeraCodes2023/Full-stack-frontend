import React, { createContext, useContext, useState } from 'react';
const ThemeContext = createContext({theme:"", toggleTheme:()=>{}});

export const useTheme = (): { theme: string; toggleTheme: () => void } => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }:{ children:React.ReactNode }) => {
    const [theme, setTheme] = useState('light'); 
  
    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
  
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };