import React, { useState } from 'react';
import PropTypes from 'prop-types';
import VideoModal from './VideoModal';

const PortfolioItem = ({ title, description, thumbnailUrl, videoUrl, embedCode, categories, isVertical = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  // Extract YouTube ID from various formats
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

    const videoId = getYouTubeId(videoUrl);

  const resolvedThumbnail = thumbnailUrl || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '');
  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log("Thumbnail URL:", resolvedThumbnail);

  return (
    <>
      <div 
        className={`portfolio-item ${isVertical ? 'vertical-format' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`View ${title} project`}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        <div className="portfolio-item-image">
          {!isVertical && (
            <img 
              src={resolvedThumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt={title} 
              loading="lazy" 
              width="100%" 
              height="100%" 
            />
          )}
          <div className={`portfolio-item-overlay ${isVertical || isHovered ? 'visible' : ''}`}>
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
        embedCode={embedCode}
        title={title}
        isVertical={isVertical}
      />
    </>
  );
};

PortfolioItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  thumbnailUrl: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
  embedCode: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  isVertical: PropTypes.bool,
};

export default PortfolioItem; 