import React, { useState, useEffect } from 'react';
import { LanguageContext, type LanguageContextType } from './LanguageContextProvider';
import { translations, type Language } from '../i18n/translations';

// Get initial language from localStorage or browser locale
function getInitialLanguage(): Language {
  // Try to get from localStorage
  const stored = localStorage.getItem('language');
  if (stored === 'en' || stored === 'es') {
    return stored;
  }

  // Try to detect from browser locale
  const browserLang = navigator.language.split('-')[0];
  if (browserLang === 'es') {
    return 'es';
  }

  return 'en'; // Default to English
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Save language preference to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Set HTML lang attribute for accessibility
    document.documentElement.lang = lang;
  };

  // Initialize HTML lang attribute on mount
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
