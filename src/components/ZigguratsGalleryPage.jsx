import React, { useState, useMemo, useCallback, useRef, useEffect, createContext, useContext, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
    Palette, Users, Flower2, Globe, Church,
    ExternalLink, X
} from 'lucide-react';

// --- Data ---
import { ARTWORKS, CATEGORIES } from '../data/artworks';

// --- Assets ---
import portraitBg from '../assets/potrait.png';
import landscapeBg from '../assets/landscape.png';
import boxBg from '../assets/box.png';

// --- Styles Projection ---
const GalleryStyles = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
        .glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(12px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }

        @keyframes carousel-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-33.3333333%)); }
        }

        @keyframes carousel-right {
            0% { transform: translateX(calc(-33.3333333%)); }
            100% { transform: translateX(0); }
        }

        @keyframes painting-shimmer {
            0% { transform: translateX(-150%) skewX(-20deg); }
            60%, 100% { transform: translateX(200%) skewX(-20deg); }
        }

        .animate-carousel-left { animation: carousel-left linear infinite; }
        .animate-carousel-right { animation: carousel-right linear infinite; }
        .animate-painting-shimmer { animation: painting-shimmer 2.5s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
    `}} />
);

// --- Context & Hooks ---
const AntiGravityContext = createContext(null);
const useAntiGravity = () => useContext(AntiGravityContext);

const MagneticContext = createContext(null);
const useMagneticField = () => useContext(MagneticContext);

const useAntiGravityPhysics = ({
    gravity = -0.1,
    drag = 0.98,
    bounce = 0.3,
    maxDisplacement = 40,
} = {}) => {
    const [position, setPosition] = useState({ y: 0, r: 0 });
    const velocity = useRef({ y: 0, r: 0 });
    const frameId = useRef();

    useEffect(() => {
        let lastTime = performance.now();
        const animate = (time) => {
            const dt = (time - lastTime) / 16.67;
            lastTime = time;
            velocity.current.y += gravity * dt;
            velocity.current.y += Math.sin(time / 1000) * 0.5 * dt;
            velocity.current.y *= drag;
            velocity.current.r *= drag;
            setPosition(prev => {
                let newY = prev.y + velocity.current.y * dt;
                let newR = prev.r + (Math.sin(time / 2000) * 0.05) * dt;
                if (Math.abs(newY) > maxDisplacement) {
                    velocity.current.y *= -bounce;
                    newY = Math.sign(newY) * maxDisplacement;
                }
                return { y: newY, r: newR };
            });
            frameId.current = requestAnimationFrame(animate);
        };
        frameId.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId.current);
    }, [gravity, drag, bounce, maxDisplacement]);

    return position;
};

// --- Sub-Components ---
const ComponentLoader = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-8 h-8 border-2 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
    </div>
);

const ParticleSystem = React.memo(({ particleCount = 60 }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize(); window.addEventListener('resize', resize);
        const particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1, color: `rgba(255, 215, 100, ${Math.random() * 0.4 + 0.3})`
        }));
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
                ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
            });
            requestAnimationFrame(animate);
        };
        animate(); return () => window.removeEventListener('resize', resize);
    }, [particleCount]);
    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" />;
});

const DynamicBackground = React.memo(() => (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0f]">
        <motion.div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(78, 205, 196, 0.08) 0%, transparent 50%)' }} animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 10, repeat: Infinity }} />
    </div>
));

const MagneticField = ({ children, strength = 0.3, radius = 100 }) => {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', move); return () => window.removeEventListener('mousemove', move);
    }, []);
    const getMagneticForce = useCallback((ref) => {
        if (!ref.current) return { x: 0, y: 0 };
        const rect = ref.current.getBoundingClientRect();
        const dx = mouse.x - (rect.left + rect.width / 2);
        const dy = mouse.y - (rect.top + rect.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > radius) return { x: 0, y: 0 };
        return { x: dx * (1 - dist / radius) * strength, y: dy * (1 - dist / radius) * strength };
    }, [mouse, radius, strength]);
    return <MagneticContext.Provider value={{ getMagneticForce }}>{children}</MagneticContext.Provider>;
};

const FloatingCard = ({ children, depth = 1, className = "", delay = 0, enable3D = true, isCarousel = false }) => {
    const context = useAntiGravity();
    const scrollYProgress = context?.scrollYProgress;
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const yRange = useMemo(() => isCarousel ? [0, 0] : [Math.random() * -20 * depth, Math.random() * 20 * depth], [depth, isCarousel]);
    const yTransform = scrollYProgress ? useTransform(scrollYProgress, [0, 1], yRange) : 0;

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], isCarousel ? [10, -10] : [8, -8]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], isCarousel ? [-10, 10] : [-8, 8]), { stiffness: 200, damping: 20 });

    const floatDuration = useMemo(() => isCarousel ? 0 : 6 + Math.random() * 4, [isCarousel]);
    const rotateRange = useMemo(() => isCarousel ? [0, 0] : [-1.5, 1.5], [isCarousel]);
    const yBounce = useMemo(() => isCarousel ? [0, 0, 0] : [0, -8 - Math.random() * 7, 0], [isCarousel]);

    const handleMouseMove = (e) => {
        if (!cardRef.current || !enable3D) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2));
        mouseY.set((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2));
    };

    return (
        <motion.div ref={cardRef} style={{ y: yTransform }} className={`relative group perspective-1000 ${className}`} initial={{ opacity: 0, scale: 0.95, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { setIsHovered(false); mouseX.set(0); mouseY.set(0); }} animate={{ y: yBounce, rotate: rotateRange }}>
            <motion.div style={enable3D ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : {}} className="will-change-transform" whileHover={isCarousel ? { scale: 1.08, y: -12, transition: { duration: 0.6 } } : { scale: 1.02 }} animate={{ y: yBounce, rotate: rotateRange }} transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-6 rounded-full opacity-25" style={{ background: 'radial-gradient(ellipse, rgba(78, 205, 196, 0.3) 0%, transparent 70%)', filter: 'blur(12px)' }} />
                <div className="relative bg-zinc-900/90 backdrop-blur-sm rounded-lg border border-white/5" style={{ transform: enable3D ? 'translateZ(20px)' : 'none', boxShadow: '0 12px 24px rgba(0,0,0,0.4)' }}>{children}</div>
            </motion.div>
        </motion.div>
    );
};

const FloatingImage = React.memo(({ src, alt, title, artist, category, artworkUrl, aspectRatio = "landscape", depth = 1, onHoverStart, isCarousel = false }) => {
    const aspectClasses = { landscape: "aspect-[4/3]", portrait: "aspect-[3/4]", square: "aspect-square", wide: "aspect-[16/9]" };
    const gradients = { 'Figurative': 'rgba(245, 158, 11, 0.6)', 'Abstract': 'rgba(168, 85, 247, 0.6)', 'Fine Art': 'rgba(20, 184, 166, 0.6)', 'Aboriginal': 'rgba(249, 115, 22, 0.6)', 'Religious': 'rgba(244, 63, 94, 0.6)' };
    const grad = gradients[category] || 'rgba(113, 113, 122, 0.6)';
    return (
        <FloatingCard depth={depth} delay={0} isCarousel={isCarousel}>
            <motion.div className={`relative rounded-lg overflow-hidden group/img cursor-pointer w-full h-full block`} onHoverStart={() => onHoverStart?.({ src, alt, title, artist, category, artworkUrl, aspectRatio })} onClick={() => onHoverStart?.({ src, alt, title, artist, category, artworkUrl, aspectRatio })}>
                <div className="relative bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-white/5 p-2">
                    <div className={`relative overflow-hidden rounded-md ${aspectClasses[aspectRatio]} bg-zinc-900/80`}>
                        <img src={src} alt={alt} loading="eager" fetchPriority="high" decoding="sync" className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                        <div className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(135deg, ${grad}, transparent)`, mixBlendMode: 'soft-light' }} />
                        {isCarousel && <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent animate-painting-shimmer pointer-events-none" />}
                    </div>
                </div>
            </motion.div>
        </FloatingCard>
    );
});

const WallPreviewPanel = React.memo(({ artwork, isVisible, onClose }) => {
    if (!artwork) return null;
    const backgroundConfig = {
        portrait: { bgImage: portraitBg, top: '40%', left: '50%', w: '28%' },
        landscape: { bgImage: landscapeBg, top: '32%', left: '50%', w: '42%' },
        square: { bgImage: boxBg, top: '35%', left: '72%', w: '28%' },
        wide: { bgImage: landscapeBg, top: '42%', left: '50%', w: '45%' }
    };
    const config = backgroundConfig[artwork.aspectRatio] || backgroundConfig.square;
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
                    <motion.div className="relative w-full max-w-2xl bg-white/5 border border-white/20 rounded-2xl overflow-hidden shadow-2xl" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} onClick={e => e.stopPropagation()} onMouseLeave={onClose}>
                        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center border border-white/30 text-white hover:bg-black/80"><X size={24} /></button>
                        <div className="relative w-full aspect-[16/10]">
                            <img src={config.bgImage} alt="Wall" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute -translate-x-1/2 -translate-y-1/2 border-[6px] border-[#5a4937] shadow-2xl" style={{ top: config.top, left: config.left || '50%', width: config.w }}>
                                <img src={artwork.src} alt={artwork.title} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="p-6 text-center text-white">
                            <h3 className="text-xl font-bold mb-1">{artwork.title}</h3>
                            <p className="text-sm opacity-80 mb-4">by {artwork.artist}</p>
                            <button onClick={() => window.location.href = artwork.artworkUrl} className="px-6 py-2 bg-white text-black rounded-full font-medium inline-flex items-center gap-2 hover:bg-zinc-200 transition-colors"><ExternalLink size={16} /> View Details</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

const CarouselRow = React.memo(({ artworks, direction, speed, onHoverStart }) => (
    <div className="w-full overflow-hidden group">
        <div className={`inline-flex items-center gap-6 md:gap-10 ${direction === 'left' ? 'animate-carousel-left' : 'animate-carousel-right'}`} style={{ animationDuration: `${speed}s` }}>
            {[...artworks, ...artworks, ...artworks].map((art, i) => (
                <div key={`${art.id}-${i}`} className="relative inline-block shrink-0" style={{ width: 'min(70vw, 320px)' }}>
                    <FloatingImage {...art} onHoverStart={onHoverStart} isCarousel={true} />
                </div>
            ))}
        </div>
    </div>
));

const InfiniteCarousel = React.memo(({ artworks, activeCategory, onHoverStart }) => (
    <div className="w-screen relative overflow-hidden py-6 left-1/2 -translate-x-1/2" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="flex flex-col gap-12">
                <CarouselRow artworks={artworks.filter((_, i) => i % 2 === 0)} direction="left" speed={35} onHoverStart={onHoverStart} />
                <CarouselRow artworks={artworks.filter((_, i) => i % 2 !== 0)} direction="right" speed={40} onHoverStart={onHoverStart} />
            </motion.div>
        </AnimatePresence>
    </div>
));

const AntiGravityContainer = ({ children }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    return (
        <AntiGravityContext.Provider value={{ scrollYProgress }}>
            <div ref={ref} className="relative">{children}</div>
        </AntiGravityContext.Provider>
    );
};

// --- Main Page Component ---
export const ZigguratsGalleryPage = ({ enableBackground = true, enableParticles = true }) => {
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
        <section className="relative py-8 sm:py-12 md:py-16 min-h-screen overflow-hidden bg-black text-white font-sans">
            <GalleryStyles />
            {enableBackground && <DynamicBackground />}
            {enableParticles && <ParticleSystem />}

            <div className="w-[95vw] sm:max-w-[90vw] mx-auto relative z-10 px-3 sm:px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold tracking-normal mb-4 sm:mb-6 text-white px-4"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Artworks as per Style
                    </h1>
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

                <WallPreviewPanel
                    artwork={hoveredArtwork}
                    isVisible={hoveredArtwork !== null}
                    onClose={() => setHoveredArtwork(null)}
                />
            </div>
        </section>
    );
};

export default ZigguratsGalleryPage;
