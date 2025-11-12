import { createContext } from 'react';
import { translations, type Language } from '../i18n/translations';

type TranslationType = typeof translations[Language];

export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationType;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
