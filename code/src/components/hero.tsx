import type React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, LinkedinIcon, FlaskConical } from 'lucide-react';
import { ResponsiveContainer } from './layout/ResponsiveContainer';
import { ResponsiveGrid } from './layout/ResponsiveGrid';
import { ResponsiveText } from './ui/ResponsiveText';
import { ResponsiveButton } from './ui/ResponsiveButton';

import type { ProfileData, SectionId } from '../types';

interface HeroProps {
  data: ProfileData;
  scrollToSection: (sectionId: SectionId) => void;
}

const Hero: React.FC<HeroProps> = ({ data, scrollToSection }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-full blur-3xl" />
      </div>

      <ResponsiveContainer className="relative z-10 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ResponsiveGrid cols={{ xs: 1, lg: 2 }} gap="xl" className="items-center">
            {/* Left Content */}
            <div className="text-white space-y-8">
              <motion.div variants={itemVariants} className="space-y-4">
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm"
                >
                  <FlaskConical size={16} className="text-blue-300" />
                  <span>Food Technology Professional</span>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <ResponsiveText
                    as="h1"
                    size={{ xs: 'xl', sm: '2xl', lg: '3xl' }}
                    className="font-bold leading-tight"
                  >
                    <span className="block text-white">Jihan</span>
                    <span className="block bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                      El Kichouhi Salhi
                    </span>
                  </ResponsiveText>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <ResponsiveText
                    size={{ xs: 'lg', sm: 'xl' }}
                    className="text-blue-100 font-light"
                  >
                    {data.title}
                  </ResponsiveText>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-lg text-blue-200/80 font-medium"
                >
                  {data.tagline}
                </motion.p>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg text-blue-100/90 leading-relaxed max-w-2xl"
              >
                {data.about}
              </motion.p>

              {/* Contact Info */}
              <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex items-center gap-3 text-blue-100">
                  <Mail size={18} className="text-blue-300" />
                  <a
                    href={`mailto:${data.contact.email}`}
                    className="hover:text-white transition-colors duration-300"
                  >
                    {data.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <Phone size={18} className="text-blue-300" />
                  <a
                    href={`tel:${data.contact.phone}`}
                    className="hover:text-white transition-colors duration-300"
                  >
                    {data.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <MapPin size={18} className="text-blue-300" />
                  <span>{data.contact.location}</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <ResponsiveButton
                  size={{ xs: 'md', sm: 'lg' }}
                  onClick={() => scrollToSection('contact')}
                  className="bg-white text-blue-900 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </ResponsiveButton>
                <ResponsiveButton
                  size={{ xs: 'md', sm: 'lg' }}
                  variant="outline"
                  onClick={() => scrollToSection('experience')}
                  className="border-2 border-white/30 text-white backdrop-blur-sm hover:bg-white/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Experience
                </ResponsiveButton>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="flex gap-4">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={data.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                >
                  <LinkedinIcon size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={`mailto:${data.contact.email}`}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                >
                  <Mail size={20} />
                </motion.a>
              </motion.div>
            </div>

            {/* Right Content - Floating Elements */}
            <motion.div className="relative flex items-center justify-center">
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative"
              >
                {/* Main Circle */}
                <div className="w-80 h-80 bg-gradient-to-br from-white/20 to-white/5 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-blue-400/30 to-indigo-400/30 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <FlaskConical size={80} className="text-white/80" />
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [-5, 15, -5],
                    x: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-8 -right-8 w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center"
                >
                  <span className="text-white font-bold text-sm">R&D</span>
                </motion.div>

                <motion.div
                  animate={{
                    y: [10, -10, 10],
                    x: [5, -5, 5],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center"
                >
                  <span className="text-white font-bold text-xs text-center">Quality<br />Control</span>
                </motion.div>

                <motion.div
                  animate={{
                    y: [-8, 8, -8],
                    x: [8, -8, 8],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/2 -left-12 w-12 h-12 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center"
                >
                  <span className="text-white font-bold text-xs">HACCP</span>
                </motion.div>
              </motion.div>
            </motion.div>
          </ResponsiveGrid>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            onClick={() => scrollToSection('about')}
            className="text-white/60 hover:text-white transition-colors duration-300"
          >
            <ChevronDown size={32} />
          </motion.button>
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
};

export default Hero;
