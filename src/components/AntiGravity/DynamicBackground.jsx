import React from 'react';
import { motion } from 'framer-motion';

export const DynamicBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Dark base gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a24 50%, #0a0a0f 100%)'
                }}
            />

            {/* Animated gradient mesh - Dark Mode */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.12) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(78, 205, 196, 0.12) 0%, transparent 50%),
                        radial-gradient(circle at 40% 80%, rgba(167, 139, 250, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 90% 70%, rgba(255, 107, 107, 0.1) 0%, transparent 50%)
                    `
                }}
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear'
                }}
            />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat'
                }}
            />

            {/* Gradient orbs - Enhanced glow for dark mode */}
            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(212, 175, 55, 0.25) 0%, transparent 70%)',
                    top: '10%',
                    left: '10%'
                }}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />

            <motion.div
                className="absolute w-[450px] h-[450px] rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(78, 205, 196, 0.2) 0%, transparent 70%)',
                    bottom: '15%',
                    right: '15%'
                }}
                animate={{
                    x: [0, -40, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.15, 1]
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1
                }}
            />

            {/* Purple accent orb */}
            <motion.div
                className="absolute w-[400px] h-[400px] rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(167, 139, 250, 0.18) 0%, transparent 70%)',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
            />
        </div>
    );
};
