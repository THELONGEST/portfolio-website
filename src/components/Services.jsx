import React from 'react';

const Services = () => {
  return (
    <section id="services" className="section services">
      <div className="section-content">
        <h2 className="section-title">Services</h2>
        <div className="services-grid">
          <div className="service-card">
            <h3>Video Editing</h3>
            <p>Professional video editing with attention to detail</p>
          </div>
          <div className="service-card">
            <h3>Color Grading</h3>
            <p>Expert color correction and grading</p>
          </div>
          <div className="service-card">
            <h3>Motion Graphics</h3>
            <p>Creative motion graphics and animations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services; 