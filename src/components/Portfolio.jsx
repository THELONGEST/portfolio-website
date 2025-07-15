import React, { lazy, Suspense } from 'react';
import { portfolioItems } from '../data/portfolioData';

const PortfolioItem = lazy(() => import('./PortfolioItem'));

// const Portfolio = () => {
//   // Group items by their first category
//   const groupedItems = portfolioItems.reduce((groups, item) => {
//     const mainCategory = item.categories[0];
//     if (!groups[mainCategory]) {
//       groups[mainCategory] = [];
//     }
//     groups[mainCategory].push(item);
//     return groups;
//   }, {});

  // Turn on the add sections
  // const sectionOrder = ['Featured', 'Gaming',  'Vlog', 'Review', 'Documentary', 'Video Essay', 'Corporate'];

  // return (
  //   <section id="portfolio" className="section portfolio">
  //     <div className="section-content">
  //       <h2 className="section-title">Featured Projects</h2>
        
  //       {sectionOrder.map((sectionName) => {
  //         const items = groupedItems[sectionName];
  //         if (!items || items.length === 0) return null;

  //         return (
  //           <div key={sectionName } className="portfolio-section">
  //             {sectionName !== 'Featured' && (
  //               <h3 className="portfolio-section-title">{sectionName}</h3>
  //             )}
  //             <div className="portfolio-grid">
  //               <Suspense fallback={<div className="loading-placeholder">Loading projects...</div>}>
  //                 {items.map((item, index) => (
  //                   <PortfolioItem
  //                     key={index}
  //                     title={item.title}
  //                     description={item.description}
  //                     thumbnailUrl={item.thumbnailUrl}
  //                     videoUrl={item.videoUrl}
  //                     embedCode={item.embedCode}
  //                     categories={item.categories}
  //                   />
  //                 ))}
  //               </Suspense>
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </section>
  // );

  const Portfolio = () => {
  return (
    <section id="portfolio" className="section portfolio">
      <div className="section-content">
        <h2 className="section-title">Featured Projects</h2> {/* Or a more general title */}
        
        {/* All portfolio items will now render in a single, continuous grid */}
        <div className="portfolio-grid">
          <Suspense fallback={<div className="loading-placeholder">Loading projects...</div>}>
            {portfolioItems.map((item, index) => (
              <PortfolioItem
                key={index} // Consider using a unique ID from 'item' if available, instead of 'index'
                title={item.title}
                description={item.description}
                thumbnailUrl={item.thumbnailUrl}
                videoUrl={item.videoUrl}
                embedCode={item.embedCode}
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