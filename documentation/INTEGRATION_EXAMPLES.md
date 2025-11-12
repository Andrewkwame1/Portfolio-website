# 🔧 Integration Examples - Multi-Language

## Complete Examples for Common Components

---

## 1️⃣ Header with Language Switcher

```typescript
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useTranslation } from '../hooks/useLanguage';
import { LanguageSwitcher } from './ui/LanguageSwitcher';
import type { SectionId, NavigationItem } from '../types';

interface HeaderProps {
  activeSection: SectionId;
  scrollToSection: (sectionId: SectionId) => void;
  navigationItems: readonly NavigationItem[];
}

export default function Header({ 
  activeSection, 
  scrollToSection, 
  navigationItems 
}: HeaderProps) {
  const t = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="text-xl font-bold text-blue-600"
          >
            JE
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {/* Use translations for nav labels */}
                {t.nav[item.id as keyof typeof t.nav] || item.label}
              </button>
            ))}
          </nav>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </motion.header>
  );
}
```

---

## 2️⃣ Hero Section

```typescript
import { motion } from 'framer-motion';
import { useTranslation } from '../hooks/useLanguage';
import type { ProfileData, SectionId } from '../types';

interface HeroProps {
  data: ProfileData;
  scrollToSection: (sectionId: SectionId) => void;
}

export default function Hero({ data, scrollToSection }: HeroProps) {
  const t = useTranslation();

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          {t.hero.title}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {t.hero.tagline}
        </p>
        <button
          onClick={() => scrollToSection('contact')}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {t.hero.cta}
        </button>
        <p className="text-gray-500 mt-12">
          {t.hero.scroll}
        </p>
      </motion.div>
    </section>
  );
}
```

---

## 3️⃣ About Section

```typescript
import { useTranslation } from '../hooks/useLanguage';
import type { ProfileData } from '../types';

interface AboutProps {
  data: ProfileData;
}

export default function About({ data }: AboutProps) {
  const t = useTranslation();

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">
          {t.about.title}
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          {t.about.description}
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              {t.about.highlights.title}
            </h3>
            <ul className="space-y-2">
              {t.about.highlights.items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 4️⃣ Experience Section

```typescript
import { useTranslation } from '../hooks/useLanguage';
import type { Experience } from '../types';

interface ExperienceProps {
  experiences: readonly Experience[];
}

export default function Experience({ experiences }: ExperienceProps) {
  const t = useTranslation();

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">
          {t.experience.title}
        </h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="border-l-4 border-blue-600 pl-6">
              <h3 className="text-2xl font-semibold">{exp.role}</h3>
              <p className="text-lg text-blue-600">{exp.company}</p>
              <p className="text-gray-500">
                {exp.period.includes('-') 
                  ? exp.period.replace('Present', t.experience.present)
                  : exp.period
                }
              </p>
              <p className="text-gray-600 mt-2">{exp.description}</p>
              <ul className="mt-4 space-y-1">
                {exp.highlights.map((highlight, index) => (
                  <li key={index} className="text-gray-600">
                    • {highlight}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 5️⃣ Skills Section

```typescript
import { useTranslation } from '../hooks/useLanguage';
import type { Skill } from '../types';

interface SkillsProps {
  skills?: readonly Skill[];
}

export default function Skills({ skills = [] }: SkillsProps) {
  const t = useTranslation();

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      const category = skill.category as keyof typeof t.skills.categories;
      if (!acc[category]) acc[category] = [];
      acc[category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>
  );

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">
          {t.skills.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4">
                {t.skills.categories[category as keyof typeof t.skills.categories]}
              </h3>
              <div className="space-y-3">
                {categorySkills.map((skill) => (
                  <div key={skill.name}>
                    <p className="font-medium">{skill.name}</p>
                    <p className="text-sm text-gray-500">
                      {t.skills.levels[skill.level as keyof typeof t.skills.levels]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 6️⃣ Contact Section

```typescript
import { useState } from 'react';
import { useTranslation } from '../hooks/useLanguage';
import type { Contact } from '../types';

interface ContactProps {
  contact: Contact;
}

export default function Contact({ contact }: ContactProps) {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert(t.contact.form.success);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">
          {t.contact.title}
        </h2>
        <p className="text-center text-gray-600 mb-12">
          {t.contact.description}
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="font-semibold">{t.contact.email}</p>
            <a href={`mailto:${contact.email}`} className="text-blue-600 hover:underline">
              {contact.email}
            </a>
          </div>
          <div>
            <p className="font-semibold">{t.contact.phone}</p>
            <a href={`tel:${contact.phone}`} className="text-blue-600 hover:underline">
              {contact.phone}
            </a>
          </div>
          <div>
            <p className="font-semibold">{t.contact.location}</p>
            <p className="text-gray-600">{contact.location}</p>
          </div>
          <div>
            <p className="font-semibold">{t.contact.linkedin}</p>
            <a href={contact.linkedin} className="text-blue-600 hover:underline">
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow">
          <div className="mb-4">
            <label className="block font-medium mb-2">
              {t.contact.form.name}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">
              {t.contact.form.email}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block font-medium mb-2">
              {t.contact.form.message}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full border rounded px-3 py-2 h-32"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {t.contact.form.submit}
          </button>
        </form>
      </div>
    </section>
  );
}
```

---

## 7️⃣ Footer Section

```typescript
import { useTranslation } from '../hooks/useLanguage';
import type { Contact } from '../types';

interface FooterProps {
  name: string;
  contact: Contact;
}

export default function Footer({ name, contact }: FooterProps) {
  const t = useTranslation();

  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <p className="mb-2">
          {t.footer.copyright}
        </p>
        <p className="text-gray-400">
          {t.footer.builtwith}
        </p>
      </div>
    </footer>
  );
}
```

---

## 📋 Key Points

✅ **Always import `useTranslation()`** at top of component  
✅ **Use `t.section.key`** to access translations  
✅ **Text automatically updates** when language changes  
✅ **No refresh needed** - all instant  
✅ **Type-safe** - autocomplete suggests valid keys  

---

## 🎯 Pattern to Follow

```typescript
// 1. Import hook
import { useTranslation } from '../hooks/useLanguage';

// 2. Call hook in component
const t = useTranslation();

// 3. Use translations
<h1>{t.section.title}</h1>
<p>{t.section.description}</p>
<button>{t.section.buttonText}</button>
```

**That's the entire pattern!**

---

**Ready to implement? Start with the Header component!** 🚀
