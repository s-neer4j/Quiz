import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// A simple interpolation function
const interpolate = (str: string, params: Record<string, string | number>): string => {
  return Object.entries(params).reduce((acc, [key, value]) => {
    const regex = new RegExp(`{${key}}`, 'g');
    return acc.replace(regex, String(value));
  }, str);
};

type TranslateFunction = (key: string, params?: Record<string, string | number>) => string;

interface LocalizationContextType {
  t: TranslateFunction;
  language: string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};

interface LocalizationProviderProps {
  children: ReactNode;
}

export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({ children }) => {
  const [translations, setTranslations] = useState<Record<string, any> | null>(null);
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`);
        if (!response.ok) {
          throw new Error(`Could not load ${language} translations`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Failed to fetch translations:', error);
        // Fallback to English if the user's language file is not found
        if (language !== 'en') {
          setLanguage('en');
        }
      }
    };

    fetchTranslations();
  }, [language]);

  const t: TranslateFunction = useCallback((key, params) => {
    if (!translations) {
      return key; // Return key if translations are not loaded
    }
    const keyParts = key.split('.');
    let value: any = translations;
    for (const part of keyParts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part];
      } else {
        return key; // Return key if not found
      }
    }

    if (typeof value === 'string') {
        return params ? interpolate(value, params) : value;
    }

    return key; // Return key if the found value is not a string
  }, [translations]);

  if (!translations) {
    // You could return a loading spinner here
    return null;
  }

  return (
    <LocalizationContext.Provider value={{ t, language }}>
      {children}
    </LocalizationContext.Provider>
  );
};
