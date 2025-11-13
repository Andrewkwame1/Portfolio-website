import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import Header from './components/header';
import Hero from './components/hero';
import About from './components/about';
import Experience from './components/experience';
import Projects from './components/projects';
import Education from './components/education';
import Skills from './components/skills';
import Contact from './components/contact';
import Footer from './components/footer';
import { profileData, navigationItems } from './data/profileData';
import { useScrollPosition, useThrottle } from './utils/performance';
import { SCROLL_OFFSET } from './utils/constants';
import { LanguageProvider } from './context/LanguageContext';
import type { SectionId } from './types';

// Cache for section positions to avoid forced reflows
interface SectionCache {
  [key: string]: { top: number; bottom: number };
}

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [sectionCache, setSectionCache] = useState<SectionCache>({});
  const scrollY = useScrollPosition();
  const cacheUpdateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize section cache on mount and resize
  const updateSectionCache = useCallback(() => {
    // Use requestAnimationFrame to batch DOM reads
    if (cacheUpdateTimeoutRef.current) {
      clearTimeout(cacheUpdateTimeoutRef.current);
    }

    cacheUpdateTimeoutRef.current = setTimeout(() => {
      const newCache: SectionCache = {};

      // Read all offsetTop/offsetHeight in one batch to minimize reflows
      navigationItems.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          newCache[id] = {
            top: element.offsetTop,
            bottom: element.offsetTop + element.offsetHeight
          };
        }
      });

      setSectionCache(newCache);
    }, 0);
  }, []);

  // Initialize cache on mount
  useEffect(() => {
    updateSectionCache();
  }, [updateSectionCache]);

  // Update cache on resize (debounced)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateSectionCache, 500);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
      if (cacheUpdateTimeoutRef.current) clearTimeout(cacheUpdateTimeoutRef.current);
    };
  }, [updateSectionCache]);

  // Optimized scroll to section function - uses cached values
  const scrollToSection = useCallback((sectionId: SectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - SCROLL_OFFSET;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }, []);

  // Throttled scroll handler using cached section positions
  const handleScroll = useThrottle(() => {
    const scrollPosition = scrollY + SCROLL_OFFSET;

    // Use cached values to avoid forced reflows
    for (const { id } of navigationItems) {
      const section = sectionCache[id];
      if (section && scrollPosition >= section.top && scrollPosition < section.bottom) {
        setActiveSection(id);
        break;
      }
    }
  }, 16);

  // Update active section when scroll position changes
  React.useEffect(() => {
    handleScroll();
  }, [scrollY, handleScroll]);

  // Memoize static data to prevent unnecessary re-renders
  const memoizedData = useMemo(() => ({
    profile: profileData,
    navigation: navigationItems,
  }), []);

  return (
    <LanguageProvider>
      <div className="App">
        <Header
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          navigationItems={memoizedData.navigation}
        />
        <Hero
          data={memoizedData.profile}
          scrollToSection={scrollToSection}
        />
        <About
          data={memoizedData.profile}
        />
        <Experience
          experiences={memoizedData.profile.experiences}
        />
        <Projects
          projects={memoizedData.profile.projects}
        />
        <Education
          education={memoizedData.profile.education}
        />
        <Skills />
        <Contact
          contact={memoizedData.profile.contact}
        />
        <Footer
          name={memoizedData.profile.name}
          contact={memoizedData.profile.contact}
        />
      </div>
    </LanguageProvider>
  );
}

export default App;
