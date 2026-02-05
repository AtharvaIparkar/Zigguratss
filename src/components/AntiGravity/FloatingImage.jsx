import React, { useState } from 'react';
import { FloatingCard } from './FloatingCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ZoomIn, X } from 'lucide-react';

export const FloatingImage = ({
    src,
    alt,
    title,
    artist,
    category,
    artworkUrl,
    aspectRatio = "landscape",
    depth = 1,
    className = "",
    delay = 0
}) => {
    const [isZoomed, setIsZoomed] = useState(false);

    // Determine aspect ratio class
    const aspectClasses = {
        landscape: "aspect-[4/3]",
        portrait: "aspect-[3/4]",
        square: "aspect-square",
        wide: "aspect-[16/9]"
    };

    const handleViewProject = () => {
        window.open(artworkUrl, '_blank');
    };

    return (
        <>
            <FloatingCard depth={depth} className={className} delay={delay}>
                <motion.div
                    className="relative rounded-lg overflow-hidden group/img cursor-pointer"
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.3 }
                    }}
                    style={{
                        boxShadow: "0 8px 30px rgba(0,0,0,0.08)"
                    }}
                >
                    {/* Animated border glow */}
                    <motion.div
                        className="absolute -inset-[2px] rounded-lg opacity-0 group-hover/img:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `linear-gradient(135deg, ${getCategoryGradient(category)})`,
                            filter: 'blur(6px)'
                        }}
                    />

                    {/* Main card container - Dark Mode */}
                    <div className="relative bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-white/5">
                        {/* Minimal padding frame */}
                        <div className="p-2">
                            <div className={`relative overflow-hidden rounded-md ${aspectClasses[aspectRatio]} bg-zinc-900/80`}>
                                {/* Image with parallax */}
                                <motion.img
                                    src={src}
                                    alt={alt}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                />

                                {/* Gradient mesh overlay */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: `
                                            radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05) 0%, transparent 50%),
                                            linear-gradient(135deg, ${getCategoryGradient(category)}, transparent 60%)
                                        `,
                                        mixBlendMode: 'soft-light'
                                    }}
                                />

                                {/* Hover Overlay */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center justify-center p-6 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
                                >
                                    {/* Title and Artist */}
                                    <div className="text-center mb-6">
                                        <h3 className="text-white text-lg md:text-xl font-bold mb-1 drop-shadow-lg">{title}</h3>
                                        <p className="text-white/90 text-sm drop-shadow-md">by {artist}</p>
                                    </div>

                                    {/* Action Icons */}
                                    <div className="flex items-center gap-4">
                                        <motion.button
                                            onClick={handleViewProject}
                                            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all relative overflow-hidden"
                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                            whileTap={{ scale: 0.95 }}
                                            title="View Project"
                                        >
                                            <ExternalLink className="w-5 h-5 relative z-10" />
                                            <motion.div
                                                className="absolute inset-0 bg-white/10"
                                                initial={{ scale: 0 }}
                                                whileHover={{ scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </motion.button>

                                        <motion.button
                                            onClick={() => setIsZoomed(true)}
                                            className="w-12 h-12 rounded-full backdrop-blur-md border border-white/30 flex items-center justify-center text-white transition-all relative overflow-hidden"
                                            style={{
                                                background: `linear-gradient(135deg, ${getCategoryGradient(category)})`
                                            }}
                                            whileHover={{ scale: 1.15, rotate: -5 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <ZoomIn className="w-5 h-5 relative z-10" />
                                            <motion.div
                                                className="absolute inset-0 bg-white/20"
                                                initial={{ scale: 0 }}
                                                whileHover={{ scale: 1 }}
                                                transition={{ duration: 0.3 }}
                                            />
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </FloatingCard>

            {/* Zoom Modal */}
            <AnimatePresence>
                {isZoomed && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsZoomed(false)}
                    >
                        {/* Close Button */}
                        <motion.button
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsZoomed(false)}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        {/* Zoomed Image */}
                        <motion.div
                            className="relative max-w-6xl max-h-[90vh] overflow-hidden rounded-lg"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={src}
                                alt={alt}
                                className="w-full h-full object-contain"
                            />

                            {/* Image Info Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
                                <p className="text-white/80 text-lg mb-1">by {artist}</p>
                                <p className="text-white/60 text-sm uppercase tracking-wider">{category}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// Helper function for category gradients
const getCategoryGradient = (category) => {
    const gradients = {
        'Figurative': 'rgba(245, 158, 11, 0.8), rgba(217, 119, 6, 0.8)',
        'Abstract': 'rgba(168, 85, 247, 0.8), rgba(126, 34, 206, 0.8)',
        'Fine Art': 'rgba(20, 184, 166, 0.8), rgba(13, 148, 136, 0.8)',
        'Aboriginal': 'rgba(249, 115, 22, 0.8), rgba(234, 88, 12, 0.8)',
        'Religious': 'rgba(244, 63, 94, 0.8), rgba(225, 29, 72, 0.8)',
    };
    return gradients[category] || 'rgba(113, 113, 122, 0.8), rgba(82, 82, 91, 0.8)';
};

// Helper function for category colors (legacy support)
const getCategoryColor = (category) => {
    const colors = {
        'Figurative': 'bg-amber-400',
        'Abstract': 'bg-purple-400',
        'Fine Art': 'bg-teal-400',
        'Aboriginal': 'bg-orange-400',
        'Religious': 'bg-rose-400',
        'Expressionism': 'bg-indigo-400'
    };
    return colors[category] || 'bg-zinc-400';
};
