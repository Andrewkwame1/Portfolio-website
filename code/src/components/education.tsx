import type React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import type { Education } from '../types';

interface EducationProps {
  education: readonly Education[];
}

const EducationComponent: React.FC<EducationProps> = ({ education }) => {
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
    hidden: { x: 50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="education" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <GraduationCap size={16} />
            Education
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Academic Foundation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A strong educational background in food science, technology,
            and scientific principles that supports my professional expertise.
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
          <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-200 via-purple-400 to-purple-200 hidden md:block"></div>

          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex flex-col md:flex-row-reverse gap-8"
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full shadow-lg relative z-10">
                  <GraduationCap size={24} className="text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 shadow-sm border border-purple-100 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {edu.institution}
                      </h3>
                      <div className="flex items-center gap-2 text-purple-600 font-semibold mb-2">
                        <Award size={18} />
                        {edu.degree}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm">
                      <Calendar size={16} />
                      <span className="text-sm font-medium">{edu.period}</span>
                    </div>
                  </div>

                  {edu.description && (
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {edu.description}
                    </p>
                  )}

                  {/* Relevant Coursework or Highlights */}
                  {index === 0 && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <BookOpen size={20} className="text-purple-600" />
                        Key Focus Areas:
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          'Food Science',
                          'Food Safety',
                          'Quality Control',
                          'Product Development',
                          'Microbiology',
                          'Food Chemistry',
                          'Packaging Technology',
                          'Regulatory Compliance',
                          'Sustainability'
                        ].map((subject, subjectIndex) => (
                          <motion.div
                            key={subjectIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: subjectIndex * 0.1 }}
                            className="bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-purple-200 text-sm font-medium text-purple-800 text-center"
                          >
                            {subject}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {index === 1 && (
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        <BookOpen size={20} className="text-purple-600" />
                        Foundation Subjects:
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          'Chemistry',
                          'Biology',
                          'Physics',
                          'Mathematics',
                          'Scientific Method',
                          'Laboratory Techniques'
                        ].map((subject, subjectIndex) => (
                          <motion.div
                            key={subjectIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: subjectIndex * 0.1 }}
                            className="bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-purple-200 text-sm font-medium text-purple-800 text-center"
                          >
                            {subject}
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

        {/* Academic Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Academic Excellence</h3>
            <p className="text-purple-100 leading-relaxed max-w-3xl mx-auto">
              My academic journey has provided me with a solid foundation in food science
              and technology, preparing me for the challenges of the modern food industry.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={24} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Degree in Progress</h4>
              <p className="text-purple-100 text-sm">
                Currently completing my degree in Food Innovation and Safety at UdG
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={24} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Scientific Focus</h4>
              <p className="text-purple-100 text-sm">
                Strong foundation in scientific and technological principles
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} className="text-white" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Practical Application</h4>
              <p className="text-purple-100 text-sm">
                Combining theoretical knowledge with hands-on industry experience
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationComponent;
