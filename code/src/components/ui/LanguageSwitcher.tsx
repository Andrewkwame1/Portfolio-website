import { useLanguage } from '../../hooks/useLanguage';

interface LanguageSwitcherProps {
  variant?: 'default' | 'header' | 'mobile';
}

export function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const isHeaderVariant = variant === 'header';

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-md font-medium transition-all text-xs ${language === 'en'
            ? isHeaderVariant
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-blue-600 text-white shadow-lg'
            : isHeaderVariant
              ? 'text-gray-300 hover:text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        aria-label="Switch to English"
        title="English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('es')}
        className={`px-2.5 py-1 rounded-md font-medium transition-all text-xs ${language === 'es'
            ? isHeaderVariant
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-blue-600 text-white shadow-lg'
            : isHeaderVariant
              ? 'text-gray-300 hover:text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        aria-label="Switch to Spanish"
        title="Español"
      >
        ES
      </button>
    </div>
  );
}
