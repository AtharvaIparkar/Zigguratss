import React from 'react';
import ZigguratsGalleryPage from './components/ZigguratsGalleryPage';

/**
 * ZigguratsGallery - Entry component for the gallery experience.
 * This component is now a single, optimized monolithic component located in
 * src/components/ZigguratsGalleryPage.jsx for easy portability.
 */
export const AntiGravityGallery = (props) => {
  return <ZigguratsGalleryPage {...props} />;
};

const App = () => (
  <div className="min-h-screen relative overflow-hidden bg-black">
    <AntiGravityGallery enableBackground={true} enableParticles={true} />
  </div>
);

export default App;
