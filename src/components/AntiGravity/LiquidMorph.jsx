import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LiquidMorph = ({ children, morphKey, className = '' }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={morphKey}
                className={className}
                initial={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
                    opacity: 0,
                    filter: 'blur(10px)'
                }}
                animate={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    opacity: 1,
                    filter: 'blur(0px)'
                }}
                exit={{
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
                    opacity: 0,
                    filter: 'blur(10px)'
                }}
                transition={{
                    duration: 0.7,
                    ease: [0.65, 0, 0.35, 1]
                }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

// Blob morph for smoother organic transitions
export const BlobMorph = ({ isActive, color, className = '' }) => {
    const blobVariants = {
        initial: {
            d: "M60,-60 C80,-40 100,-20 100,0 C100,20 80,40 60,60 C40,80 20,100 0,100 C-20,100 -40,80 -60,60 C-80,40 -100,20 -100,0 C-100,-20 -80,-40 -60,-60 C-40,-80 -20,-100 0,-100 C20,-100 40,-80 60,-60 Z",
        },
        active: {
            d: "M70,-50 C90,-30 110,-10 110,10 C110,30 90,50 70,70 C50,90 30,110 10,110 C-10,110 -30,90 -50,70 C-70,50 -90,30 -90,10 C-90,-10 -70,-30 -50,-50 C-30,-70 -10,-90 10,-90 C30,-90 50,-70 70,-50 Z",
        }
    };

    return (
        <svg
            viewBox="-100 -100 200 200"
            className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
            style={{ filter: 'blur(40px)', opacity: 0.6 }}
        >
            <motion.path
                fill={color}
                variants={blobVariants}
                initial="initial"
                animate={isActive ? "active" : "initial"}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
            />
        </svg>
    );
};
