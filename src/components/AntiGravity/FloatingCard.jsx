import React, { useMemo, useRef, useState } from 'react';
import { motion, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useAntiGravity } from './AntiGravityContainer';

export const FloatingCard = ({
    children,
    depth = 1,
    className = "",
    delay = 0,
    enable3D = true,
    enableMagnetic = true
}) => {
    const context = useAntiGravity();
    const scrollYProgress = context?.scrollYProgress;
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    // Parallax movement based on scroll - Reduced range
    const yRange = useMemo(() => [Math.random() * -20 * depth, Math.random() * 20 * depth], [depth]);
    const y = scrollYProgress ? useTransform(scrollYProgress, [0, 1], yRange) : undefined;

    // 3D tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

    // Floating animation parameters - Reduced bounce
    const floatDuration = useMemo(() => 6 + Math.random() * 4, []);
    const rotateRange = useMemo(() => [-1.5, 1.5], []);
    const yBounce = useMemo(() => [0, -8 - Math.random() * 7, 0], []);  // Reduced from -15 to -8 max

    const handleMouseMove = (e) => {
        if (!cardRef.current || !enable3D) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const percentX = (e.clientX - centerX) / (rect.width / 2);
        const percentY = (e.clientY - centerY) / (rect.height / 2);

        mouseX.set(percentX);
        mouseY.set(percentY);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            style={y ? { y } : {}}
            className={`relative group perspective-1000 ${className}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            animate={{
                y: yBounce,
                rotate: rotateRange,
            }}
        >
            <motion.div
                style={enable3D ? {
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d'
                } : {}}
                className="will-change-transform"
                whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                }}
                animate={{
                    y: yBounce,
                    rotate: rotateRange,
                }}
                transition={{
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                {/* Multi-layer shadow system - Dark Mode */}
                <motion.div
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-6 rounded-full transition-all duration-500"
                    style={{
                        background: 'radial-gradient(ellipse, rgba(78, 205, 196, 0.3) 0%, transparent 70%)',
                        filter: 'blur(12px)'
                    }}
                    animate={{
                        width: isHovered ? '80%' : '70%',
                        opacity: isHovered ? 0.4 : 0.25
                    }}
                />

                {/* Glassmorphism glow - Enhanced for dark */}
                <motion.div
                    className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: 'linear-gradient(135deg, rgba(78, 205, 196, 0.15), rgba(212, 175, 55, 0.15), rgba(167, 139, 250, 0.15))',
                        filter: 'blur(12px)'
                    }}
                />

                {/* Card Content with depth - Dark Mode */}
                <div
                    className="relative bg-zinc-900/90 backdrop-blur-sm rounded-lg border border-white/5"
                    style={{
                        transform: enable3D ? 'translateZ(20px)' : 'none',
                        boxShadow: `
                            0 1px 3px rgba(0,0,0,0.8),
                            0 4px 12px rgba(0,0,0,0.6),
                            0 12px 24px rgba(0,0,0,0.4),
                            inset 0 1px 0 rgba(255,255,255,0.05)
                        `
                    }}
                >
                    {children}
                </div>

                {/* Specular highlight - Brighter for dark mode */}
                <motion.div
                    className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden"
                    style={{
                        transform: enable3D ? 'translateZ(22px)' : 'none'
                    }}
                >
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            background: `
                                radial-gradient(
                                    600px circle at ${mouseX.get() * 50 + 50}% ${mouseY.get() * 50 + 50}%,
                                    rgba(255,255,255,0.15),
                                    transparent 40%
                                )
                            `
                        }}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};
