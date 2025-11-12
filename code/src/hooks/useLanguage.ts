import { useContext } from 'react';
import { LanguageContext, type LanguageContextType } from '../context/LanguageContextProvider';

/**
 * Hook to use language context
 * Provides current language, setLanguage function, and translations
 */
export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

/**
 * Hook to get translations object
 * Shorthand for useLanguage().t
 */
export function useTranslation() {
  const { t } = useLanguage();
  return t;
}
