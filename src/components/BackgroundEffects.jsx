import { useEffect, useState } from 'react';

const BackgroundEffects = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 12;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      tx: -50 + Math.random() * 100,
      delay: Math.random() * -30,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      <div className="noise-overlay fixed top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none z-[9999]" />
      <div id="particles-container" className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle absolute w-0.5 h-0.5 bg-gold rounded-full opacity-30 blur-[1px]"
            style={{
              left: `${p.x}%`,
              '--duration': `${p.duration}s`,
              '--tx': `${p.tx}px`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;
