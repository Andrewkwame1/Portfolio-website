import type React from 'react';
import { X } from 'lucide-react';
import type { NavigationItem, SectionId } from '../../types';
import { cn } from '../../utils/classNames';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import '../styles/MobileMenu.css';

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
    <>
      {/* Backdrop - Pure CSS animation */}
      {isOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={onClose}
        />
      )}

      {/* Menu Panel - Pure CSS animation */}
      <div
        className={cn(
          'mobile-menu-panel',
          isOpen && 'mobile-menu-panel--open'
        )}
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
          <p className="text-sm font-medium text-gray-700 text-center mt-4">
            Jihan El Kichouhi Salhi
          </p>
          <p className="text-xs text-gray-600 text-center mt-1">
            Food Technology Professional
          </p>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;