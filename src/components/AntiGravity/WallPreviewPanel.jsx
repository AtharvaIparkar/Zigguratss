import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ZoomIn, X } from 'lucide-react';

export const WallPreviewPanel = ({ artwork, isVisible, onClose }) => {
    if (!artwork) return null;

    const { src, alt, title, artist, category, artworkUrl, aspectRatio } = artwork;

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

    const handleZoom = (e) => {
        e.stopPropagation();
        window.open(src, '_blank');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop overlay */}
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                    />

                    {/* Popup preview */}
                    <motion.div
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[90vw] max-w-sm pointer-events-auto"
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
                        {/* Card with wall background */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            {/* Beige wall background */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: 'linear-gradient(180deg, #e8e4dc 0%, #d4cfc5 50%, #c8c3b9 100%)',
                                }}
                            />

                            {/* Wall texture */}
                            <div
                                className="absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.7'/%3E%3C/svg%3E")`,
                                }}
                            />

                            {/* Spotlight effect */}
                            <motion.div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full"
                                style={{
                                    background: 'radial-gradient(ellipse 400px 300px at 50% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 70%)',
                                }}
                                animate={{
                                    opacity: [0.6, 0.9, 0.6],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />

                            {/* Close button */}
                            <motion.button
                                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-black/60 transition-colors z-10"
                                whileHover={{ scale: 1.15, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClose();
                                }}
                                initial={{ opacity: 0, rotate: -90 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <X className="w-5 h-5" />
                            </motion.button>

                            {/* Content */}
                            <div className="relative p-6">
                                {/* Artwork with frame */}
                                <motion.div
                                    initial={{ scale: 0.8, y: 20, opacity: 0 }}
                                    animate={{ scale: 1, y: 0, opacity: 1 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 20,
                                        delay: 0.2
                                    }}
                                >
                                    {/* Wooden frame */}
                                    <div
                                        className="relative p-3 rounded-sm"
                                        style={{
                                            background: `linear-gradient(135deg, #6b5744 0%, #5a4937 25%, #6b5744 50%, #5a4937 75%, #6b5744 100%)`,
                                            boxShadow: `
                                                0 25px 60px rgba(0,0,0,0.5),
                                                0 12px 30px rgba(0,0,0,0.35),
                                                inset 0 2px 3px rgba(0,0,0,0.5),
                                                inset 0 -2px 3px rgba(255,255,255,0.1)
                                            `,
                                            border: '1px solid rgba(101, 67, 33, 0.6)'
                                        }}
                                    >
                                        {/* Inner matting */}
                                        <div className="bg-zinc-100 p-1.5 rounded-sm shadow-inner">
                                            {/* Artwork */}
                                            <motion.div
                                                className={`relative ${aspectClasses[aspectRatio]} bg-white overflow-hidden shadow-md`}
                                                initial={{ opacity: 0, scale: 1.1 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.5, delay: 0.3 }}
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

                                {/* Info */}
                                <motion.div
                                    className="mt-4 text-center"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <h3 className="text-lg font-bold text-zinc-800 mb-0.5">{title}</h3>
                                    <p className="text-zinc-600 text-sm mb-1">by {artist}</p>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-4">{category}</p>

                                    {/* Action buttons */}
                                    <div className="flex items-center justify-center gap-2">
                                        <motion.button
                                            onClick={handleViewProject}
                                            className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-zinc-300 text-zinc-800 text-sm font-medium hover:bg-white hover:shadow-lg transition-all shadow-md flex items-center gap-1.5"
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            <span>Details</span>
                                        </motion.button>

                                        <motion.button
                                            onClick={handleZoom}
                                            className="px-4 py-2 rounded-full bg-zinc-800 text-white text-sm font-medium hover:bg-zinc-700 hover:shadow-lg transition-all shadow-md flex items-center gap-1.5"
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.55 }}
                                        >
                                            <ZoomIn className="w-3.5 h-3.5" />
                                            <span>Zoom</span>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
