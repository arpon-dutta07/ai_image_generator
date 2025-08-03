import React, { useState, useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const aboutRef = useRef(null);

  const features = [
    {
      icon: "🎨",
      title: "AI-Powered Creation",
      description: "Advanced artificial intelligence algorithms create stunning, unique images from your text descriptions.",
      color: "#ff6b6b"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Generate high-quality images in seconds with our optimized AI processing pipeline.",
      color: "#4ecdc4"
    },
    {
      icon: "🎯",
      title: "Precision Control",
      description: "Fine-tune your creations with detailed prompts and style specifications.",
      color: "#45b7d1"
    },
    {
      icon: "🌟",
      title: "Unlimited Creativity",
      description: "No limits on imagination - create anything from realistic photos to abstract art.",
      color: "#96ceb4"
    },
    {
      icon: "📱",
      title: "Cross-Platform",
      description: "Works seamlessly across all devices - desktop, tablet, and mobile.",
      color: "#ffeaa7"
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "Your creations are private and secure. We don't store or share your images.",
      color: "#fd79a8"
    }
  ];

  const stats = [
    { number: "1M+", label: "Images Generated", icon: "🖼️" },
    { number: "50K+", label: "Happy Users", icon: "😊" },
    { number: "99.9%", label: "Uptime", icon: "⚡" },
    { number: "24/7", label: "Available", icon: "🌍" }
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

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="about-section" id="about" ref={aboutRef}>
      <div className="about-container">
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
          <div className="floating-triangle triangle-1"></div>
          <div className="floating-triangle triangle-2"></div>
        </div>

        {/* About Header */}
        <div className={`about-header ${isVisible ? 'animate' : ''}`}>
          <h2 className="about-title">
            <span className="title-word" data-text="About">About</span>
            <span className="title-word" data-text="AI Studio">AI Studio</span>
          </h2>
          <p className="about-subtitle">
            Revolutionizing creativity with cutting-edge artificial intelligence
          </p>
        </div>

        {/* Hero Content */}
        <div className={`about-hero ${isVisible ? 'animate' : ''}`}>
          <div className="hero-content">
            <div className="hero-text">
              <h3 className="hero-heading">
                Transform Your <span className="gradient-text">Imagination</span> Into Reality
              </h3>
              <p className="hero-description">
                Our AI Image Generator harnesses the power of advanced machine learning to create 
                breathtaking visuals from simple text descriptions. Whether you're an artist, 
                designer, or creative enthusiast, unlock unlimited possibilities with AI-powered creativity.
              </p>
              <div className="hero-highlights">
                <div className="highlight-item">
                  <span className="highlight-icon">✨</span>
                  <span>Unlimited generations</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">🎨</span>
                  <span>Multiple art styles</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-icon">⚡</span>
                  <span>Instant results</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-container">
                <div className="rotating-ring ring-1"></div>
                <div className="rotating-ring ring-2"></div>
                <div className="rotating-ring ring-3"></div>
                <div className="center-orb">
                  <span className="orb-icon">🤖</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`features-section ${isVisible ? 'animate' : ''}`}>
          <h3 className="features-title">Why Choose AI Studio?</h3>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card ${activeFeature === index ? 'active' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-glow" style={{ background: feature.color }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className={`stats-section ${isVisible ? 'animate' : ''}`}>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="stat-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className={`mission-section ${isVisible ? 'animate' : ''}`}>
          <div className="mission-content">
            <h3 className="mission-title">Our Mission</h3>
            <p className="mission-text">
              To democratize creativity by making advanced AI image generation accessible to everyone. 
              We believe that every person has unique creative vision, and our technology serves as 
              the bridge between imagination and reality.
            </p>
            <div className="mission-values">
              <div className="value-item">
                <span className="value-icon">🌟</span>
                <span>Innovation</span>
              </div>
              <div className="value-item">
                <span className="value-icon">🤝</span>
                <span>Accessibility</span>
              </div>
              <div className="value-item">
                <span className="value-icon">🎨</span>
                <span>Creativity</span>
              </div>
              <div className="value-item">
                <span className="value-icon">🔮</span>
                <span>Future</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;