
import { createContext, useContext, useState } from 'react';

interface ThemeClasses {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  input: string;
}

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  themeClasses: ThemeClasses;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  const themeClasses = {
    background: darkMode ? 'bg-gray-900' : 'bg-gray-50',
    card: darkMode ? 'bg-gray-800' : 'bg-white',
    text: darkMode ? 'text-gray-100' : 'text-gray-800',
    textSecondary: darkMode ? 'text-gray-400' : 'text-gray-500',
    border: darkMode ? 'border-gray-700' : 'border-gray-200',
    input: darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300',
  };

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, themeClasses }}>
      <div className={`${themeClasses.background} ${themeClasses.text} min-h-screen`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
