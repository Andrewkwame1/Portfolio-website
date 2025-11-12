// Multi-language translation strings for English and Spanish
export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      education: 'Education',
      contact: 'Contact',
    },
    
    // Hero Section
    hero: {
      title: 'Food Technology Professional',
      tagline: 'Innovating sustainable solutions in food science and packaging technology',
      cta: 'Get in Touch',
      scroll: 'Scroll to explore',
    },
    
    // About Section
    about: {
      title: 'About Me',
      description: 'I am a passionate food technologist with hands-on experience in R&D and quality control. My expertise spans product development, food safety protocols, and sustainable packaging solutions. I\'m committed to advancing food innovation while maintaining the highest standards of safety and quality.',
      highlights: {
        title: 'Key Expertise Areas',
        items: [
          'Food Product Development',
          'Quality & Safety Management',
          'Sustainable Packaging Solutions',
          'HACCP Systems Implementation',
        ],
      },
    },
    
    // Experience Section
    experience: {
      title: 'Professional Experience',
      present: 'Present',
    },
    
    // Projects Section
    projects: {
      title: 'Featured Projects',
      viewProject: 'View Project',
      technologies: 'Technologies',
      status: {
        completed: 'Completed',
        ongoing: 'Ongoing',
      },
    },
    
    // Skills Section
    skills: {
      title: 'Skills & Expertise',
      categories: {
        technical: 'Technical Skills',
        safety: 'Safety & Compliance',
        soft: 'Soft Skills',
      },
      levels: {
        beginner: 'Beginner',
        intermediate: 'Intermediate',
        advanced: 'Advanced',
        expert: 'Expert',
      },
    },
    
    // Education Section
    education: {
      title: 'Education',
      degree: 'Degree',
      institution: 'Institution',
      period: 'Period',
    },
    
    // Contact Section
    contact: {
      title: 'Let\'s Connect',
      description: 'Feel free to reach out for opportunities, collaborations, or just to chat about food technology!',
      email: 'Email',
      phone: 'Phone',
      location: 'Location',
      linkedin: 'LinkedIn',
      sendMessage: 'Send Message',
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        submit: 'Send',
        success: 'Message sent successfully!',
        error: 'Error sending message. Please try again.',
      },
    },
    
    // Footer
    footer: {
      copyright: '© 2025 Jihan El Kichouhi Salhi. All rights reserved.',
      builtwith: 'Built with React, TypeScript, and Tailwind CSS',
    },
    
    // Common
    common: {
      loading: 'Loading...',
      error: 'Error',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      years: 'years',
    },
  },
  
  es: {
    // Navegación
    nav: {
      home: 'Inicio',
      about: 'Acerca de mí',
      experience: 'Experiencia',
      projects: 'Proyectos',
      skills: 'Habilidades',
      education: 'Educación',
      contact: 'Contacto',
    },
    
    // Sección Hero
    hero: {
      title: 'Profesional en Tecnología de Alimentos',
      tagline: 'Innovando soluciones sostenibles en ciencia de alimentos y tecnología de empaque',
      cta: 'Ponte en Contacto',
      scroll: 'Desplázate para explorar',
    },
    
    // Sección About
    about: {
      title: 'Acerca de mí',
      description: 'Soy una tecnóloga de alimentos apasionada con experiencia práctica en I+D y control de calidad. Mi experiencia abarca desarrollo de productos, protocolos de seguridad alimentaria y soluciones de empaque sostenible. Estoy comprometida con el avance de la innovación alimentaria manteniendo los más altos estándares de seguridad y calidad.',
      highlights: {
        title: 'Áreas de Especialidad',
        items: [
          'Desarrollo de Productos Alimentarios',
          'Gestión de Calidad y Seguridad',
          'Soluciones de Empaque Sostenible',
          'Implementación de Sistemas HACCP',
        ],
      },
    },
    
    // Sección Experience
    experience: {
      title: 'Experiencia Profesional',
      present: 'Presente',
    },
    
    // Sección Projects
    projects: {
      title: 'Proyectos Destacados',
      viewProject: 'Ver Proyecto',
      technologies: 'Tecnologías',
      status: {
        completed: 'Completado',
        ongoing: 'En Curso',
      },
    },
    
    // Sección Skills
    skills: {
      title: 'Habilidades y Experiencia',
      categories: {
        technical: 'Habilidades Técnicas',
        safety: 'Seguridad y Cumplimiento',
        soft: 'Habilidades Blandas',
      },
      levels: {
        beginner: 'Principiante',
        intermediate: 'Intermedio',
        advanced: 'Avanzado',
        expert: 'Experto',
      },
    },
    
    // Sección Education
    education: {
      title: 'Educación',
      degree: 'Título',
      institution: 'Institución',
      period: 'Período',
    },
    
    // Sección Contact
    contact: {
      title: 'Conectemos',
      description: '¡Siéntete libre de comunicarte para oportunidades, colaboraciones o simplemente para charlar sobre tecnología de alimentos!',
      email: 'Correo',
      phone: 'Teléfono',
      location: 'Ubicación',
      linkedin: 'LinkedIn',
      sendMessage: 'Enviar Mensaje',
      form: {
        name: 'Nombre',
        email: 'Correo',
        message: 'Mensaje',
        submit: 'Enviar',
        success: '¡Mensaje enviado exitosamente!',
        error: 'Error al enviar el mensaje. Por favor, intenta de nuevo.',
      },
    },
    
    // Footer
    footer: {
      copyright: '© 2025 Jihan El Kichouhi Salhi. Todos los derechos reservados.',
      builtwith: 'Construido con React, TypeScript y Tailwind CSS',
    },
    
    // Común
    common: {
      loading: 'Cargando...',
      error: 'Error',
      back: 'Atrás',
      next: 'Siguiente',
      previous: 'Anterior',
      years: 'años',
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.en;
