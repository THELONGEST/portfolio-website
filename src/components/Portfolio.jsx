import React, { lazy, Suspense } from 'react';

const PortfolioItem = lazy(() => import('./PortfolioItem'));

const Portfolio = () => {
  const portfolioItems = [
    {
      title: "Cinematic Wedding Film",
      description: "A beautiful wedding story captured in a cinematic style",
      thumbnailUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      categories: ["Wedding", "Cinematic", "Story"]
    },
    {
      title: "Corporate Brand Video",
      description: "Modern corporate brand video with dynamic transitions",
      thumbnailUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
      videoUrl: "https://vimeo.com/76979871",
      categories: ["Corporate", "Branding", "Commercial"]
    },
    {
      title: "Music Video Production",
      description: "Creative music video with artistic visuals",
      thumbnailUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
      videoUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk",
      categories: ["Music", "Creative", "Artistic"]
    },
    {
      title: "Travel Documentary",
      description: "Exploring beautiful destinations and cultures",
      thumbnailUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
      videoUrl: "https://vimeo.com/281744427",
      categories: ["Travel", "Documentary", "Adventure"]
    }
  ];

  return (
    <section id="portfolio" className="section portfolio">
      <div className="section-content">
        <h2 className="section-title">Featured Projects</h2>
        <div className="portfolio-grid">
          <Suspense fallback={<div className="loading-placeholder">Loading projects...</div>}>
            {portfolioItems.map((item, index) => (
              <PortfolioItem
                key={index}
                title={item.title}
                description={item.description}
                thumbnailUrl={item.thumbnailUrl}
                videoUrl={item.videoUrl}
                categories={item.categories}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Portfolio; 