# Multi-Language Implementation Guide

## Overview

Your portfolio now supports **Spanish and English** languages with a complete i18n (internationalization) system.

## 📁 Files Created

### 1. **src/i18n/translations.ts**
Contains all translations for English and Spanish:
- Navigation labels
- Section titles and content
- Form labels and messages
- Common UI text

### 2. **src/context/LanguageContext.tsx**
React Context for managing language state:
- `LanguageProvider` - Wraps your app
- `useLanguage()` - Hook to access language and setLanguage
- `useTranslation()` - Hook to get translations

### 3. **src/components/ui/LanguageSwitcher.tsx**
Language switcher button component - add to header!

### 4. **src/app.tsx**
Updated to wrap app with `LanguageProvider`

---

## 🚀 How to Use

### Step 1: Add Language Switcher to Header

Edit `src/components/header.tsx`:

```tsx
import { LanguageSwitcher } from './ui/LanguageSwitcher';

// In the header JSX, add the switcher:
<LanguageSwitcher />
```

### Step 2: Use Translations in Components

**Example: Hero Component**

```tsx
import { useTranslation } from '../context/LanguageContext';

function Hero({ data, scrollToSection }: HeroProps) {
  const t = useTranslation();
  
  return (
    <div>
      <h1>{t.hero.title}</h1>
      <p>{t.hero.tagline}</p>
      <button>{t.hero.cta}</button>
    </div>
  );
}
```

**Example: Navigation**

```tsx
import { useTranslation } from '../context/LanguageContext';

function Header({ navigationItems, scrollToSection }: HeaderProps) {
  const t = useTranslation();
  
  return (
    <nav>
      {navigationItems.map((item) => (
        <a key={item.id} onClick={() => scrollToSection(item.id)}>
          {t.nav[item.id as keyof typeof t.nav] || item.label}
        </a>
      ))}
    </nav>
  );
}
```

### Step 3: Features

✅ **Language Persistence** - Language choice saved to localStorage  
✅ **Browser Detection** - Auto-detects user's language preference  
✅ **Accessibility** - Sets HTML `lang` attribute  
✅ **Type Safe** - Full TypeScript support  
✅ **Context API** - No extra dependencies  

---

## 📝 Translation Structure

```typescript
translations = {
  en: {
    nav: { home, about, experience, ... },
    hero: { title, tagline, cta, ... },
    about: { title, description, ... },
    // ... all sections
  },
  es: {
    nav: { home, about, experience, ... },
    hero: { title, tagline, cta, ... },
    about: { title, description, ... },
    // ... all sections
  }
}
```

---

## 🔧 Adding New Translations

### To add a new phrase:

1. **Edit `src/i18n/translations.ts`**:

```typescript
export const translations = {
  en: {
    mySection: {
      myKey: 'Hello World',
    },
  },
  es: {
    mySection: {
      myKey: 'Hola Mundo',
    },
  },
};
```

2. **Use in component**:

```tsx
const t = useTranslation();
console.log(t.mySection.myKey); // "Hello World" or "Hola Mundo"
```

---

## 💾 Storage

- **Browser localStorage**: Language preference persists across sessions
- **HTML lang attribute**: Set to `en` or `es` for accessibility
- **Default language**: English (if no preference found)
- **Auto-detection**: Detects Spanish if browser locale is Spanish

---

## 🎨 Language Switcher Styling

The switcher shows EN/ES buttons with:
- Active button: Blue background with white text
- Inactive button: Gray background
- Smooth transitions
- Rounded corners

Customize colors in `src/components/ui/LanguageSwitcher.tsx`

---

## 📋 Current Translations Included

### Navigation
- Home, About, Experience, Projects, Skills, Education, Contact

### Hero Section
- Title, Tagline, CTA, Scroll prompt

### About Section
- Title, Description, Key expertise areas

### Experience Section
- Title, "Present" label

### Projects Section
- Title, View Project button, Technologies label, Status labels

### Skills Section
- Title, Category names (Technical, Safety, Soft), Level names

### Education Section
- Title, Labels for degree, institution, period

### Contact Section
- Title, Description, Contact fields, Form labels, Messages

### Footer
- Copyright, Built with information

---

## 🔑 Next Steps

1. **Add LanguageSwitcher to Header** - Import and place in header.tsx
2. **Update Components** - Use `useTranslation()` in each component
3. **Test Languages** - Switch between EN/ES to verify
4. **Add More Translations** - Expand as needed

---

## ✅ Implementation Checklist

- [x] Create translations file
- [x] Create Language Context
- [x] Create Language Switcher component
- [x] Update app.tsx with LanguageProvider
- [ ] Add switcher to header
- [ ] Update hero component
- [ ] Update navigation component
- [ ] Update other components
- [ ] Test language switching
- [ ] Verify localStorage persistence

---

## 🎯 Example Component Updates

### Header Component
```tsx
import { useTranslation } from '../context/LanguageContext';
import { LanguageSwitcher } from './ui/LanguageSwitcher';

const Header: React.FC<HeaderProps> = ({ activeSection, scrollToSection, navigationItems }) => {
  const t = useTranslation();
  
  return (
    <header>
      {/* ... existing code ... */}
      <div className="flex items-center gap-4">
        {/* Navigation */}
        <nav>
          {navigationItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)}>
              {t.nav[item.id as keyof typeof t.nav]}
            </button>
          ))}
        </nav>
        
        {/* Language Switcher */}
        <LanguageSwitcher />
      </div>
    </header>
  );
};
```

### Hero Component
```tsx
import { useTranslation } from '../context/LanguageContext';

const Hero: React.FC<HeroProps> = ({ data, scrollToSection }) => {
  const t = useTranslation();
  
  return (
    <section id="hero">
      <h1>{t.hero.title}</h1>
      <p>{t.hero.tagline}</p>
      <p className="text-subtitle">{data.tagline}</p>
      <button onClick={() => scrollToSection('contact')}>
        {t.hero.cta}
      </button>
      <p className="scroll-hint">{t.hero.scroll}</p>
    </section>
  );
};
```

---

**Multi-Language Support: Ready to Use! 🌍**
