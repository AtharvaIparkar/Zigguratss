import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AntiGravityContext = createContext(null);

export const useAntiGravity = () => useContext(AntiGravityContext);

export const AntiGravityContainer = ({ children, className = "" }) => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsActive(entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <AntiGravityContext.Provider value={{ isActive, scrollYProgress }}>
            <div
                ref={containerRef}
                className={`relative overflow-hidden ${className}`}
                style={{ perspective: '1200px' }}
            >
                {children}
            </div>
        </AntiGravityContext.Provider>
    );
};
