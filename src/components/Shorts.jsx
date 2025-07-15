import React, { lazy, Suspense } from 'react';

const PortfolioItem = lazy(() => import('./PortfolioItem'));

const Shorts = () => {
  const shortsItems = [
    {
      title: "Health Influencer Short",
   
      
     thumbnailUrl: "https://img.youtube.com/vi/R9ZgfDvcn4M/0.jpg",  // Pattern 1
     //https://img.youtube.com/vi/${videoId}/hqdefault.jpg
    // OR
      videoUrl: "https://www.youtube.com/shorts/R9ZgfDvcn4M?feature=share",
      categories: [ "Lifestyle", "Short"]
    },
    {
      title: "Ali Abdaal Short",
      description: "Breathtaking nature in 60 seconds",
      thumbnailUrl: "https://i.ytimg.com/vi_webp/example2/mqdefault.webp",
      videoUrl: "https://www.youtube.com/shorts/g9vYvf9zP7M",
      categories: ["Natural", "Educational",    ]
    },
    {
      title: "Cryto UI",
      description: "Quick product highlight reel",
      
      videoUrl: "https://www.youtube.com/shorts/Azis35a40Z0",
      categories: ["Product", "Commercial", "Short"]
    },
    {
      title: "Dan Koe Short",
      description: "Innovative transition techniques showcase",
      thumbnailUrl: "https://i.ytimg.com/vi_webp/example4/mqdefault.webp",
      videoUrl: "https://www.youtube.com/shorts/mkPfUR5xmgI",
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