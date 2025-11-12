import type React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { NavigationItem, SectionId } from '../../types';
import { cn } from '../../utils/classNames';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationItems: readonly NavigationItem[];
  activeSection: SectionId;
  onNavigate: (sectionId: SectionId) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigationItems,
  activeSection,
  onNavigate,
}) => {
  const handleNavClick = (sectionId: SectionId) => {
    onNavigate(sectionId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label="Close menu"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="p-6">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.id} className="">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={cn(
                        'w-full text-left px-4 py-3 rounded-xl font-medium transition-colors duration-200',
                        activeSection === item.id
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
              <LanguageSwitcher />
              <p className="text-sm text-gray-500 text-center mt-4">
                Jihan El Kichouhi Salhi
              </p>
              <p className="text-xs text-gray-400 text-center mt-1">
                Food Technology Professional
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;