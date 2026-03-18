import React, { useState, useRef, useEffect } from 'react';
import { FloatingCard } from './FloatingCard';
import { motion } from 'framer-motion';

export const FloatingImage = React.memo(({
    src,
    alt,
    title,
    artist,
    category,
    artworkUrl,
    aspectRatio = "landscape",
    depth = 1,
    onHoverStart,
    isCarousel = false
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const ref = useRef(null);

    const aspectClasses = {
        landscape: "aspect-[4/3]",
        portrait: "aspect-[3/4]",
        square: "aspect-square",
        wide: "aspect-[16/9]"
    };

    return (
        <FloatingCard depth={depth} delay={0} isCarousel={isCarousel}>
            <motion.div
                ref={ref}
                className={`relative rounded-lg overflow-hidden group/img cursor-pointer w-full h-full block ${isCarousel ? 'hover-shimmer' : ''}`}
                onHoverStart={() => onHoverStart?.({ src, alt, title, artist, category, artworkUrl, aspectRatio })}
                onClick={() => onHoverStart?.({ src, alt, title, artist, category, artworkUrl, aspectRatio })}
                whileHover={isCarousel ? {} : {
                    scale: 1.03,
                    y: -5,
                    transition: { duration: 0.3 }
                }}
                style={{
                    boxShadow: "0 8px 30px rgba(0,0,0,0.3)"
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

                {/* Main card */}
                <div className="relative bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-white/5">
                    <div className="p-2">
                        <div className={`relative overflow-hidden rounded-md ${aspectClasses[aspectRatio]} bg-zinc-900/80`}>
                            <motion.img
                                src={src}
                                alt={alt}
                                loading={isCarousel ? "eager" : "lazy"}
                                decoding="async"
                                className="w-full h-full object-cover"
                                onLoad={() => setIsLoaded(true)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isLoaded ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.08 }}
                            />

                            {/* Gradient overlay */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: isCarousel
                                        ? `linear-gradient(135deg, rgba(212, 175, 55, 0.3), transparent 60%)`
                                        : `linear-gradient(135deg, ${getCategoryGradient(category)}, transparent 60%)`,
                                    mixBlendMode: 'soft-light'
                                }}
                            />

                            {/* Shimmer overlay for carousel */}
                            {isCarousel && (
                                <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover/img:animate-painting-shimmer pointer-events-none" />
                            )}

                            {/* Subtle hover hint */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-3 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <p className="text-white/80 text-xs">Hover to preview</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </FloatingCard>
    );
});

FloatingImage.displayName = 'FloatingImage';

const getCategoryGradient = (category) => {
    const gradients = {
        'Figurative': 'rgba(245, 158, 11, 0.6), rgba(217, 119, 6, 0.6)',
        'Abstract': 'rgba(168, 85, 247, 0.6), rgba(126, 34, 206, 0.6)',
        'Fine Art': 'rgba(20, 184, 166, 0.6), rgba(13, 148, 136, 0.6)',
        'Aboriginal': 'rgba(249, 115, 22, 0.6), rgba(234, 88, 12, 0.6)',
        'Religious': 'rgba(244, 63, 94, 0.6), rgba(225, 29, 72, 0.6)',
    };
    return gradients[category] || 'rgba(113, 113, 122, 0.6), rgba(82, 82, 91, 0.6)';
};
