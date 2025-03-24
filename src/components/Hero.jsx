import React from 'react';

const Hero = () => {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-wrapper">
        <h1 className="hero-title glow-text">Creative Video Editor</h1>
        <p className="hero-subtitle glow-text">Transforming ideas into compelling visual stories</p>
        <div className="hero-buttons">
          <a href="#portfolio" className="primary-button" onClick={scrollToPortfolio}>
            View My Work
          </a>
          <a href="#contact" className="secondary-button" onClick={scrollToContact}>
            Contact Me
          </a>
        </div>
      </div>
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="mouse"></div>
      </div>
    </section>
  );
};

export default Hero; 