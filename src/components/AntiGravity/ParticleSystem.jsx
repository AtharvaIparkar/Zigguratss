import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Utility to create a cached orb canvas for better performance
const createOrbCache = (size, glow, color) => {
    const canvas = document.createElement('canvas');
    const totalSize = (size + glow) * 2;
    canvas.width = totalSize;
    canvas.height = totalSize;
    const ctx = canvas.getContext('2d');

    const center = totalSize / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, size + glow);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, 'transparent');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(center, center, size + glow, 0, Math.PI * 2);
    ctx.fill();

    return canvas;
};

class Particle {
    constructor(canvas, type = 'dust') {
        this.canvas = canvas;
        this.type = type;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;

        switch (this.type) {
            case 'orb':
                this.size = Math.random() * 4 + 2;
                this.baseVx = (Math.random() - 0.5) * 0.3;
                this.baseVy = (Math.random() - 0.5) * 0.3;
                this.glow = Math.random() * 10 + 5;
                this.color = `hsla(${Math.random() * 60 + 30}, 70%, 65%, 0.6)`;
                // Pre-render the orb to an offscreen canvas
                this.cachedCanvas = createOrbCache(this.size, this.glow, this.color);
                break;
            case 'star':
                this.size = Math.random() * 2 + 1;
                this.baseVx = (Math.random() - 0.5) * 0.1;
                this.baseVy = -Math.random() * 0.2 - 0.05;
                this.twinkle = Math.random() * Math.PI * 2;
                this.color = `hsla(45, 80%, 80%, ${Math.random() * 0.4 + 0.2})`;
                break;
            default:
                this.size = Math.random() * 2 + 0.5;
                this.baseVx = (Math.random() - 0.5) * 0.2;
                this.baseVy = (Math.random() - 0.5) * 0.2;
                this.color = `hsla(0, 0%, 70%, ${Math.random() * 0.3 + 0.1})`;
        }

        this.vx = this.baseVx;
        this.vy = this.baseVy;
    }

    update(mouseX, mouseY, deltaTime) {
        if (mouseX !== null && mouseY !== null) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 150;

            if (distance < maxDistance) {
                const force = (1 - distance / maxDistance) * 0.5;
                this.vx += (dx / distance) * force * deltaTime;
                this.vy += (dy / distance) * force * deltaTime;
            }
        }

        this.vy -= 0.01 * deltaTime;
        const damping = 0.98;
        this.vx *= damping;
        this.vy *= damping;

        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;

        if (this.type === 'star') {
            this.twinkle += 0.05 * deltaTime;
        }

        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;
    }

    draw(ctx) {
        switch (this.type) {
            case 'orb':
                if (this.cachedCanvas) {
                    const offset = this.cachedCanvas.width / 2;
                    ctx.drawImage(this.cachedCanvas, this.x - offset, this.y - offset);
                }
                break;

            case 'star':
                const alpha = Math.abs(Math.sin(this.twinkle)) * 0.5 + 0.3;
                ctx.fillStyle = this.color.replace(/[\d.]+\)$/, `${alpha})`);
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                if (alpha > 0.6) {
                    ctx.strokeStyle = this.color.replace(/[\d.]+\)$/, `${alpha * 0.5})`);
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(this.x - this.size * 2, this.y);
                    ctx.lineTo(this.x + this.size * 2, this.y);
                    ctx.moveTo(this.x, this.y - this.size * 2);
                    ctx.lineTo(this.x, this.y + this.size * 2);
                    ctx.stroke();
                }
                break;

            default:
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
        }
    }
}

export const ParticleSystem = ({
    particleCount = 80,
    types = ['dust', 'star', 'orb'],
    className = ''
}) => {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: null, y: null });
    const frameRef = useRef();
    const lastTimeRef = useRef(performance.now());

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        particlesRef.current = Array.from({ length: particleCount }, () => {
            const type = types[Math.floor(Math.random() * types.length)];
            return new Particle(canvas, type);
        });

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        const handleMouseLeave = () => {
            mouseRef.current = { x: null, y: null };
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        const animate = (currentTime) => {
            const deltaTime = Math.min((currentTime - lastTimeRef.current) / 16, 2);
            lastTimeRef.current = currentTime;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(mouseRef.current.x, mouseRef.current.y, deltaTime);
                particles[i].draw(ctx);
            }

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(frameRef.current);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [particleCount, types]);

    return (
        <motion.canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none z-0 ${className}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
        />
    );
};
