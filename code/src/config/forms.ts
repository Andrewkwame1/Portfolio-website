// Form configuration for Web3Forms integration

export const FORM_CONFIG = {
  // Web3Forms configuration
  WEB3FORMS: {
    API_URL: 'https://api.web3forms.com/submit',
    ACCESS_KEY: process.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE',
  },
  
  // Form validation rules
  VALIDATION: {
    NAME: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 50,
      PATTERN: /^[a-zA-Z\s]+$/,
    },
    EMAIL: {
      PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    SUBJECT: {
      MIN_LENGTH: 5,
      MAX_LENGTH: 100,
    },
    MESSAGE: {
      MIN_LENGTH: 10,
      MAX_LENGTH: 1000,
    },
  },
  
  // Form settings
  SETTINGS: {
    RESET_DELAY: 5000, // 5 seconds
    SUBMISSION_TIMEOUT: 10000, // 10 seconds
  },
} as const;

// Form validation functions
export const validateForm = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  const errors: Record<string, string> = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  } else if (data.name.length < FORM_CONFIG.VALIDATION.NAME.MIN_LENGTH) {
    errors.name = `Name must be at least ${FORM_CONFIG.VALIDATION.NAME.MIN_LENGTH} characters`;
  } else if (data.name.length > FORM_CONFIG.VALIDATION.NAME.MAX_LENGTH) {
    errors.name = `Name must be less than ${FORM_CONFIG.VALIDATION.NAME.MAX_LENGTH} characters`;
  } else if (!FORM_CONFIG.VALIDATION.NAME.PATTERN.test(data.name)) {
    errors.name = 'Name can only contain letters and spaces';
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!FORM_CONFIG.VALIDATION.EMAIL.PATTERN.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Subject validation
  if (!data.subject.trim()) {
    errors.subject = 'Subject is required';
  } else if (data.subject.length < FORM_CONFIG.VALIDATION.SUBJECT.MIN_LENGTH) {
    errors.subject = `Subject must be at least ${FORM_CONFIG.VALIDATION.SUBJECT.MIN_LENGTH} characters`;
  } else if (data.subject.length > FORM_CONFIG.VALIDATION.SUBJECT.MAX_LENGTH) {
    errors.subject = `Subject must be less than ${FORM_CONFIG.VALIDATION.SUBJECT.MAX_LENGTH} characters`;
  }

  // Message validation
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.length < FORM_CONFIG.VALIDATION.MESSAGE.MIN_LENGTH) {
    errors.message = `Message must be at least ${FORM_CONFIG.VALIDATION.MESSAGE.MIN_LENGTH} characters`;
  } else if (data.message.length > FORM_CONFIG.VALIDATION.MESSAGE.MAX_LENGTH) {
    errors.message = `Message must be less than ${FORM_CONFIG.VALIDATION.MESSAGE.MAX_LENGTH} characters`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Sanitize form data
export const sanitizeFormData = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return {
    name: data.name.trim().replace(/\s+/g, ' '),
    email: data.email.trim().toLowerCase(),
    subject: data.subject.trim().replace(/\s+/g, ' '),
    message: data.message.trim(),
  };
};