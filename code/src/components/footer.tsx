import type React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, LinkedinIcon, ArrowUp } from 'lucide-react';
import type { Contact } from '../types';

interface FooterProps {
  name: string;
  contact: Contact;
}

const Footer: React.FC<FooterProps> = ({ name, contact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h4 className="text-2xl font-bold">{name}</h4>
            <p className="text-gray-400 leading-relaxed">
              Food Technologist passionate about innovation, sustainability,
              and quality in the food industry.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href={`mailto:${contact.email}`}
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                aria-label="Send email"
                title="Send email"
              >
                <Mail size={18} />
              </motion.a>
              {contact.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                  aria-label="Visit LinkedIn profile"
                  title="Connect on LinkedIn"
                >
                  <LinkedinIcon size={18} />
                </motion.a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Experience', href: '#experience' },
                { name: 'Projects', href: '#projects' },
                { name: 'Education', href: '#education' },
                { name: 'Skills', href: '#skills' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <motion.a
                  key={link.name}
                  whileHover={{ x: 5 }}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={16} />
                <span>{contact.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={16} />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={16} />
                <span>{contact.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <span>&copy; {new Date().getFullYear()} {name}. All rights reserved.</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full transition-colors duration-300"
            >
              <ArrowUp size={16} />
              Back to Top
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;