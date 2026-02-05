import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for anti-gravity physics simulation
 * @param {Object} options Physics configuration
 */
export const useAntiGravityPhysics = ({
    gravity = -0.1,
    drag = 0.98,
    bounce = 0.3,
    stiffness = 100,
    damping = 10,
    maxDisplacement = 40,
} = {}) => {
    const [position, setPosition] = useState({ y: 0, r: 0 });
    const velocity = useRef({ y: 0, r: 0 });
    const frameId = useRef();

    useEffect(() => {
        let lastTime = performance.now();

        const animate = (time) => {
            const dt = (time - lastTime) / 16.67; // Normalize to 60fps
            lastTime = time;

            // 1. Gravity (actually anti-gravity, pulling up)
            velocity.current.y += gravity * dt;

            // 2. Sine wave base motion (gentle floating)
            const sineWave = Math.sin(time / 1000) * 0.5;
            velocity.current.y += sineWave * dt;

            // 3. Air Resistance (Drag)
            velocity.current.y *= drag;
            velocity.current.r *= drag;

            // 4. Update Position
            setPosition(prev => {
                let newY = prev.y + velocity.current.y * dt;
                let newR = prev.r + (Math.sin(time / 2000) * 0.05) * dt; // Subtle rotation

                // 5. Boundary Check & Bounce
                if (Math.abs(newY) > maxDisplacement) {
                    velocity.current.y *= -bounce;
                    newY = Math.sign(newY) * maxDisplacement;
                }

                return { y: newY, r: newR };
            });

            frameId.current = requestAnimationFrame(animate);
        };

        frameId.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId.current);
    }, [gravity, drag, bounce, maxDisplacement]);

    return position;
};
