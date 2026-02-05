import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const RippleEffect = ({ children, color = 'rgba(78, 205, 196, 0.4)' }) => {
    const [ripples, setRipples] = useState([]);

    const createRipple = useCallback((event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const size = Math.max(rect.width, rect.height);
        const ripple = {
            x,
            y,
            size,
            id: Date.now() + Math.random()
        };

        setRipples(prev => [...prev, ripple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== ripple.id));
        }, 800);
    }, []);

    return (
        <div
            className="relative overflow-hidden"
            onClick={createRipple}
        >
            {children}

            <div className="absolute inset-0 pointer-events-none">
                <AnimatePresence>
                    {ripples.map(ripple => (
                        <motion.span
                            key={ripple.id}
                            className="absolute rounded-full"
                            style={{
                                left: ripple.x,
                                top: ripple.y,
                                width: ripple.size * 2,
                                height: ripple.size * 2,
                                marginLeft: -ripple.size,
                                marginTop: -ripple.size,
                                border: `2px solid ${color}`,
                                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`
                            }}
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
