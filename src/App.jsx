import React, { useState, useMemo, useCallback } from 'react';
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
    title: "Owl and butterfly",
    artist: "Tatiana Feoktistova",
    category: "Figurative",
    src: "https://zigguratss.com/assets/upload/art-363.jpg",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artwork/painting/nature/figurative/acrylic/owl-and-butterfly-363",
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

  // More Figurative Artworks
  {
    id: 21,
    title: "Portrait Study",
    artist: "Anupam Pal",
    category: "Figurative",
    src: "https://images.unsplash.com/photo-1578022761742-56e5c1181047?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artworks/painting/figurative",
    depth: 1.2
  },
  {
    id: 22,
    title: "Human Form",
    artist: "Chetan Katigar",
    category: "Figurative",
    src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    artworkUrl: "https://zigguratss.com/artworks/painting/figurative",
    depth: 0.8
  },
  {
    id: 23,
    title: "Expressions",
    artist: "Monalisa Sarkar",
    category: "Figurative",
    src: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artworks/painting/figurative",
    depth: 1.4
  },
  {
    id: 24,
    title: "Life Scenes",
    artist: "Nandini Verma",
    category: "Figurative",
    src: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    artworkUrl: "https://zigguratss.com/artworks/painting/figurative",
    depth: 1.1
  },
  {
    id: 25,
    title: "Urban Life",
    artist: "Prasenjit Nath",
    category: "Figurative",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    artworkUrl: "https://zigguratss.com/artworks/painting/figurative",
    depth: 0.9
  },
  {
    id: 26,
    title: "Gesture Drawing",
    artist: "Akshay Sawant",
    category: "Figurative",
    src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artworks/painting/figurative",
    depth: 1.3
  },
  {
    id: 27,
    title: "Crowd Dynamics",
    artist: "Arjun Das",
    category: "Figurative",
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "wide",
    artworkUrl: "https://zigguratss.com/artworks/painting/figurative",
    depth: 1.0
  },
  {
    id: 28,
    title: "Inner Reflection",
    artist: "Dhatri Thanki",
    category: "Figurative",
    src: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artworks/painting/figurative",
    depth: 1.2
  },

  // More Abstract Artworks
  {
    id: 29,
    title: "Abstract Flow",
    artist: "Malyadri K",
    category: "Abstract",
    src: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    artworkUrl: "https://zigguratss.com/artworks/painting/abstract",
    depth: 1.3
  },
  {
    id: 30,
    title: "Color Burst",
    artist: "Meenu Goyal",
    category: "Abstract",
    src: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    artworkUrl: "https://zigguratss.com/artworks/painting/abstract",
    depth: 0.9
  },
  {
    id: 31,
    title: "Organic Shapes",
    artist: "Mrinal Dutt",
    category: "Abstract",
    src: "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artworks/painting/abstract",
    depth: 1.4
  },
  {
    id: 32,
    title: "Motion Study",
    artist: "Nitu Chhajer",
    category: "Abstract",
    src: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "wide",
    artworkUrl: "https://zigguratss.com/artworks/painting/abstract",
    depth: 1.1
  },
  {
    id: 33,
    title: "Energy Patterns",
    artist: "Gulshan Achari",
    category: "Abstract",
    src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    artworkUrl: "https://zigguratss.com/artworks/painting/abstract",
    depth: 1.0
  },
  {
    id: 34,
    title: "Dreamscape",
    artist: "Aniruddha Sarker",
    category: "Abstract",
    src: "https://images.unsplash.com/photo-1556139954-ec19cce61d61?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    artworkUrl: "https://zigguratss.com/artworks/painting/abstract",
    depth: 1.2
  },
  {
    id: 35,
    title: "Textures",
    artist: "Ashis Mondal",
    category: "Abstract",
    src: "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artworks/painting/abstract",
    depth: 0.8
  },

  // More Fine Art Artworks
  {
    id: 36,
    title: "Heritage Study",
    artist: "Sanjay Kumar",
    category: "Fine Art",
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    artworkUrl: "https://zigguratss.com/artworks/painting/fine-art",
    depth: 1.3
  },
  {
    id: 37,
    title: "Classical Realism",
    artist: "Priya Deshmukh",
    category: "Fine Art",
    src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artworks/painting/fine-art",
    depth: 0.9
  },
  {
    id: 38,
    title: "Still Life Grand",
    artist: "Rajiv Sharma",
    category: "Fine Art",
    src: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    artworkUrl: "https://zigguratss.com/artworks/painting/fine-art",
    depth: 1.1
  },
  {
    id: 39,
    title: "Museum Piece",
    artist: "Kavita Singh",
    category: "Fine Art",
    src: "https://images.unsplash.com/photo-1582561833841-905fa9a0f7bf?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    artworkUrl: "https://zigguratss.com/artworks/painting/fine-art",
    depth: 1.4
  },
  {
    id: 40,
    title: "Academic Portrait",
    artist: "Deepak Verma",
    category: "Fine Art",
    src: "https://images.unsplash.com/photo-1578818919176-1043deb30f8a?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artworks/painting/fine-art",
    depth: 1.0
  },

  // More Aboriginal Artworks
  {
    id: 41,
    title: "Dot Art",
    artist: "Krishna Nair",
    category: "Aboriginal",
    src: "https://images.unsplash.com/photo-1558694640-edd997a816a7?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    artworkUrl: "http://zigguratss.com/artworks/painting/aboriginal",
    depth: 1.3
  },
  {
    id: 42,
    title: "Tribal Patterns",
    artist: "Sarika Iyer",
    category: "Aboriginal",
    src: "https://images.unsplash.com/photo-1524784798181-33f76be7c3d1?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    artworkUrl: "http://zigguratss.com/artworks/painting/aboriginal",
    depth: 0.8
  },
  {
    id: 43,
    title: "Ancient Stories",
    artist: "Manoj Kumar",
    category: "Aboriginal",
    src: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=900",
    aspectRatio: "portrait",
    artworkUrl: "http://zigguratss.com/artworks/painting/aboriginal",
    depth: 1.1
  },

  // More Religious Artworks
  {
    id: 44,
    title: "Temple Art",
    artist: "Radha Krishna",
    category: "Religious",
    src: "https://images.unsplash.com/photo-1545168442-2f7e9c4c8e85?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    artworkUrl: "https://zigguratss.com/artworks/painting/religious",
    depth: 1.2
  },
  {
    id: 45,
    title: "Devotion",
    artist: "Yashoda Devi",
    category: "Religious",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=900",
    aspectRatio: "portrait",
    artworkUrl: "https://zigguratss.com/artworks/painting/religious",
    depth: 0.9
  },
  {
    id: 46,
    title: "Sacred Rituals",
    artist: "Gopal Mishra",
    category: "Religious",
    src: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "square",
    artworkUrl: "https://zigguratss.com/artworks/painting/religious",
    depth: 1.4
  },
  {
    id: 47,
    title: "Divine Grace",
    artist: "Lakshmi Patel",
    category: "Religious",
    src: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&q=80&w=800",
    aspectRatio: "landscape",
    artworkUrl: "https://zigguratss.com/artworks/painting/religious",
    depth: 1.0
  }
];

// Simplified container animation - minimal, fast
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0,
      duration: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 }
  }
};

// Simplified item animation - no blur, minimal transforms
const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20
  },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      delay: (i % 12) * 0.025
    }
  }),
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }
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

  const activeCategoryData = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <section className="relative py-8 sm:py-12 md:py-16 min-h-screen overflow-hidden">
      {/* Optional animated background */}
      {enableBackground && <DynamicBackground />}

      {/* Optional particle system */}
      {enableParticles && <ParticleSystem particleCount={40} types={['dust', 'star']} />}

      <div className="w-[95vw] sm:max-w-[90vw] mx-auto relative z-10 px-3 sm:px-4">

        {/* Enhanced Header with elegant serif typography */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >

          {/* Main heading with elegant bold serif font */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold tracking-normal mb-4 sm:mb-6 text-white px-4" style={{ letterSpacing: '-0.02em' }}>
            Artworks By Style
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
                  style={isActive ? {
                    background: `linear-gradient(to right, ${cat.gradient.split('from-')[1].split(' ')[0]}, ${cat.gradient.split('to-')[1]})`,
                    boxShadow: `0 0 20px ${cat.glowColor}`
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
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-12 perspective-1200"
            >
              {filteredArtworks.map((art, index) => (
                <motion.div
                  key={art.id}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px", amount: 0.3 }}
                  className="relative mb-6 lg:mb-8 break-inside-avoid"
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
                    onHoverStart={handleHoverStart}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </AntiGravityContainer>

        {/* Enhanced Stats Counter with glow */}
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
            style={{
              boxShadow: `0 10px 40px ${activeCategoryData?.glowColor || 'rgba(0,0,0,0.3)'}`
            }}
            onClick={() => {
              window.location.href = `https://zigguratss.com/artworks/painting/${activeCategory}`;
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
