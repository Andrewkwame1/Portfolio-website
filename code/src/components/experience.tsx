import type React from 'react';
import { motion } from 'framer-motion';
import { Building, Calendar, CheckCircle } from 'lucide-react';
import type { Experience } from '../types';

interface ExperienceProps {
  experiences: readonly Experience[];
}

const ExperienceComponent: React.FC<ExperienceProps> = ({ experiences }) => {
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
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Building size={16} />
            Professional Experience
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            My Professional Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hands-on experience in food technology, from R&D to quality control,
            working with leading companies in the industry.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200 hidden md:block"></div>

          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex flex-col md:flex-row gap-8"
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full shadow-lg relative z-10">
                  <Building size={24} className="text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {experience.role}
                      </h3>
                      <div className="flex items-center gap-2 text-blue-600 font-semibold mb-2">
                        <Building size={18} />
                        {experience.company}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
                      <Calendar size={16} />
                      <span className="text-sm font-medium">{experience.period}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">
                    {experience.description}
                  </p>

                  {experience.highlights && (
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Achievements:</h4>
                      <div className="grid gap-3">
                        {experience.highlights.map((highlight, highlightIndex) => (
                          <motion.div
                            key={highlightIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: highlightIndex * 0.1 }}
                            className="flex items-start gap-3"
                          >
                            <CheckCircle size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{highlight}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Developed Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Skills Developed Through Experience</h3>
            <p className="text-blue-100 leading-relaxed max-w-3xl mx-auto">
              My professional experience has allowed me to develop a comprehensive skill set
              in food technology, quality control, and product development.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Product Formulation',
              'Quality Control',
              'Regulatory Compliance',
              'Sensory Evaluation',
              'Laboratory Testing',
              'HACCP Implementation',
              'Supplier Management',
              'Process Optimization'
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
              >
                <span className="text-sm font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceComponent;
