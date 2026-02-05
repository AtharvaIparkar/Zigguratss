import { useState, useEffect, useRef } from 'react';

/**
 * Spring physics hook for smooth, natural animations
 * @param {Object} target - Target position { x, y, rotation, etc. }
 * @param {Object} config - Spring configuration
 */
export const useSpringPhysics = (target = {}, config = {}) => {
    const {
        stiffness = 170,
        damping = 26,
        mass = 1,
        precision = 0.01
    } = config;

    const [current, setCurrent] = useState(target);
    const velocity = useRef({});
    const frameRef = useRef();

    // Initialize velocity for all target keys
    useEffect(() => {
        Object.keys(target).forEach(key => {
            if (velocity.current[key] === undefined) {
                velocity.current[key] = 0;
            }
        });
    }, [target]);

    useEffect(() => {
        let lastTime = performance.now();

        const animate = (time) => {
            const deltaTime = Math.min((time - lastTime) / 1000, 0.064); // Cap at ~15fps
            lastTime = time;

            let hasMovement = false;

            setCurrent(prev => {
                const next = { ...prev };

                Object.keys(target).forEach(key => {
                    const displacement = target[key] - prev[key];
                    const springForce = displacement * stiffness;
                    const dampingForce = velocity.current[key] * damping;
                    const acceleration = (springForce - dampingForce) / mass;

                    velocity.current[key] += acceleration * deltaTime;
                    next[key] = prev[key] + velocity.current[key] * deltaTime;

                    // Check if still moving
                    if (Math.abs(displacement) > precision || Math.abs(velocity.current[key]) > precision) {
                        hasMovement = true;
                    } else {
                        // Snap to target when very close
                        next[key] = target[key];
                        velocity.current[key] = 0;
                    }
                });

                return next;
            });

            if (hasMovement) {
                frameRef.current = requestAnimationFrame(animate);
            }
        };

        frameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameRef.current);
    }, [target, stiffness, damping, mass, precision]);

    return current;
};
