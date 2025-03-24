import React, { lazy, Suspense } from 'react';

const PortfolioItem = lazy(() => import('./PortfolioItem'));

const Shorts = () => {
  const shortsItems = [
    {
      title: "Urban Life Short",
      description: "Fast-paced urban lifestyle capture",
      thumbnailUrl: "https://i.ytimg.com/vi_webp/example1/mqdefault.webp",
      videoUrl: "https://www.youtube.com/shorts/RiOqgmmcSvc?feature=share",
      categories: ["Urban", "Lifestyle", "Short"]
    },
    {
      title: "Nature Moments",
      description: "Breathtaking nature in 60 seconds",
      thumbnailUrl: "https://i.ytimg.com/vi_webp/example2/mqdefault.webp",
      videoUrl: "https://www.youtube.com/shorts/example2",
      categories: ["Nature", "Quick", "Beautiful"]
    },
    {
      title: "Product Showcase",
      description: "Quick product highlight reel",
      thumbnailUrl: "https://i.ytimg.com/vi_webp/example3/mqdefault.webp",
      videoUrl: "https://www.youtube.com/shorts/example3",
      categories: ["Product", "Commercial", "Short"]
    },
    {
      title: "Creative Transition",
      description: "Innovative transition techniques showcase",
      thumbnailUrl: "https://i.ytimg.com/vi_webp/example4/mqdefault.webp",
      videoUrl: "https://www.youtube.com/shorts/example4",
      categories: ["Creative", "Transitions", "Effects"]
    }
  ];

  return (
    <section id="shorts" className="section shorts">
      <div className="section-content">
        <h2 className="section-title">YouTube Shorts</h2>
        <p className="section-description">Vertical videos for quick, engaging content</p>
        
        <div className="featured-tagline">
          <span className="tagline-text">Big impact in small moments</span>
        </div>
        
        <div className="shorts-grid">
          <Suspense fallback={<div className="loading-placeholder">Loading shorts...</div>}>
            {shortsItems.map((item, index) => (
              <PortfolioItem
                key={index}
                title={item.title}
                description={item.description}
                thumbnailUrl={item.thumbnailUrl}
                videoUrl={item.videoUrl}
                categories={item.categories}
                isVertical={true}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Shorts; 