import React, { useState } from 'react';
import { FloatingCard } from './FloatingCard';
import { motion } from 'framer-motion';

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
    delay = 0,
    onHoverStart,
    onHoverEnd
}) => {
    const aspectClasses = {
        landscape: "aspect-[4/3]",
        portrait: "aspect-[3/4]",
        square: "aspect-square",
        wide: "aspect-[16/9]"
    };

    return (
        <FloatingCard depth={depth} className={className} delay={delay}>
            <motion.div
                className="relative rounded-lg overflow-hidden group/img cursor-pointer"
                onHoverStart={() => onHoverStart?.({ src, alt, title, artist, category, artworkUrl, aspectRatio })}
                whileHover={{
                    scale: 1.03,
                    y: -5,
                    rotateY: 2,
                    transition: { duration: 0.4 }
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
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.1, rotate: 1 }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                            />

                            {/* Gradient overlay */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `
                                        radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08) 0%, transparent 50%),
                                        linear-gradient(135deg, ${getCategoryGradient(category)}, transparent 60%)
                                    `,
                                    mixBlendMode: 'soft-light'
                                }}
                            />

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
};

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
