import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import type { SectionId, NavigationItem } from '../types';
import MobileMenu from './navigation/MobileMenu';
import { LanguageSwitcher } from './ui/LanguageSwitcher';
import { cn } from '../utils/classNames';

interface HeaderProps {
  activeSection: SectionId;
  scrollToSection: (sectionId: SectionId) => void;
  navigationItems: readonly NavigationItem[];
}

const Header: React.FC<HeaderProps> = ({ activeSection, scrollToSection, navigationItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel pending RAF if exists
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Use RAF to batch scroll updates and reduce input delay
      rafIdRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  const handleNavClick = (sectionId: SectionId) => {
    // Defer scrolling to reduce processing duration
    requestAnimationFrame(() => {
      scrollToSection(sectionId);
      setIsMobileMenuOpen(false);
    });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        // White background on small devices always
        isScrolled || window.innerWidth < 768
          ? 'bg-white shadow-lg'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-shrink-0"
          >
            <button
              onClick={() => scrollToSection('hero')}
              className={`text-xl font-bold transition-colors duration-300 ${isScrolled || window.innerWidth < 768
                ? 'text-blue-600'
                : 'text-white'
                }`}
            >
              JE
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative ${activeSection === item.id
                    ? 'text-blue-600'
                    : isScrolled
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'text-white/80 hover:text-white'
                  }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 transform-gpu" />
                )}
              </button>
            ))}
            <LanguageSwitcher />
          </nav>

          {/* Mobile menu button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={cn(
              'md:hidden p-2 rounded-md transition-colors duration-300 min-h-[44px] min-w-[44px]',
              isScrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />
    </motion.header>
  );
};

export default Header;
