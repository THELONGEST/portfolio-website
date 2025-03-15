import React, { useState } from 'react';
import PropTypes from 'prop-types';
import VideoModal from './VideoModal';

const PortfolioItem = ({ title, description, thumbnailUrl, videoUrl, categories }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className="portfolio-item"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`View ${title} project`}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        <div className="portfolio-item-image">
          <img 
            src={thumbnailUrl} 
            alt={title} 
            loading="lazy" 
            width="100%" 
            height="100%" 
          />
          <div className={`portfolio-item-overlay ${isHovered ? 'visible' : ''}`}>
            <div className="portfolio-item-content">
              <h3>{title}</h3>
              <p>{description}</p>
              <div className="categories">
                {categories.map((category, index) => (
                  <span key={index} className="category-tag">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        videoUrl={videoUrl}
        title={title}
      />
    </>
  );
};

PortfolioItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default PortfolioItem; 