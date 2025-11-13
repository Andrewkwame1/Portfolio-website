import type React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  LinkedinIcon,
  MessageCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import type { Contact } from '../types';
import { processFormData, formRateLimiter, createHoneypot, secureLog } from '../utils/security';

interface ContactProps {
  contact: Contact;
}

const ContactComponent: React.FC<ContactProps> = ({ contact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '' // Honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Security checks
      // Check honeypot (bot detection)
      if (formData.website) {
        secureLog('Bot detected via honeypot');
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      // Rate limiting
      if (!formRateLimiter.isAllowed(formData.email)) {
        secureLog('Rate limit exceeded', { email: formData.email });
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      // Process and validate form data
      const processedData = processFormData({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      });

      // Create FormData for Web3Forms
      const formDataToSubmit = new FormData();

      // Add processed form fields
      formDataToSubmit.append("name", processedData.name);
      formDataToSubmit.append("email", processedData.email);
      formDataToSubmit.append("subject", processedData.subject);
      formDataToSubmit.append("message", processedData.message);

      // Add Web3Forms configuration
      formDataToSubmit.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "b7f70e46-c81d-4849-9c6e-369d145386d4");
      formDataToSubmit.append("from_name", "Portfolio Contact Form");
      formDataToSubmit.append("replyto", processedData.email);

      // Add security metadata
      formDataToSubmit.append("redirect", "false");
      formDataToSubmit.append("botcheck", "");

      // Convert to JSON for API
      const object = Object.fromEntries(formDataToSubmit);
      const json = JSON.stringify(object);

      // Submit to Web3Forms with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
        secureLog('Form submitted successfully');

        // Reset status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        secureLog('Form submission failed', result);
        setSubmitStatus('error');

        // Reset error status after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      secureLog('Form submission error', error);
      setSubmitStatus('error');

      // Reset error status after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 text-sm font-medium mb-4">
            <MessageCircle size={16} />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Let's Connect
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            I'm interested in opportunities in food technology, product development,
            and quality control. Let's discuss how we can work together.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-16"
        >
          {/* Contact Information */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
                    >
                      {contact.email}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-green-600 hover:text-green-700 transition-colors duration-300"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Location</div>
                    <div className="text-gray-600">{contact.location}</div>
                  </div>
                </motion.div>

                {contact.linkedin && (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <LinkedinIcon size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">LinkedIn</div>
                      <a
                        href={contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 transition-colors duration-300"
                      >
                        Connect on LinkedIn
                      </a>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Quick Actions</h4>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`mailto:${contact.email}?subject=Professional Opportunity`}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors duration-300"
                >
                  <Mail size={16} />
                  Send Email
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full font-medium hover:bg-green-700 transition-colors duration-300"
                >
                  <Phone size={16} />
                  Call Now
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Send a Message
              </h3>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                noValidate
                aria-label="Contact form"
              >
                {/* Honeypot field for bot detection */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  style={createHoneypot().style}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-label="Website (hidden honeypot field)"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Name <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      autoComplete="name"
                      aria-describedby="name-help"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500" aria-label="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      autoComplete="email"
                      aria-describedby="email-help"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    autoComplete="off"
                    aria-describedby="subject-help"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    autoComplete="off"
                    aria-describedby="message-help"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  aria-describedby={submitStatus === 'success' ? 'success-message' : submitStatus === 'error' ? 'error-message' : undefined}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : submitStatus === 'success'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    id="success-message"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    aria-live="polite"
                    className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-xl border border-green-200"
                  >
                    <CheckCircle size={20} aria-hidden="true" />
                    <span>Thank you! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    id="error-message"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="alert"
                    aria-live="assertive"
                    className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-xl border border-red-200"
                  >
                    <AlertCircle size={20} aria-hidden="true" />
                    <span>Something went wrong. Please try again.</span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactComponent;
