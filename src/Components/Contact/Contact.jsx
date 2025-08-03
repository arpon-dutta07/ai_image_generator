import React, { useState, useRef, useEffect } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef(null);

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Us',
      description: 'Get in touch via email',
      contact: 'hello@aistudio.com',
      color: '#ff6b6b'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      description: '24/7 support available',
      contact: 'Start Chat',
      color: '#4ecdc4'
    },
    {
      icon: '📱',
      title: 'Call Us',
      description: 'Speak with our team',
      contact: '+1 (555) 123-4567',
      color: '#45b7d1'
    },
    {
      icon: '📍',
      title: 'Visit Us',
      description: 'Our headquarters',
      contact: 'San Francisco, CA',
      color: '#96ceb4'
    }
  ];

  const socialLinks = [
    { icon: '🐦', name: 'Twitter', url: '#', color: '#1da1f2' },
    { icon: '📘', name: 'Facebook', url: '#', color: '#4267b2' },
    { icon: '📷', name: 'Instagram', url: '#', color: '#e4405f' },
    { icon: '💼', name: 'LinkedIn', url: '#', color: '#0077b5' },
    { icon: '💻', name: 'GitHub', url: '#', color: '#333' },
    { icon: '💬', name: 'Discord', url: '#', color: '#7289da' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact" ref={contactRef}>
      <div className="contact-container">
        {/* Animated Background */}
        <div className="contact-background">
          <div className="bg-orb orb-1"></div>
          <div className="bg-orb orb-2"></div>
          <div className="bg-orb orb-3"></div>
          <div className="bg-wave wave-1"></div>
          <div className="bg-wave wave-2"></div>
        </div>

        {/* Contact Header */}
        <div className={`contact-header ${isVisible ? 'animate' : ''}`}>
          <h2 className="contact-title">
            <span className="title-word">Get</span>
            <span className="title-word">In</span>
            <span className="title-word">Touch</span>
          </h2>
          <p className="contact-subtitle">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Methods */}
        <div className={`contact-methods ${isVisible ? 'animate' : ''}`}>
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="method-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="method-icon" style={{ color: method.color }}>
                {method.icon}
              </div>
              <h3 className="method-title">{method.title}</h3>
              <p className="method-description">{method.description}</p>
              <div className="method-contact" style={{ color: method.color }}>
                {method.contact}
              </div>
              <div className="method-glow" style={{ background: method.color }}></div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className={`contact-form-section ${isVisible ? 'animate' : ''}`}>
          <div className="form-container">
            <div className="form-header">
              <h3 className="form-title">Send us a Message</h3>
              <p className="form-subtitle">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Your full name"
                    required
                  />
                  <div className="input-glow"></div>
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="your.email@example.com"
                    required
                  />
                  <div className="input-glow"></div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="What's this about?"
                  required
                />
                <div className="input-glow"></div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                  required
                ></textarea>
                <div className="input-glow"></div>
              </div>

              <button
                type="submit"
                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="btn-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">🚀</span>
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="status-message success">
                  <span className="status-icon">✅</span>
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="status-message error">
                  <span className="status-icon">❌</span>
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className={`social-section ${isVisible ? 'animate' : ''}`}>
          <h3 className="social-title">Follow Us</h3>
          <p className="social-subtitle">Stay connected and get the latest updates</p>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="social-link"
                style={{ animationDelay: `${index * 0.1}s` }}
                title={social.name}
              >
                <span className="social-icon">{social.icon}</span>
                <span className="social-name">{social.name}</span>
                <div className="social-glow" style={{ background: social.color }}></div>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className={`faq-section ${isVisible ? 'animate' : ''}`}>
          <h3 className="faq-title">Frequently Asked Questions</h3>
          <div className="faq-grid">
            <div className="faq-item">
              <h4 className="faq-question">How does AI image generation work?</h4>
              <p className="faq-answer">Our AI uses advanced machine learning models trained on millions of images to understand and create new visuals based on your text descriptions.</p>
            </div>
            <div className="faq-item">
              <h4 className="faq-question">Is there a limit to how many images I can generate?</h4>
              <p className="faq-answer">No! Generate as many images as you want. Our service is completely free with no daily limits or restrictions.</p>
            </div>
            <div className="faq-item">
              <h4 className="faq-question">Can I use the generated images commercially?</h4>
              <p className="faq-answer">Yes, all images generated through our platform can be used for both personal and commercial purposes without any restrictions.</p>
            </div>
            <div className="faq-item">
              <h4 className="faq-question">How long does it take to generate an image?</h4>
              <p className="faq-answer">Most images are generated within 5-15 seconds, depending on the complexity of your prompt and current server load.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;