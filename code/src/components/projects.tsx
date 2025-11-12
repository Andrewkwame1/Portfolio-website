import type React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ExternalLink, Leaf, Shield, Beaker, Award } from 'lucide-react';
import type { Project } from '../types';

interface ProjectsProps {
  projects: readonly Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
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
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <Lightbulb size={16} />
            Research & Projects
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Innovative Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Focused on sustainable solutions and cutting-edge technologies
            in food science and packaging innovation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                {/* Project Visual */}
                <div className="lg:col-span-1">
                  <div className="relative">
                    <div className="w-full h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center overflow-hidden">
                      <div className="relative">
                        {/* Central Icon */}
                        <motion.div
                          animate={{
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'easeInOut',
                          }}
                          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Leaf size={32} className="text-white" />
                        </motion.div>

                        {/* Orbiting Elements */}
                        <motion.div
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            duration: 20,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: 'linear',
                          }}
                          className="absolute inset-0 w-40 h-40 -translate-x-10 -translate-y-10"
                        >
                          <div className="absolute top-0 left-1/2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center transform -translate-x-1/2">
                            <Shield size={16} className="text-white" />
                          </div>
                          <div className="absolute bottom-0 left-1/2 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center transform -translate-x-1/2">
                            <Beaker size={16} className="text-white" />
                          </div>
                          <div className="absolute left-0 top-1/2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center transform -translate-y-1/2">
                            <Award size={16} className="text-white" />
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Floating Badge */}
                    <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Final Project
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {project.title}
                    </h3>
                    <div className="text-green-600 font-semibold mb-4">
                      {project.context}
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  {project.technologies && (
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">
                        Key Technologies & Approaches:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project Highlights */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf size={18} className="text-green-600" />
                        <span className="font-semibold text-green-800">Sustainability Focus</span>
                      </div>
                      <p className="text-green-700 text-sm">
                        Developing eco-friendly packaging solutions to reduce environmental impact.
                      </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield size={18} className="text-blue-600" />
                        <span className="font-semibold text-blue-800">Food Safety</span>
                      </div>
                      <p className="text-blue-700 text-sm">
                        Maintaining high food safety and quality standards throughout the process.
                      </p>
                    </div>
                  </div>

                  {/* Action Button */}
                  {project.link && (
                    <div>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
                      >
                        <ExternalLink size={18} />
                        View Project Details
                      </motion.a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Research Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Research Areas of Interest
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Leaf,
                title: 'Sustainable Packaging',
                description: 'Developing biodegradable and eco-friendly packaging solutions for the food industry.',
              },
              {
                icon: Shield,
                title: 'Food Safety Innovation',
                description: 'Advanced safety protocols and quality control systems for food products.',
              },
              {
                icon: Beaker,
                title: 'Product Development',
                description: 'Creating innovative food formulations with enhanced nutritional profiles.',
              },
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <area.icon size={24} className="text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{area.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
