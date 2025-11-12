import type React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Shield, Lightbulb, Target } from 'lucide-react';
import ResponsiveContainer from '../layout/ResponsiveContainer';
import ResponsiveGrid from '../layout/ResponsiveGrid';
import ResponsiveText from '../ui/ResponsiveText';
import ResponsiveButton from '../ui/ResponsiveButton';
import ResponsiveCard from '../ui/ResponsiveCard';
import { useResponsive } from '../../hooks/useResponsive';

// Example component showing how to use the responsive system
export const ResponsiveExample: React.FC = () => {
  const { isMobile, isTablet, currentBreakpoint } = useResponsive();

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

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <ResponsiveContainer size="lg">
        {/* Responsive Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <ResponsiveText
            as="h2"
            size="3xl"
            weight="bold"
            color="primary"
            align="center"
            className="mb-4 sm:mb-6"
          >
            Responsive Design Example
          </ResponsiveText>
          
          <ResponsiveText
            as="p"
            size="lg"
            color="secondary"
            align="center"
            className="max-w-3xl mx-auto"
          >
            This section demonstrates the responsive design system in action.
            Currently viewing on: <strong>{currentBreakpoint}</strong>
          </ResponsiveText>
        </div>

        {/* Responsive Grid */}
        <ResponsiveGrid
          cols={{ 
            xs: 1,    // 1 column on mobile
            sm: 2,    // 2 columns on small screens
            lg: 4     // 4 columns on large screens
          }}
          gap="lg"
          className="mb-8 sm:mb-12"
        >
          {features.map((feature, index) => (
            <ResponsiveCard
              key={index}
              variant="elevated"
              padding="lg"
              hover={true}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={isMobile ? 20 : 24} className="text-blue-600" />
                </div>
                
                <ResponsiveText
                  as="h3"
                  size="lg"
                  weight="semibold"
                  color="primary"
                  className="mb-2 sm:mb-3"
                >
                  {feature.title}
                </ResponsiveText>
                
                <ResponsiveText
                  as="p"
                  size="sm"
                  color="secondary"
                >
                  {feature.description}
                </ResponsiveText>
              </motion.div>
            </ResponsiveCard>
          ))}
        </ResponsiveGrid>

        {/* Responsive Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
          <ResponsiveButton
            variant="primary"
            size={isMobile ? 'md' : 'lg'}
            fullWidth={isMobile}
          >
            Primary Action
          </ResponsiveButton>
          
          <ResponsiveButton
            variant="outline"
            size={isMobile ? 'md' : 'lg'}
            fullWidth={isMobile}
          >
            Secondary Action
          </ResponsiveButton>
        </div>

        {/* Device Info (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <ResponsiveCard
            variant="glass"
            padding="md"
            className="mt-8 sm:mt-12"
          >
            <ResponsiveText as="h4" size="lg" weight="semibold" className="mb-4">
              Responsive Debug Info
            </ResponsiveText>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <strong>Mobile:</strong> {isMobile ? '✅' : '❌'}
              </div>
              <div>
                <strong>Tablet:</strong> {isTablet ? '✅' : '❌'}
              </div>
              <div>
                <strong>Breakpoint:</strong> {currentBreakpoint}
              </div>
              <div>
                <strong>Screen:</strong> {typeof window !== 'undefined' ? `${window.innerWidth}px` : 'SSR'}
              </div>
            </div>
          </ResponsiveCard>
        )}
      </ResponsiveContainer>
    </section>
  );
};

export default ResponsiveExample;