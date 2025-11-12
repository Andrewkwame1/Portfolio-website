import React, { useState, useCallback, useMemo } from 'react';
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

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const scrollY = useScrollPosition();

  // Optimized scroll to section function
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

  // Throttled scroll handler for better performance
  const handleScroll = useThrottle(() => {
    const scrollPosition = scrollY + SCROLL_OFFSET;

    // Use navigationItems for consistent section IDs
    for (const { id } of navigationItems) {
      const element = document.getElementById(id);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(id);
          break;
        }
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
