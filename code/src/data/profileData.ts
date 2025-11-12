import type { ProfileData } from '../types';

// Optimized data structure with better performance characteristics
export const profileData: ProfileData = {
  name: "Jihan El Kichouhi Salhi",
  title: "Food Technology Professional",
  tagline: "Innovating sustainable solutions in food science and packaging technology",
  about: "I am a passionate food technologist with hands-on experience in R&D and quality control. My expertise spans product development, food safety protocols, and sustainable packaging solutions. I'm committed to advancing food innovation while maintaining the highest standards of safety and quality.",
  contact: {
    email: "jihan.elkichouhi@example.com",
    phone: "+34 (123) 456-7890",
    location: "Girona, Spain",
    linkedin: "https://linkedin.com/in/jihan-elkichouhi"
  },
  experiences: [
    {
      id: "exp-1",
      role: "R&D Food Technologist",
      company: "Innovative Foods S.L.",
      period: "2023 - Present",
      startDate: new Date("2023-01-01"),
      description: "Leading research and development initiatives for sustainable food packaging and product innovation.",
      highlights: [
        "Developed eco-friendly packaging solutions reducing environmental impact by 35%",
        "Led cross-functional teams in product formulation and testing",
        "Implemented HACCP protocols improving food safety compliance by 40%",
        "Conducted sensory evaluation studies for new product launches"
      ]
    },
    {
      id: "exp-2",
      role: "Quality Control Specialist",
      company: "Mediterranean Food Group",
      period: "2022 - 2023",
      startDate: new Date("2022-06-01"),
      endDate: new Date("2023-01-01"),
      description: "Ensured product quality and safety through comprehensive testing and analysis protocols.",
      highlights: [
        "Established quality control procedures for multiple product lines",
        "Reduced product defects by 25% through improved testing protocols",
        "Collaborated with suppliers to maintain ingredient quality standards",
        "Trained junior staff on laboratory procedures and safety protocols"
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Sustainable Packaging Innovation",
      context: "Final Degree Project",
      description: "Development of biodegradable packaging materials for food products, focusing on extending shelf life while reducing environmental impact. The project involved extensive research into bio-based polymers and their application in food packaging.",
      technologies: ["Biodegradable Polymers", "Food Safety Testing", "Shelf Life Analysis", "Sustainability Assessment"],
      link: "https://github.com/jihan/sustainable-packaging",
      featured: true,
      status: "completed"
    },
    {
      id: "proj-2",
      title: "HACCP Implementation System",
      context: "Professional Project",
      description: "Designed and implemented a comprehensive HACCP system for a mid-sized food processing facility, including hazard analysis, critical control points identification, and monitoring procedures.",
      technologies: ["HACCP Principles", "Risk Assessment", "Quality Management", "Regulatory Compliance"],
      featured: true,
      status: "completed"
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "University of Girona (UdG)",
      period: "2021 - 2025",
      degree: "Bachelor's Degree in Food Innovation and Safety",
      description: "Comprehensive program covering food science, technology, safety, and innovation. Focus on sustainable practices and modern food processing techniques.",
      honors: ["Dean's List", "Research Excellence Award"]
    },
    {
      id: "edu-2",
      institution: "Institut Científic i Tecnològic",
      period: "2019 - 2021",
      degree: "Higher Technician in Food Science and Technology",
      description: "Technical foundation in food science principles, laboratory techniques, and quality control procedures."
    }
  ],
  skills: [
    // Technical Skills
    { name: "Product Development", category: "technical", level: "advanced", years: 3 },
    { name: "Food Safety Analysis", category: "technical", level: "expert", years: 4 },
    { name: "HACCP Implementation", category: "safety", level: "advanced", years: 2 },
    { name: "Quality Control", category: "safety", level: "expert", years: 3 },
    { name: "Laboratory Testing", category: "technical", level: "advanced", years: 4 },
    { name: "Packaging Technology", category: "technical", level: "advanced", years: 2 },
    { name: "Sensory Evaluation", category: "technical", level: "intermediate", years: 2 },
    { name: "Regulatory Compliance", category: "safety", level: "advanced", years: 2 },
    { name: "Sustainability Assessment", category: "technical", level: "intermediate", years: 1 },
    { name: "Microbiology", category: "technical", level: "advanced", years: 3 },
    
    // Soft Skills
    { name: "Problem Solving", category: "soft", level: "expert" },
    { name: "Critical Thinking", category: "soft", level: "advanced" },
    { name: "Research Methodology", category: "soft", level: "advanced" },
    { name: "Team Leadership", category: "soft", level: "intermediate" },
    { name: "Project Management", category: "soft", level: "intermediate" },
    
    // Languages
    { name: "Spanish", category: "language", level: "expert" },
    { name: "English", category: "language", level: "advanced" },
    { name: "French", category: "language", level: "intermediate" },
    { name: "Arabic", category: "language", level: "intermediate" }
  ],
  languages: ["Spanish (Native)", "English (Advanced)", "French (Intermediate)", "Arabic (Intermediate)"]
} as const;

// Navigation configuration for better performance
export const navigationItems = [
  { id: 'hero' as const, label: 'Home' },
  { id: 'about' as const, label: 'About' },
  { id: 'experience' as const, label: 'Experience' },
  { id: 'projects' as const, label: 'Projects' },
  { id: 'education' as const, label: 'Education' },
  { id: 'skills' as const, label: 'Skills' },
  { id: 'contact' as const, label: 'Contact' },
] as const;

// Skill categories for filtering
export const skillCategories = {
  technical: {
    title: 'Technical Skills',
    color: 'blue',
    skills: profileData.skills.filter(skill => skill.category === 'technical')
  },
  safety: {
    title: 'Safety & Quality',
    color: 'green',
    skills: profileData.skills.filter(skill => skill.category === 'safety')
  },
  soft: {
    title: 'Soft Skills',
    color: 'purple',
    skills: profileData.skills.filter(skill => skill.category === 'soft')
  },
  language: {
    title: 'Languages',
    color: 'orange',
    skills: profileData.skills.filter(skill => skill.category === 'language')
  }
} as const;
