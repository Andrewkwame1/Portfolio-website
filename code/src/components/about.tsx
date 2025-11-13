import type React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Shield, Lightbulb, Target } from 'lucide-react';
import { ResponsiveContainer } from './layout/ResponsiveContainer';
import { ResponsiveGrid } from './layout/ResponsiveGrid';
import { ResponsiveText } from './ui/ResponsiveText';
import { ResponsiveCard } from './ui/ResponsiveCard';
import { ResponsiveImage } from './ui/ResponsiveImage';
import type { ProfileData } from '../types';

interface AboutProps {
  data: ProfileData;
}

const About: React.FC<AboutProps> = ({ data }) => {
  const features = [
    {
      icon: FlaskConical,
      title: 'Product Development',
      description: 'Expertise in research, formulation, and optimization of innovative food products.',
    },
    {
      icon: Shield,
      title: 'Quality & Safety',
      description: 'Comprehensive knowledge of HACCP, food safety protocols, and regulatory compliance.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Focus on sustainable solutions and cutting-edge technologies in food science.',
    },
    {
      icon: Target,
      title: 'Problem Solving',
      description: 'Critical thinking and analytical approach to complex food technology challenges.',
    },
  ];

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
      },
    },
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <ResponsiveContainer>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Target size={16} />
            About Me
          </motion.div>

        </motion.div>

        <ResponsiveGrid cols={{ xs: 1, lg: 2 }} gap="xl" className="items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">My Journey in Food Technology</h2>
              <p className="text-gray-600 leading-relaxed">
                {data.about}
              </p>
              <p className="text-gray-600 leading-relaxed">
                My experience spans from laboratory-scale formulation to pilot plant testing,
                always with a focus on sustainability, safety, and consumer satisfaction.
                I'm particularly passionate about developing innovative packaging solutions
                and implementing comprehensive quality control systems.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ResponsiveGrid cols={{ xs: 1, sm: 2 }} gap="md">
                <ResponsiveCard className="text-center">
                  <ResponsiveText size={{ xs: 'xl', sm: '2xl' }} className="font-bold text-blue-600 mb-2">21</ResponsiveText>
                  <ResponsiveText size="sm" className="text-gray-600">Years Old</ResponsiveText>
                </ResponsiveCard>
                <ResponsiveCard className="text-center">
                  <ResponsiveText size={{ xs: 'xl', sm: '2xl' }} className="font-bold text-blue-600 mb-2">2+</ResponsiveText>
                  <ResponsiveText size="sm" className="text-gray-600">Years Experience</ResponsiveText>
                </ResponsiveCard>
              </ResponsiveGrid>
            </motion.div>
          </motion.div>

          {/* Profile Picture */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex justify-center"
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              {/* Main profile image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto aspect-square max-w-sm">
                <ResponsiveImage
                  src="/profile-picture.jpg"
                  alt="Jihan El Kichouhi Salhi - Food Technology Professional"
                  sizes={{ xs: 256, sm: 288, md: 320 }}
                  className="object-cover w-full h-full"
                  fallbackSrc="/profile-placeholder.svg"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-500 rounded-full opacity-60"></div>
              </div>

              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl opacity-20 -z-10"></div>

              {/* Professional badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <FlaskConical size={16} className="text-blue-600" />
                  <span className="text-sm font-semibold text-gray-900">Food Technologist</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </ResponsiveGrid>

        {/* Features Grid - Moved below the main content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-20"
        >
          <motion.h3 variants={itemVariants} className="text-2xl font-bold text-gray-900 text-center mb-12">
            Core Competencies
          </motion.h3>
          <ResponsiveGrid cols={{ xs: 1, sm: 2, lg: 4 }} gap="md">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <ResponsiveCard className="text-center hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                    <feature.icon size={24} className="text-blue-600" />
                  </div>
                  <ResponsiveText size="lg" className="font-semibold text-gray-900 mb-2">{feature.title}</ResponsiveText>
                  <ResponsiveText size="sm" className="text-gray-600 leading-relaxed">{feature.description}</ResponsiveText>
                </ResponsiveCard>
              </motion.div>
            ))}
          </ResponsiveGrid>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
            <div className="text-4xl mb-4 opacity-50 text-white">"</div>
            <ResponsiveText size={{ xs: 'lg', sm: 'xl' }} className="font-medium mb-4 leading-relaxed text-white">
              Innovation in food technology isn't just about creating new products—it's about
              building a sustainable future where safety, quality, and environmental responsibility
              work hand in hand.
            </ResponsiveText>
            <div className="w-16 h-1 bg-white/30 mx-auto"></div>
          </div>
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
};

export default About;
