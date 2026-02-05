import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AntiGravityContainer,
  FloatingImage,
  ParticleSystem,
  MagneticField,
  DynamicBackground,
  LiquidMorph,
  WallPreviewPanel
} from './components/AntiGravity';
import { Palette, Users, Flower2, Globe, Church, Sparkles } from 'lucide-react';

// Category definitions with enhanced gradients
const CATEGORIES = [
  {
    id: 'figurative',
    name: 'Figurative',
    icon: Users,
    gradient: 'from-amber-500 via-amber-600 to-amber-700',
    glowColor: 'rgba(245, 158, 11, 0.4)'
  },
  {
    id: 'abstract',
    name: 'Abstract',
    icon: Palette,
    gradient: 'from-purple-500 via-purple-600 to-purple-700',
    glowColor: 'rgba(168, 85, 247, 0.4)'
  },
  {
    id: 'fine-art',
    name: 'Fine Art',
    icon: Flower2,
    gradient: 'from-teal-500 via-teal-600 to-teal-700',
    glowColor: 'rgba(20, 184, 166, 0.4)'
  },
  {
    id: 'aboriginal',
    name: 'Aboriginal',
    icon: Globe,
    gradient: 'from-orange-500 via-orange-600 to-orange-700',
    glowColor: 'rgba(249, 115, 22, 0.4)'
  },
  {
    id: 'religious',
    name: 'Religious',
    icon: Church,
    gradient: 'from-rose-500 via-rose-600 to-rose-700',
    glowColor: 'rgba(244, 63, 94, 0.4)'
  },
];

// Curated artworks (same as before)
const ARTWORKS = [
  // Figurative
  {
    id: 1,
    title: "Three Generation Together",
    artist: "Arpa Mukhopadhyay",
    category: "Figurative",
    src: "https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artwork/painting/conceptual/figurative/acrylic/three-generation-together-nv2-1230",
    depth: 1.1
  },
  {
    id: 2,
    title: "Silent Contemplation",
    artist: "Maya Singh",
    category: "Figurative",
    src: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    artworkUrl: "https://zigguratss.com/artwork/painting/figurative/oil/silent-contemplation",
    depth: 0.9
  },
  {
    id: 3,
    title: "Dancing Souls",
    artist: "Rajesh Kumar",
    category: "Figurative",
    src: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    artworkUrl: "https://zigguratss.com/artwork/painting/figurative/acrylic/dancing-souls",
    depth: 1.3
  },
  {
    id: 4,
    title: "Urban Stories",
    artist: "Priya Sharma",
    category: "Figurative",
    src: "https://images.unsplash.com/photo-1594834801821-8c2e75c0e320?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artwork/painting/figurative/mixed-media/urban-stories",
    depth: 1.0
  },

  // Abstract
  {
    id: 5,
    title: "Color Symphony",
    artist: "Vikram Patel",
    category: "Abstract",
    src: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    artworkUrl: "https://zigguratss.com/artwork/painting/abstract/acrylic/color-symphony",
    depth: 1.2
  },
  {
    id: 6,
    title: "Fluid Dynamics",
    artist: "Aisha Khan",
    category: "Abstract",
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    artworkUrl: "https://zigguratss.com/artwork/painting/abstract/watercolor/fluid-dynamics",
    depth: 0.8
  },
  {
    id: 7,
    title: "Geometric Harmony",
    artist: "Sandeep Roy",
    category: "Abstract",
    src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artwork/painting/abstract/oil/geometric-harmony",
    depth: 1.4
  },
  {
    id: 8,
    title: "Vibrant Chaos",
    artist: "Neha Gupta",
    category: "Abstract",
    src: "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "wide",
    artworkUrl: "https://zigguratss.com/artwork/painting/abstract/acrylic/vibrant-chaos",
    depth: 1.1
  },

  // Fine Art
  {
    id: 9,
    title: "Classical Beauty",
    artist: "Deepak Mehta",
    category: "Fine Art",
    src: "https://images.unsplash.com/photo-1547891301-14c1cc35667e?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artwork/painting/fine-art/oil/classical-beauty",
    depth: 1.3
  },
  {
    id: 10,
    title: "Renaissance Echo",
    artist: "Kavita Desai",
    category: "Fine Art",
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    artworkUrl: "https://zigguratss.com/artwork/painting/fine-art/oil/renaissance-echo",
    depth: 0.9
  },
  {
    id: 11,
    title: "Timeless Elegance",
    artist: "Amit Verma",
    category: "Fine Art",
    src: "https://images.unsplash.com/photo-1577083552431-6e5fd01c3391?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    artworkUrl: "https://zigguratss.com/artwork/painting/fine-art/acrylic/timeless-elegance",
    depth: 1.2
  },
  {
    id: 12,
    title: "Masterpiece Detail",
    artist: "Sonal Reddy",
    category: "Fine Art",
    src: "https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artwork/painting/fine-art/oil/masterpiece-detail",
    depth: 1.0
  },

  // Aboriginal
  {
    id: 13,
    title: "Dreamtime Stories",
    artist: "Ravi Nair",
    category: "Aboriginal",
    src: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    artworkUrl: "https://zigguratss.com/artwork/painting/aboriginal/dot-painting/dreamtime-stories",
    depth: 1.1
  },
  {
    id: 14,
    title: "Ancestral Patterns",
    artist: "Meera Iyer",
    category: "Aboriginal",
    src: "https://images.unsplash.com/photo-1513682121497-80211f36a7d3?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    artworkUrl: "https://zigguratss.com/artwork/painting/aboriginal/acrylic/ancestral-patterns",
    depth: 1.4
  },
  {
    id: 15,
    title: "Sacred Symbols",
    artist: "Ankit Joshi",
    category: "Aboriginal",
    src: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artwork/painting/aboriginal/natural-pigments/sacred-symbols",
    depth: 0.8
  },
  {
    id: 16,
    title: "Earth Connection",
    artist: "Pooja Malhotra",
    category: "Aboriginal",
    src: "https://images.unsplash.com/photo-1579541814924-49fef5b2c087?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "wide",
    artworkUrl: "https://zigguratss.com/artwork/painting/aboriginal/mixed-media/earth-connection",
    depth: 1.2
  },

  // Religious
  {
    id: 17,
    title: "Divine Light",
    artist: "Kiran Rao",
    category: "Religious",
    src: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artwork/painting/religious/oil/divine-light",
    depth: 1.0
  },
  {
    id: 18,
    title: "Sacred Moments",
    artist: "Aditi Kapoor",
    category: "Religious",
    src: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    artworkUrl: "https://zigguratss.com/artwork/painting/religious/acrylic/sacred-moments",
    depth: 1.3
  },
  {
    id: 19,
    title: "Spiritual Journey",
    artist: "Rohit Bhatt",
    category: "Religious",
    src: "https://images.unsplash.com/photo-1595436172532-5c8c37e30eb4?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    artworkUrl: "https://zigguratss.com/artwork/painting/religious/tempera/spiritual-journey",
    depth: 0.9
  },
  {
    id: 20,
    title: "Blessed Serenity",
    artist: "Nisha Chopra",
    category: "Religious",
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artwork/painting/religious/oil/blessed-serenity",
    depth: 1.1
  },
];

// Enhanced container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
      when: "beforeChildren"
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
      when: "afterChildren"
    }
  }
};

// Enhanced item animation with varied 3D effects
const itemVariants = {
  hidden: (i) => ({
    opacity: 0,
    scale: 0.75,
    y: 60,
    rotateX: i % 2 === 0 ? -20 : -12,
    rotateZ: (i % 3 === 0 ? -4 : i % 2 === 0 ? 4 : 0),
    filter: 'blur(10px)'
  }),
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateZ: 0,
    filter: 'blur(0px)',
    transition: {
      type: "spring",
      stiffness: 100 - (i % 3) * 15,
      damping: 14 + (i % 2) * 4,
      mass: 0.8,
      delay: (i % 4) * 0.07
    }
  }),
  exit: (i) => ({
    opacity: 0,
    scale: 0.85,
    y: -50,
    rotateX: i % 2 === 0 ? 18 : 12,
    rotateZ: (i % 3 === 0 ? 4 : -4),
    filter: 'blur(10px)',
    transition: {
      duration: 0.4,
      ease: [0.65, 0, 0.35, 1]
    }
  })
};

export const AntiGravityGallery = () => {
  const [activeCategory, setActiveCategory] = useState('figurative');
  const [hoveredArtwork, setHoveredArtwork] = useState(null);

  // Filter artworks by category
  const filteredArtworks = ARTWORKS.filter(art =>
    art.category.toLowerCase().replace(' ', '-') === activeCategory
  );

  const activeCategoryData = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <section className="relative py-20 px-6 min-h-screen overflow-hidden">
      {/* Dynamic animated background */}
      <DynamicBackground />

      {/* Particle system */}
      <ParticleSystem particleCount={60} types={['dust', 'star', 'orb']} />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Enhanced Header with gradient text */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="gradient-text">
              Artworks As Per Style
            </span>
          </h1>

          <motion.p
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Artworks we offer as per their style!
          </motion.p>
        </motion.div>

        {/* Enhanced Category Filter Pills with Magnetic Field */}
        <MagneticField strength={0.15} radius={80}>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
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
                  style={isActive ? {
                    boxShadow: `0 10px 40px ${cat.glowColor}`
                  } : {}}
                >
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${cat.gradient}`}
                      layoutId="activeCategory"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}

                  {/* Animated background pulse for active */}
                  {isActive && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${cat.gradient}`}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
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

        {/* Gallery Grid with Liquid Morph Transitions */}
        <AntiGravityContainer>
          <LiquidMorph morphKey={activeCategory}>
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10 perspective-1200"
            >
              {filteredArtworks.map((art, index) => (
                <motion.div
                  key={art.id}
                  custom={index}
                  variants={itemVariants}
                  className={`${index % 2 === 0
                    ? "lg:mt-6"      // Even items go down a bit (reduced from mt-8)
                    : index % 3 === 0
                      ? "lg:mt-0"    // Every 3rd odd item stays neutral (changed from -mt-4)
                      : "lg:mt-2"    // Other odd items go down slightly
                    }`}
                >
                  <FloatingImage
                    src={art.src}
                    alt={art.title}
                    title={art.title}
                    artist={art.artist}
                    category={art.category}
                    aspectRatio={art.aspectRatio}
                    artworkUrl={art.artworkUrl}
                    depth={art.depth}
                    onHoverStart={setHoveredArtwork}
                  />
                </motion.div>
              ))}
            </motion.div>
          </LiquidMorph>
        </AntiGravityContainer>

        {/* Enhanced Stats Counter with glow */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="inline-block glass px-8 py-4 rounded-full"
            whileHover={{ scale: 1.05 }}
            style={{
              boxShadow: `0 10px 40px ${activeCategoryData?.glowColor || 'rgba(0,0,0,0.3)'}`
            }}
          >
            <p className="text-sm text-zinc-400 font-medium">
              View more
            </p>
          </motion.div>
        </motion.div>

        {/* Shared Wall Preview Panel */}
        <WallPreviewPanel
          artwork={hoveredArtwork}
          isVisible={hoveredArtwork !== null}
          onClose={() => setHoveredArtwork(null)}
        />
      </div>
    </section>
  );
};

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AntiGravityGallery />
    </div>
  );
}

export default App;
