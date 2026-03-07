import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingImage } from './FloatingImage';

export const InfiniteCarousel = ({ artworks, activeCategory, onHoverStart }) => {
    const containerRef = useRef(null);

    // Split artworks to create some variation between rows if enough artworks exist
    const topRowArts = artworks.filter((_, i) => i % 2 === 0);
    const bottomRowArts = artworks.filter((_, i) => i % 2 !== 0);

    // If there's only a few, just use all for both
    const track1Arts = topRowArts.length >= 3 ? topRowArts : artworks;
    const track2Arts = bottomRowArts.length >= 3 ? bottomRowArts : [...artworks].reverse();

    return (
        <div
            className="w-[100vw] relative overflow-hidden py-6 left-1/2 -translate-x-1/2"
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
            }}
            ref={containerRef}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col gap-12 md:gap-16 relative z-10"
                >
                    {/* Top Row - Moves Left */}
                    <CarouselRow
                        artworks={track1Arts}
                        direction="left"
                        speed={35}
                        onHoverStart={onHoverStart}
                    />

                    {/* Bottom Row - Moves Right */}
                    <CarouselRow
                        artworks={track2Arts}
                        direction="right"
                        speed={40}
                        onHoverStart={onHoverStart}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const CarouselRow = ({ artworks, direction, speed, onHoverStart }) => {
    const trackRef = useRef(null);
    const rafRef = useRef(null);

    // Use RAF to update CSS variables on cards directly
    // This avoids triggering React re-renders on every frame
    const updateTransforms = useCallback(() => {
        if (!trackRef.current) return;

        const viewportCenter = window.innerWidth / 2;
        const maxDist = window.innerWidth / 2 + 200;
        const cards = trackRef.current.querySelectorAll('.carousel-card');

        cards.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const elCenter = rect.left + rect.width / 2;
            const distFromCenter = Math.abs(viewportCenter - elCenter);
            const normalizedDist = Math.min(distFromCenter / maxDist, 1);

            // Calculate values
            const scale = 1.05 - (normalizedDist * 0.15);
            const brightness = 1.1 - (normalizedDist * 0.4);

            // Apply directly via CSS variables for maximum performance
            el.style.setProperty('--card-scale', scale);
            el.style.setProperty('--card-brightness', brightness);
        });

        rafRef.current = requestAnimationFrame(updateTransforms);
    }, []);

    useEffect(() => {
        rafRef.current = requestAnimationFrame(updateTransforms);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [updateTransforms]);

    const animationClass = direction === 'left' ? 'animate-carousel-left' : 'animate-carousel-right';
    const loopedArtworks = [...artworks, ...artworks, ...artworks];

    return (
        <div className="w-full overflow-hidden whitespace-nowrap group">
            <div
                ref={trackRef}
                className={`inline-flex items-center gap-6 md:gap-10 ${animationClass}`}
                style={{ animationDuration: `${speed}s` }}
            >
                {loopedArtworks.map((art, i) => {
                    const uniqueId = `${art.id}-${i}`;
                    return (
                        <div
                            key={uniqueId}
                            className="carousel-card relative inline-block shrink-0 transition-transform duration-300 ease-out will-change-transform"
                            style={{
                                width: 'min(70vw, 320px)',
                                transform: 'scale(var(--card-scale, 0.95))',
                                filter: 'brightness(var(--card-brightness, 0.8))',
                            }}
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
                                onHoverStart={onHoverStart}
                                isCarousel={true}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
