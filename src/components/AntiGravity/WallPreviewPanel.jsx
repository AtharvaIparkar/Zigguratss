import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';

// Import background images
import portraitBg from '../../assets/potrait.png';
import landscapeBg from '../../assets/landscape.png';
import boxBg from '../../assets/box.png';

export const WallPreviewPanel = ({ artwork, isVisible, onClose }) => {
    if (!artwork) return null;

    const { src, alt, title, artist, category, artworkUrl, aspectRatio } = artwork;

    // Map aspect ratios to background images and artwork sizing
    const backgroundConfig = {
        portrait: {
            bgImage: portraitBg,
            artworkWidth: '28%',
            artworkMaxWidth: '220px',
            artworkPosition: { top: '40%', left: '45%' }
        },
        landscape: {
            bgImage: landscapeBg,
            artworkWidth: '42%',
            artworkMaxWidth: '340px',
            artworkPosition: { top: '32%', left: '50%' }
        },
        square: {
            bgImage: boxBg,
            artworkWidth: '32%',
            artworkMaxWidth: '260px',
            artworkPosition: { top: '30%', left: '75%' }
        },
        wide: {
            bgImage: landscapeBg,
            artworkWidth: '45%',
            artworkMaxWidth: '360px',
            artworkPosition: { top: '42%', left: '50%' }
        }
    };

    const config = backgroundConfig[aspectRatio] || backgroundConfig.square;

    const aspectClasses = {
        landscape: "aspect-[4/3]",
        portrait: "aspect-[3/4]",
        square: "aspect-square",
        wide: "aspect-[16/9]"
    };

    const handleViewProject = (e) => {
        e.stopPropagation();
        window.open(artworkUrl, '_blank');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop overlay */}
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm cursor-pointer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                    />

                    {/* Popup preview */}
                    <motion.div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[90vw] max-w-2xl"
                        initial={{ scale: 0.5, opacity: 0, y: 100 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            y: 0,
                            transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                                delay: 0.1
                            }
                        }}
                        exit={{
                            scale: 0.8,
                            opacity: 0,
                            y: 50,
                            transition: { duration: 0.2 }
                        }}
                    >
                        {/* Close button - Top Right */}
                        <motion.button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-[70] text-white/80 hover:text-white transition-colors group"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                                delay: 0.2
                            }}
                        >
                            <X className="w-8 h-8 drop-shadow-lg" strokeWidth={2.5} />
                        </motion.button>

                        {/* Glass card container */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl bg-white/5 border border-white/30">
                            {/* Wall scene mockup with dynamic background */}
                            <motion.div
                                className="relative w-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {/* Wall background image container */}
                                <div className="relative w-full aspect-[16/10] overflow-hidden">
                                    {/* Dynamic wall background image based on artwork aspect ratio */}
                                    <img
                                        src={config.bgImage}
                                        alt="Wall background"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />

                                    {/* Subtle overlay for depth */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.03) 0%, transparent 50%, rgba(0,0,0,0.03) 100%)',
                                        }}
                                    />

                                    {/* Framed artwork - dynamically positioned and sized */}
                                    <motion.div
                                        className="absolute -translate-x-1/2 -translate-y-1/2"
                                        style={{
                                            top: config.artworkPosition.top,
                                            left: config.artworkPosition.left,
                                            width: config.artworkWidth,
                                            maxWidth: config.artworkMaxWidth
                                        }}
                                        initial={{ scale: 0.8, y: 20, opacity: 0 }}
                                        animate={{ scale: 1, y: 0, opacity: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 200,
                                            damping: 20,
                                            delay: 0.3
                                        }}
                                    >
                                        {/* Wooden frame - SLEEKER & SLIMMER */}
                                        <div
                                            className="relative p-1 md:p-1.5 rounded-sm"
                                            style={{
                                                background: `linear-gradient(135deg, #6b5744 0%, #5a4937 25%, #6b5744 50%, #5a4937 75%, #6b5744 100%)`,
                                                boxShadow: `
                                                    0 20px 50px rgba(0,0,0,0.5),
                                                    0 10px 25px rgba(0,0,0,0.35),
                                                    inset 0 1px 2px rgba(0,0,0,0.5),
                                                    inset 0 -1px 2px rgba(255,255,255,0.1)
                                                `,
                                                border: '0.5px solid rgba(101, 67, 33, 0.6)'
                                            }}
                                        >
                                            {/* Inner matting - SLIMMER */}
                                            <div className="bg-zinc-100 p-0.5 rounded-sm shadow-inner">
                                                {/* Artwork */}
                                                <motion.div
                                                    className={`relative ${aspectClasses[aspectRatio]} bg-white overflow-hidden shadow-md`}
                                                    initial={{ opacity: 0, scale: 1.1 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.4, delay: 0.4 }}
                                                >
                                                    <img
                                                        src={src}
                                                        alt={alt}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Info section below the wall scene */}
                            <div className="relative p-6 bg-gradient-to-b from-transparent to-black/20">
                                <motion.div
                                    className="text-center"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <h3 className="text-xl font-serif font-bold text-white mb-1 tracking-tight drop-shadow-lg">{title}</h3>
                                    <p className="text-white/90 text-sm mb-2 font-light italic drop-shadow-md">by {artist}</p>
                                    <p className="text-xs text-white/70 uppercase tracking-widest mb-5 font-medium drop-shadow-sm">{category}</p>

                                    {/* View Details button */}
                                    <motion.button
                                        onClick={handleViewProject}
                                        className="px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-zinc-300 text-zinc-800 text-sm font-medium hover:bg-white hover:shadow-lg transition-all shadow-md flex items-center gap-2 mx-auto"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        <span>View Full Details</span>
                                    </motion.button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
