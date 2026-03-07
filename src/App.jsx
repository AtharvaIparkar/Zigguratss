import React, { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import {
  AntiGravityContainer,
  ParticleSystem,
  MagneticField,
  InfiniteCarousel
} from './components/AntiGravity';

// Import extracted data
import { ARTWORKS, CATEGORIES } from './data/artworks';

// Lazy load heavy components
const WallPreviewPanel = lazy(() => import('./components/AntiGravity/WallPreviewPanel').then(m => ({ default: m.WallPreviewPanel })));
const DynamicBackground = lazy(() => import('./components/AntiGravity/DynamicBackground').then(m => ({ default: m.DynamicBackground })));

// Loading component for Suspense
const ComponentLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-8 h-8 border-2 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
  </div>
);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0, duration: 0.2 }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 }
  }
};

export const AntiGravityGallery = ({ enableBackground = false, enableParticles = false }) => {
  const [activeCategory, setActiveCategory] = useState('figurative');
  const [hoveredArtwork, setHoveredArtwork] = useState(null);

  // Memoize filtered artworks for performance
  const filteredArtworks = useMemo(() => {
    return ARTWORKS.filter(art => {
      const categoryId = art.category.toLowerCase().replace(/\s+/g, '-');
      return categoryId === activeCategory;
    });
  }, [activeCategory]);

  // Memoize hover handler
  const handleHoverStart = useCallback((artwork) => {
    setHoveredArtwork(artwork);
  }, []);

  const activeCategoryData = useMemo(() =>
    CATEGORIES.find(c => c.id === activeCategory),
    [activeCategory]
  );

  return (
    <section className="relative py-8 sm:py-12 md:py-16 min-h-screen overflow-hidden bg-black">
      {/* Optional animated background - Lazy Loaded */}
      <Suspense fallback={null}>
        {enableBackground && <DynamicBackground />}
      </Suspense>

      {/* Optional particle system - restored to full golden experience */}
      {enableParticles && (
        <ParticleSystem
          particleCount={80}
          types={['dust', 'star', 'orb']}
        />
      )}

      <div className="w-[95vw] sm:max-w-[90vw] mx-auto relative z-10 px-3 sm:px-4">
        {/* Enhanced Header with elegant serif typography */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Main heading with elegant bold serif font */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold tracking-normal mb-4 sm:mb-6 text-white px-4"
            style={{ letterSpacing: '-0.02em' }}
          >
            Artworks as per Style
          </h1>

          {/* Small caps subtitle */}
          <motion.p
            className="text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 px-4"
            style={{ color: '#C9A04B' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Artworks we offer as per their style!
          </motion.p>
        </motion.div>

        {/* Enhanced Category Filter Pills with Magnetic Field */}
        <MagneticField strength={0.15} radius={80}>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-5 mb-12 sm:mb-16 px-2 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {CATEGORIES.map((cat, index) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden ${isActive
                      ? 'text-white shadow-xl scale-105'
                      : 'text-zinc-400 hover:text-zinc-200 glass hover:scale-105'
                    }`}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  style={isActive ? { boxShadow: `0 10px 40px ${cat.glowColor}` } : {}}
                >
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${cat.gradient}`}
                      layoutId="activeCategory"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}

                  <span className="relative flex items-center gap-2 z-10">
                    <Icon className="w-4 h-4" />
                    {cat.name}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </MagneticField>
      </div>

      {/* Gallery Grid - Full Width */}
      <div className="w-full relative z-10 w-screen max-w-[100vw] overflow-hidden">
        <AntiGravityContainer>
          <InfiniteCarousel
            artworks={filteredArtworks}
            activeCategory={activeCategory}
            onHoverStart={handleHoverStart}
          />
        </AntiGravityContainer>
      </div>

      <div className="w-[95vw] sm:max-w-[90vw] mx-auto relative z-10 px-3 sm:px-4">
        {/* View More Button */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="inline-block glass px-8 py-4 rounded-full cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ boxShadow: `0 10px 40px ${activeCategoryData?.glowColor || 'rgba(0,0,0,0.3)'}` }}
            onClick={() => window.open(`https://zigguratss.com/artworks/painting/${activeCategory}`, '_self')}
          >
            <p className="text-sm text-zinc-400 font-medium">View more</p>
          </motion.div>
        </motion.div>

        {/* Wall Preview Panel - Lazy Loaded */}
        <Suspense fallback={<ComponentLoader />}>
          <WallPreviewPanel
            artwork={hoveredArtwork}
            isVisible={hoveredArtwork !== null}
            onClose={() => setHoveredArtwork(null)}
          />
        </Suspense>
      </div>
    </section>
  );
};

const App = () => (
  <div className="min-h-screen relative overflow-hidden bg-black">
    <AntiGravityGallery enableBackground={true} enableParticles={true} />
  </div>
);

export default App;
