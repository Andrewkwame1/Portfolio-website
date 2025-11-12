import type React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  FlaskConical,
  Shield,
  CheckCircle,
  Users,
  Brain,
  Target,
} from 'lucide-react';
import { skillCategories } from '../data/profileData';

// No props needed for this component
const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'technical' | 'safety' | 'soft'>('technical');

  // Use imported skill categories with icons
  const categoriesWithIcons = {
    technical: {
      ...skillCategories.technical,
      icon: FlaskConical,
    },
    safety: {
      ...skillCategories.safety,
      icon: Shield,
    },
    soft: {
      ...skillCategories.soft,
      icon: Brain,
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
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

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-200',
        hover: 'hover:bg-blue-200',
        gradient: 'from-blue-600 to-blue-700'
      },
      green: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-200',
        hover: 'hover:bg-green-200',
        gradient: 'from-green-600 to-green-700'
      },
      purple: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        border: 'border-purple-200',
        hover: 'hover:bg-purple-200',
        gradient: 'from-purple-600 to-purple-700'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Zap size={16} />
            Skills & Expertise
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Technical Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive skill set developed through education and
            hands-on experience in the food technology industry.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            {Object.entries(categoriesWithIcons).map(([key, category]) => {
              const Icon = category.icon;
              const isActive = activeCategory === key;
              const colors = getColorClasses(category.color);

              return (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(key as 'technical' | 'safety' | 'soft')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${isActive
                    ? `bg-gradient-to-r ${colors.gradient} text-white shadow-lg`
                    : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  <Icon size={20} />
                  {category.title}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {categoriesWithIcons[activeCategory].skills.map((skill) => {
            const colors = getColorClasses(categoriesWithIcons[activeCategory].color);

            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-white p-6 rounded-xl border-2 ${colors.border} ${colors.hover} transition-all duration-300 shadow-sm hover:shadow-lg`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${colors.bg} rounded-full flex items-center justify-center`}>
                      <CheckCircle size={20} className={colors.text} />
                    </div>
                    <span className="font-semibold text-gray-900">{skill.name}</span>
                  </div>
                  {skill.years && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {skill.years}y
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${colors.bg.replace('bg-', 'bg-').replace('-100', '-500')}`}
                      style={{
                        width: skill.level === 'expert' ? '100%' :
                          skill.level === 'advanced' ? '80%' :
                            skill.level === 'intermediate' ? '60%' : '40%'
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 capitalize">{skill.level}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Professional Competencies</h3>
            <p className="text-blue-100 leading-relaxed max-w-3xl mx-auto">
              My diverse skill set enables me to contribute effectively across all aspects
              of food technology, from research and development to quality assurance and regulatory compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: FlaskConical,
                title: 'R&D Excellence',
                description: 'Innovation in product development and formulation'
              },
              {
                icon: Shield,
                title: 'Quality Assurance',
                description: 'Comprehensive safety and quality protocols'
              },
              {
                icon: Target,
                title: 'Problem Solving',
                description: 'Analytical thinking and practical solutions'
              },
              {
                icon: Users,
                title: 'Team Collaboration',
                description: 'Effective communication and teamwork'
              }
            ].map((competency, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <competency.icon size={24} className="text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{competency.title}</h4>
                <p className="text-blue-100 text-sm">{competency.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
