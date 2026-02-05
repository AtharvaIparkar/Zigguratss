import React, { createContext, useContext, useRef, useState, useEffect } from 'react';

const MagneticContext = createContext(null);

export const useMagneticField = () => useContext(MagneticContext);

export const MagneticField = ({
    children,
    strength = 0.3,
    radius = 100,
    className = ''
}) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const getMagneticForce = (elementRef) => {
        if (!elementRef.current || !containerRef.current) return { x: 0, y: 0 };

        const rect = elementRef.current.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;

        const dx = mousePosition.x - elementCenterX;
        const dy = mousePosition.y - elementCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > radius) return { x: 0, y: 0 };

        const force = (1 - distance / radius) * strength;
        return {
            x: dx * force,
            y: dy * force,
            distance,
            isActive: distance < radius
        };
    };

    return (
        <MagneticContext.Provider value={{ getMagneticForce, mousePosition }}>
            <div ref={containerRef} className={className}>
                {children}
            </div>
        </MagneticContext.Provider>
    );
};

// Hook for individual elements to use magnetic effect
export const useMagnetic = (elementRef, config = {}) => {
    const context = useMagneticField();
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const velocityRef = useRef({ x: 0, y: 0 });
    const frameRef = useRef();

    const {
        stiffness = 0.15,
        damping = 0.7,
        mass = 1
    } = config;

    useEffect(() => {
        if (!context) return;

        const animate = () => {
            const force = context.getMagneticForce(elementRef);

            // Spring physics
            const ax = (force.x - offset.x) * stiffness / mass;
            const ay = (force.y - offset.y) * stiffness / mass;

            velocityRef.current.x += ax;
            velocityRef.current.y += ay;

            velocityRef.current.x *= damping;
            velocityRef.current.y *= damping;

            setOffset(prev => ({
                x: prev.x + velocityRef.current.x,
                y: prev.y + velocityRef.current.y
            }));

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameRef.current);
    }, [context, offset.x, offset.y, stiffness, damping, mass, elementRef]);

    return offset;
};
