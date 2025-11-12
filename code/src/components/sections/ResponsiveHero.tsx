import type React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin, LinkedinIcon, FlaskConical } from 'lucide-react';
import type { ProfileData, SectionId } from '../../types';
import ResponsiveContainer from '../layout/ResponsiveContainer';
import ResponsiveGrid from '../layout/ResponsiveGrid';
import ResponsiveText from '../ui/ResponsiveText';
import ResponsiveButton from '../ui/ResponsiveButton';
import ResponsiveCard from '../ui/ResponsiveCard';
import { useResponsive } from '../../hooks/useResponsive';

interface ResponsiveHeroProps {
  data: ProfileData;
  scrollToSection: (sectionId: SectionId) => void;
}

export const ResponsiveHero: React.FC<ResponsiveHeroProps> = ({ data, scrollToSection }) => {
  const { isMobile, isTablet } = useResponsive();

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
        ease: "easeOut",
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
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center overflow-hidden safe-area-inset"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-indigo-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-blue-400/5 to-indigo-400/5 rounded-full blur-3xl" />
      </div>

      <ResponsiveContainer className="relative z-10 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ResponsiveGrid
            cols={{ xs: 1, lg: 2 }}
            gap="lg"
            className="items-center"
          >
            {/* Left Content */}
            <div className="text-white space-y-6 sm:space-y-8 order-2 lg:order-1">
              <motion.div variants={itemVariants} className="space-y-4">
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm"
                >
                  <FlaskConical size={isMobile ? 14 : 16} className="text-blue-300" />
                  <span>Food Technology Professional</span>
                </motion.div>

                <ResponsiveText
                  as="h1"
                  size="4xl"
                  weight="bold"
                  color="white"
                  className="leading-tight"
                >
                  <span className="block">Jihan</span>
                  <span className="block bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                    El Kichouhi Salhi
                  </span>
                </ResponsiveText>

                <ResponsiveText
                  as="p"
                  size="xl"
                  color="white"
                  className="text-blue-100 font-light"
                >
                  {data.title}
                </ResponsiveText>

                <ResponsiveText
                  as="p"
                  size="lg"
                  color="white"
                  className="text-blue-200/80 font-medium"
                >
                  {data.tagline}
                </ResponsiveText>
              </motion.div>

              <motion.div variants={itemVariants}>
                <ResponsiveText
                  as="p"
                  size="lg"
                  color="white"
                  className="text-blue-100/90 leading-relaxed max-w-2xl"
                >
                  {data.about}
                </ResponsiveText>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={itemVariants} className="space-y-3">
                <div className="flex items-center gap-3 text-blue-100">
                  <Mail size={18} className="text-blue-300 flex-shrink-0" />
                  <a
                    href={`mailto:${data.contact.email}`}
                    className="hover:text-white transition-colors duration-300 break-all"
                  >
                    {data.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <Phone size={18} className="text-blue-300 flex-shrink-0" />
                  <a
                    href={`tel:${data.contact.phone}`}
                    className="hover:text-white transition-colors duration-300"
                  >
                    {data.contact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <MapPin size={18} className="text-blue-300 flex-shrink-0" />
                  <span>{data.contact.location}</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <ResponsiveButton
                  variant="primary"
                  size={isMobile ? 'md' : 'lg'}
                  onClick={() => scrollToSection('contact')}
                  className="bg-white text-blue-900 hover:bg-gray-100"
                >
                  Get In Touch
                </ResponsiveButton>
                <ResponsiveButton
                  variant="outline"
                  size={isMobile ? 'md' : 'lg'}
                  onClick={() => scrollToSection('experience')}
                  className="border-white/30 text-white hover:bg-white/10"
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
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={20} />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={`mailto:${data.contact.email}`}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300"
                  aria-label="Send Email"
                >
                  <Mail size={20} />
                </motion.a>
              </motion.div>
            </div>

            {/* Right Content - Floating Elements */}
            <div className="relative flex items-center justify-center order-1 lg:order-2 mb-8 lg:mb-0">
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative"
              >
                {/* Main Circle - Responsive sizing */}
                <ResponsiveCard
                  variant="glass"
                  padding="none"
                  className={`${
                    isMobile ? 'w-64 h-64' : isTablet ? 'w-72 h-72' : 'w-80 h-80'
                  } rounded-full flex items-center justify-center`}
                >
                  <ResponsiveCard
                    variant="glass"
                    padding="none"
                    className={`${
                      isMobile ? 'w-48 h-48' : isTablet ? 'w-56 h-56' : 'w-64 h-64'
                    } rounded-full flex items-center justify-center bg-gradient-to-br from-blue-400/30 to-indigo-400/30`}
                  >
                    <FlaskConical size={isMobile ? 60 : 80} className="text-white/80" />
                  </ResponsiveCard>
                </ResponsiveCard>

                {/* Floating Elements - Responsive positioning */}
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
                  className={`absolute ${
                    isMobile ? '-top-6 -right-6 w-12 h-12' : '-top-8 -right-8 w-16 h-16'
                  } bg-white/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center`}
                >
                  <span className={`text-white font-bold ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    R&D
                  </span>
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
                  className={`absolute ${
                    isMobile ? '-bottom-4 -left-4 w-16 h-16' : '-bottom-6 -left-6 w-20 h-20'
                  } bg-white/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center`}
                >
                  <span className={`text-white font-bold ${isMobile ? 'text-xs' : 'text-xs'} text-center leading-tight`}>
                    Quality<br />Control
                  </span>
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
                  className={`absolute top-1/2 ${
                    isMobile ? '-left-8 w-10 h-10' : '-left-12 w-12 h-12'
                  } bg-white/20 rounded-full backdrop-blur-sm border border-white/30 flex items-center justify-center transform -translate-y-1/2`}
                >
                  <span className={`text-white font-bold ${isMobile ? 'text-xs' : 'text-xs'}`}>
                    HACCP
                  </span>
                </motion.div>
              </motion.div>

              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl opacity-20 -z-10" />
            </div>
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
            className="text-white/60 hover:text-white transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
            aria-label="Scroll to about section"
          >
            <ChevronDown size={isMobile ? 28 : 32} />
          </motion.button>
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
};

export default ResponsiveHero;