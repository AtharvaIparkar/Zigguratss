import React, { useState, useEffect, useRef } from 'react';
import { Check, Image as ImageIcon } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import Lenis from 'lenis';

/* -------------------------------------------------------------------------- */
/*                                CUSTOM STYLES                               */
/* -------------------------------------------------------------------------- */

const ZigguratssStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:ital,wght@0,900;1,900&family=Space+Mono&display=swap');

    :root {
      --amber-gold: #f5c842;
      --amber-gold-8: rgba(245, 200, 66, 0.08);
      --deep-black: #0a0a0a;
    }

    .font-lato { font-family: 'Lato', sans-serif; }
    .font-serif { font-family: 'Playfair Display', serif; }
    .font-mono { font-family: 'Space Mono', monospace; }

    .velvet-texture::before {
      content: "";
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url("https://grainy-gradients.vercel.app/noise.svg");
      opacity: 0.05;
      pointer-events: none;
      z-index: 100;
    }

    .glass-card {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%);
      backdrop-filter: blur(24px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 0 50px rgba(0,0,0,0.5);
    }

    .glass-card::after {
      content: "";
      position: absolute;
      inset: 0;
      border-radius: inherit;
      border: 1px solid rgba(255, 255, 255, 0.05);
      pointer-events: none;
      mask-image: linear-gradient(to bottom right, black, transparent);
    }

    .holographic-text {
      background: linear-gradient(90deg, #f5c842 0%, #fff 25%, #f5c842 50%, #8a6d3b 75%, #f5c842 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      transition: 0.5s;
    }

    .holographic-text:hover {
      animation: holographic 3s linear infinite;
    }

    @keyframes holographic {
      0% { background-position: 0% 50%; }
      100% { background-position: 100% 50%; }
    }

    .ambient-glow {
      position: fixed;
      top: var(--y, 0px);
      left: var(--x, 0px);
      width: 60vw;
      height: 60vh;
      background: radial-gradient(circle, rgba(245, 200, 66, 0.08) 0%, transparent 70%);
      pointer-events: none;
      z-index: 1;
      transform: translate(-50%, -50%);
      transition: transform 0.5s cubic-bezier(0.1, 0.4, 0.1, 1);
    }

    .metadata-gutter {
      position: absolute;
      left: 2.5rem;
      top: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-top: 6rem;
      pointer-events: none;
      opacity: 0.2;
      border-left: 1px solid rgba(245, 200, 66, 0.2);
      padding-left: 1rem;
    }

    .art-frame-outline {
      position: absolute;
      border: 1px solid rgba(245, 200, 66, 0.05);
      pointer-events: none;
      z-index: 0;
    }

    @keyframes rgb-shift {
      0% { text-shadow: 2px 0 #f00, -2px 0 #0ff; filter: blur(2px); }
      100% { text-shadow: 0 0 transparent; filter: blur(0); }
    }

    .light-leak {
      position: absolute;
      border-radius: 9999px;
      filter: blur(100px);
      pointer-events: none;
      opacity: 0.1;
      background: radial-gradient(circle, var(--amber-gold) 0%, transparent 80%);
    }

    .letter-normal { letter-spacing: normal; }
    .tracking-extreme { letter-spacing: 0.4em; }

    @keyframes scan {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }
    .animate-scan { animation: scan 15s linear infinite; }

    @keyframes float-up {
      0% { transform: translateY(110vh) translateX(0); opacity: 0; }
      20% { opacity: 0.15; }
      80% { opacity: 0.15; }
      100% { transform: translateY(-10vh) translateX(30px); opacity: 0; }
    }
    .animate-float-up { animation: float-up var(--duration) linear infinite; }

    @keyframes pulse-soft {
      0%, 100% { opacity: 0.2; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.1); }
    }
    .animate-pulse-soft { animation: pulse-soft 6s ease-in-out infinite; }

    ::selection {
      background: var(--amber-gold);
      color: black;
    }

    /* Lenis Smooth Scroll Overrides */
    html.lenis {
      height: auto;
    }
    .lenis.lenis-smooth {
      scroll-behavior: auto !important;
    }
    .lenis.lenis-smooth [data-lenis-prevent] {
      overscroll-behavior: contain;
    }
    .lenis.lenis-stopped {
      overflow: hidden;
    }
    .lenis.lenis-scrolling iframe {
      pointer-events: none;
    }
  ` }} />
);

/* -------------------------------------------------------------------------- */
/*                               SUB-COMPONENTS                               */
/* -------------------------------------------------------------------------- */

const BackgroundEffects = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotateArr = useTransform(scrollYProgress, [0, 1], [0, 45]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#050505]">
      <div className="velvet-texture fixed inset-0 opacity-10" />
      
      {/* ATMOSPHERIC HAZE BLOOMS (PARALLAX) */}
      <motion.div style={{ y: y1 }} className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-amber-gold/5 blur-[150px] rounded-full animate-pulse-soft opacity-40 mix-blend-soft-light" />
      <motion.div style={{ y: y2 }} className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-amber-gold/3 blur-[200px] rounded-full animate-pulse-soft opacity-30 mix-blend-soft-light" />
      
      <div className="light-leak top-0 left-0 w-[40vw] h-[40vw] opacity-20" />
      <div className="light-leak bottom-0 right-0 w-[50vw] h-[50vw] rotate-180 opacity-15" />
      
      <div className="fixed top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-gold/10 to-transparent animate-scan z-50 pointer-events-none" />
      
      <div className="ambient-glow" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }} />
      
      {/* PARALLAX ART FRAME OUTLINES */}
      <motion.div style={{ y: y1, rotate: rotateArr }} className="art-frame-outline w-[40vw] h-[60vh] top-[15%] left-[10%] opacity-5" />
      <motion.div style={{ y: y2, rotate: rotateArr }} className="art-frame-outline w-[30vw] h-[40vh] top-[60%] left-[70%] opacity-3" />
      <motion.div style={{ y: y1, rotate: -rotateArr }} className="art-frame-outline w-[50vw] h-[30vh] top-[30%] left-[50%] opacity-4" />
      
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-amber-gold/20 animate-float-up ${i % 2 === 0 ? 'w-1 h-1' : 'w-0.5 h-0.5'}`}
            style={{
              left: `${Math.random() * 100}%`,
              '--duration': `${15 + Math.random() * 20}s`,
              animationDelay: `${Math.random() * 20}s`,
              opacity: Math.random() * 0.3,
            }}
          />
        ))}
      </div>

      {/* CUSTOM CURSOR */}
      <motion.div 
        className="fixed top-0 left-0 w-2 h-2 bg-amber-gold rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2" 
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", damping: 30, stiffness: 400, mass: 0.1 }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-8 h-8 border border-amber-gold/30 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{ type: "spring", damping: 20, stiffness: 200, mass: 0.5 }}
      />
    </div>
  );
};

const Ticker = () => {
  const currencies = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD'];
  return (
    <div className="w-full overflow-hidden whitespace-nowrap py-3 relative border-y border-amber-gold/10 mt-6 group">
      <div className="inline-block animate-[holographic_20s_linear_infinite] whitespace-nowrap select-none">
        {Array(4).fill(currencies).flat().map((curr, i) => (
          <span key={i} className="font-mono text-[11px] tracking-extreme mx-10 text-amber-gold/40 hover:text-amber-gold transition-colors cursor-default">
            {curr} · {curr === 'INR' ? '₹' : curr === 'USD' ? '$' : curr === 'EUR' ? '€' : '£'}
          </span>
        ))}
      </div>
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
    </div>
  );
};

const Header = () => {
  const words1 = "GENERAL TERMS AND CONDITIONS".split(" ");
  const words2 = "FOR ARTIST'S AND BUYER'S".split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
    },
  };

  return (
    <header className="pt-48 pb-32 max-w-7xl mx-auto px-10 xl:px-48 relative overflow-hidden flex flex-col items-start text-left">
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-amber-gold/10 to-transparent pointer-events-none z-0" />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="label text-amber-gold mb-6 tracking-extreme flex items-center gap-4">
          <div className="w-12 h-[1px] bg-amber-gold" />Zigguratss · Artwork Marketplace
        </div>
      </motion.div>

      <div className="relative z-10 w-full mb-12">
        <motion.h1 
          className="text-[5.5vw] leading-[1] font-serif font-black uppercase tracking-tight flex flex-wrap gap-x-[0.5em]"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {words1.map((word, idx) => (
            <motion.span variants={child} key={idx} className="holographic-text">{word}</motion.span>
          ))}
        </motion.h1>
        <motion.h1 
          className="text-[5.5vw] leading-[1] font-serif font-black uppercase tracking-tight flex flex-wrap gap-x-[0.5em]"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {words2.map((word, idx) => (
            <motion.span variants={child} key={idx} className="holographic-text">{word}</motion.span>
          ))}
        </motion.h1>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 2 }}
        className="mt-12 group"
      >
        <div className="flex items-center gap-6">
          <motion.div 
            animate={{ width: [128, 192, 128] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="h-[1px] bg-amber-gold/30" 
          />
          <span className="label lowercase italic letter-normal">Scroll to Begin Exploration</span>
        </div>
      </motion.div>
    </header>
  );
};

const Section = ({ title, children, layout = "default", metadata = {}, watermark = "" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1 }}
      className="relative w-full max-w-7xl mx-auto py-20 px-10 xl:px-48 border-b border-white/5"
    >
      <div className="metadata-gutter hidden xl:flex">
        <span className="label text-amber-gold mb-2">{metadata.chapter || 'CH --'}</span>
        <span className="label text-white/40 mb-2">{metadata.year || '24'}</span>
        <div className="w-[1px] bg-amber-gold/20 flex-1" />
        <span className="label text-white/40 rotate-180 [writing-mode:vertical-lr] mt-4">ZIGGURATSS ARTWORK</span>
      </div>
      
      {watermark && <span className="watermark select-none translate-y-10">{watermark}</span>}
      
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {layout === "split" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start relative z-10 w-full">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-[3.5rem] leading-none mb-8 tracking-tight uppercase holographic-text relative inline-block group">
                {title}
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute -bottom-2 left-0 h-[1.5px] bg-amber-gold" 
                />
              </h2>
            </motion.div>
            <motion.div 
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-white/40 text-lg space-y-6"
            >
              {children}
            </motion.div>
          </div>
        ) : layout === "card" ? (
          <motion.div 
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="glass-card p-12 md:p-20 relative z-10 group rounded-sm transition-shadow duration-700 hover:shadow-[0_0_100px_rgba(245,200,66,0.06)]"
          >
            <div className="label text-amber-gold/40 mb-6 flex items-center gap-4"><div className="w-8 h-[1px] bg-amber-gold/40" />AUTHENTICATED DOCUMENT</div>
            <h2 className="text-[3rem] leading-none mb-8 tracking-tight uppercase group-hover:text-amber-gold transition-colors duration-500">{title}</h2>
            <div className="text-white/40 text-lg space-y-6 max-w-3xl">{children}</div>
          </motion.div>
        ) : (
          <div className="relative z-10 w-full">
            <h2 className="text-[3.5rem] leading-none mb-8 tracking-tight uppercase relative inline-block group holographic-text">
              {title}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute -bottom-2 left-0 h-[1.5px] bg-amber-gold" 
              />
            </h2>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white/40 text-lg space-y-6 max-w-4xl"
            >
              {children}
            </motion.div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                MAIN COMPONENT                              */
/* -------------------------------------------------------------------------- */

const TermsAndConditions = () => {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="font-lato relative z-10 w-full overflow-hidden bg-[#050505] text-white">
      <ZigguratssStyles />
      <BackgroundEffects />
      <Header />
      
      <Section title="Terms of Use" layout="default" metadata={{ chapter: 'CH 01', year: '24' }}>
        <div className="flex gap-12 items-start group">
          <div className="w-[1px] bg-amber-gold/20 h-40 self-stretch relative group-hover:bg-amber-gold/40 transition-colors duration-700">
            <motion.div 
              animate={{ height: ["10%", "60%", "10%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-[-1px] w-[3px] bg-amber-gold shadow-[0_0_20px_var(--amber-gold)]" 
            />
          </div>
          <p className="max-w-3xl leading-[2]"><span className="text-6xl font-serif text-amber-gold float-left mr-4 mt-2 h-14 flex items-center">T</span>he sale made through Zigguratss are contracted directly between the buyer and the Seller/Artist. Zigguratss is not, in any respect, a reseller of the artworks proposed by the seller through Zigguratss. Zigguratss acts simply as a middleman, in the context of the provision of the site that allows Seller/Artist and buyers to connect and do business. The artworks offered for sale on Zigguratss by the Seller/Artist are subject to their availability. The artworks made available for sale on the website may not always be in the physical possession of Zigguratss and may be physically located anywhere in the world.</p>
        </div>
      </Section>

      <Section title="Orders" layout="card" metadata={{ chapter: 'CH 02', year: '24' }}>
        <p>Each of the artwork comes with a short explanation sheet containing information about its dimension, weight, type etc. To order an artwork, the buyer must select the artwork of choice and add it in the cart and provide the necessary personal information to place the order. Before finalising the order, the buyer must check the information on the order summary, if found any mistakes, the buyer can correct them before finalising the order. The buyer payment will be returned in full if the artwork's availability from the artists is not possible due to any unforeseen reasons. The same shall be intimated to the buyer within 24 hours of his purchase of artwork from online portal of Zigguratss. If the artwork is no longer available, an email regarding the same will be sent to buyer within 48 hours, cancelling the order.</p>
      </Section>

      <Section title="Sales Prices and Terms of Payment" layout="default" metadata={{ chapter: 'CH 03', year: '24' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6"><p>All artworks made available for sale on the website will be sold at the listed price and no discounts will be granted to the buyer. The information provided during registration or amended at the time of finalising a purchase shall be the final billing address and shipping address for delivery of the object. Shipping cost is included in the cost of artwork.</p></div>
          <div className="space-y-6"><p>The artist must add the cost of shipping in his/her artist price depending upon the type of artwork, its dimension, its weight, as well as the place of delivery. Transfer of ownership happens as soon as the full price has been paid by the buyer. Failure to do so, will automatically cancels the order.</p></div>
        </div>
        <div className="space-y-12"><Ticker /><p className="text-white/30 text-sm max-w-5xl">The contract of sale is between Zigguratss (acting as the agent of the Seller/Artist) and the buyer. Zigguratss shall assume no responsibility for any errors or omissions that may occur in the description, pricing or other content related to the artwork. In the event of such error, Zigguratss reserves the right to cancel the order placed by the buyer by informing the buyer in writing. You agree to abide by all provisions prescribed in these terms and conditions.</p></div>
      </Section>

      <Section title="Refund Policy" layout="card" metadata={{ chapter: 'CH 04', year: '24' }}>
        <div className="border-l-[1px] border-amber-gold/20 pl-10 relative z-10 overflow-hidden space-y-8"><p>Art is precious and valuable, it takes time to complete a single work of art. Due to its fragile and singular nature we are unable to allow returns. Hence, we urge you to be certain of your decision before purchasing it. We are always available to ensure that the art you see is the art you get. If you're in doubt, you can always ask for additional images of the artworks. However, there may be times when you receive an item in damaged condition, in which case we will ensure a timely resolution keeping in mind your interest. This may be through repair, exchange or return of the product. Refund request must be raised immediately i.e, within 24 hours of receipt of artwork, through Customer dashboard alongwith photographs of the damaged Artwork.</p></div>
      </Section>

      <Section title="Cancel and Return Policy" layout="default" metadata={{ chapter: 'CH 05', year: '24' }}>
        <div className="space-y-16">
          <p>No cancellation policy - Should a Seller/Artist become aware of any reason which may cause a delay in delivery of and artwork, Seller/Artist will immediately notified of such reasons and expected delay time.</p>
          <div className="flex items-center justify-start gap-12 group"><div className="h-[1px] bg-gradient-to-r from-amber-gold/40 to-transparent w-48 group-hover:w-64 transition-all duration-1000" /><span className="serif text-3xl uppercase tracking-widest text-amber-gold holographic-text">OR</span><div className="h-[1px] bg-gradient-to-l from-amber-gold/40 to-transparent w-48 group-hover:w-64 transition-all duration-1000" /></div>
          <p>If a buyer elects a return of art (only if met by Zigguratss refund policy), the buyer must raise a request immediately through Customer dashboard after receipt of Artwork alongwith photographs of the damaged Artwork.</p>
          <motion.div 
            whileInView={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="glass-card p-12 md:p-16 rounded-sm border-amber-gold/10"
          >
            <p className="text-amber-gold/60 font-medium italic text-xl leading-relaxed">Insurance, packing and shipping fees associated with the return of the returned item shall be the sole responsibility of the Seller, and Zigguratss shall have no obligation to reimburse the Seller for such amounts.</p>
          </motion.div>
        </div>
      </Section>

      <Section title="Taxes" layout="default" metadata={{ chapter: 'CH 06', year: '24' }}>
        <div className="border-t border-amber-gold/10 pt-12 flex flex-col md:flex-row gap-12 items-start"><div className="label text-amber-gold/40 rotate-90 origin-left mt-8 [writing-mode:vertical-lr] tracking-extreme">REGULATORY COMPLIANCE</div><p className="text-2xl flex-1 leading-relaxed">Buyer's is responsible for paying all fees/costs/charges associated with the use of the website to purchase Artwork and you agree to bear any and all applicable taxes/GST, Cess, Custom Duties, Octoroi, etc. levied thereon.</p></div>
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <Section title="Fees" metadata={{ chapter: 'CH 07' }}><p>The profit ratio will be shared with you on individual basis via email or any other mode of contact. For commission work percentage will be negotiated over the call as there is no fixed criteria for commission.</p></Section>
        <Section title="Remittance" metadata={{ chapter: 'CH 08' }}><p>Zigguratss shall remit the purchase fees to seller, after deducting the Zigguratss commissions, within 21 days after the full confirmation of the artwork obtained by the buyer.</p></Section>
        <Section title="Purchasing" metadata={{ chapter: 'CH 09' }}><p>All artwork posted for sale by Artist on the Zigguratss website is supported by an authenticity certificate from the Artist themselves. Zigguratss does not issue any authenticity certificate of its own.</p></Section>
        <Section title="Transfer" metadata={{ chapter: 'CH 10' }}><p>The Artwork shall be and remain at the risk of the Seller/Artist until it is shipped and reach to the Buyer and thereafter the risk shall shift to the Buyer.</p></Section>
      </div>

      <section className="py-64 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="label mb-12 text-amber-gold/40 flex items-center justify-center gap-6"
        >
          <div className="w-12 h-[1px] bg-amber-gold/20" />ACKNOWLEDGMENT REQUIRED<div className="w-12 h-[1px] bg-amber-gold/20" />
        </motion.div>
        {!accepted ? (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAccepted(true)} 
            className="group relative bg-amber-gold text-black font-serif font-black px-32 py-8 text-2xl uppercase tracking-[0.2em] transition-all duration-500 shadow-[0_30px_60px_rgba(245,200,66,0.15)]"
          >
            <span className="relative z-10">Accept Terms</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-0 opacity-20" />
          </motion.button>
        ) : (
          <div className="flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
              className="w-32 h-32 rounded-full border border-amber-gold/30 flex items-center justify-center mb-10 bg-amber-gold/5 relative"
            >
              <div className="absolute inset-0 rounded-full border border-amber-gold animate-ping opacity-20" style={{ animationDuration: '3s' }} />
              <Check className="text-amber-gold" size={64} strokeWidth={1.5} />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="serif text-[3.5rem] text-amber-gold italic holographic-text animate-pulse"
            >
              Agreement recorded — Welcome to Zigguratss
            </motion.p>
          </div>
        )}
      </section>

      <footer className="py-24 border-t border-white/5 text-center px-10 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]"><span className="serif text-[40vw] font-black uppercase tracking-tighter">ZIGGURATSS</span></div>
        <div className="label text-amber-gold mb-12 tracking-[0.8em] text-2xl font-black relative z-10 holographic-text">ZIGGURATSS ARTWORK LLP</div>
        <div className="flex flex-wrap gap-12 justify-center mb-12 relative z-10">{['LEGAL', 'PRIVACY POLICY', 'CONTACT'].map(l => (<a key={l} href="#" className="label hover:text-amber-gold transition-colors duration-500 hover:tracking-[0.5em]">{l}</a>))}</div>
        <div className="label text-white/10 text-[10px] relative z-10">© 2024 ZIGGURATSS ARTWORK LLP. ALL RIGHTS RESERVED.</div>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
