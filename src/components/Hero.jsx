import React from 'react';

const Hero = () => {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-wrapper">
        <h1 className="hero-title">Creative Video Editor</h1>
        <p className="hero-subtitle">Transforming ideas into compelling visual stories</p>
        <a href="#portfolio" className="primary-button" onClick={scrollToPortfolio}>
          View My Work
        </a>
      </div>
      <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="mouse"></div>
      </div>
    </section>
  );
};

export default Hero; 