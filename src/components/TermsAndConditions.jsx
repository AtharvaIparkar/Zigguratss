import React, { useEffect, useRef } from 'react';

const TermsAndConditions = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });

    const blocks = containerRef.current.querySelectorAll('.reveal-block');
    blocks.forEach((block, index) => {
      block.style.transitionDelay = `${index * 150}ms`;
      observer.observe(block);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main ref={containerRef} className="container mx-auto max-w-[1100px] px-10 py-[100px] relative z-10">
      {/* CHAPTER I */}
      <section className="reveal-block mb-[100px]" data-chapter="1">
        <div className="font-mono text-gold text-[11px] tracking-widest uppercase mb-3">—— CHAPTER I</div>
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-[60px] items-start">
          <div>
            <h1 className="text-gold text-[3.5rem] mb-6">Terms of Use</h1>
            <div className="text-[#a0a0a0] leading-relaxed">
              <p className="mb-4">Welcome to The Digital Curator. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these Terms.</p>
              <p className="mb-4">You agree to use our site for lawful purposes only and in a way that does not infringe the rights of others or restrict their use and enjoyment of the site. Prohibited behavior includes harassing or causing distress to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our site.</p>
              <ul className="mt-5 space-y-2.5">
                <li className="relative pl-[25px] before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-gold before:rounded-full">Intellectual property rights remain strictly with the originators.</li>
                <li className="relative pl-[25px] before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-gold before:rounded-full">Platform access is granted as a revocable limited license.</li>
              </ul>
            </div>
          </div>
          <div>
            <div className="bg-card-bg border border-white/10 p-10 rounded-xl transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(245,200,66,0.1)]">
              <div className="font-mono text-gold text-[11px] tracking-widest uppercase mb-3 text-right md:text-left">CHAPTER II</div>
              <h2 className="text-white text-[2.2rem] mb-4">Orders & Acquisitions</h2>
              <div className="text-[#a0a0a0] leading-relaxed">
                <p className="mb-4">All orders placed through The Digital Curator are subject to acceptance and availability. We reserve the right to refuse service to anyone at our discretion.</p>
                <div className="bg-[#121212] p-6 mt-5 border border-white/10 rounded-lg">
                  <span className="text-gold text-[10px] tracking-widest uppercase block mb-2.5 font-mono">AUTHENTICATION</span>
                  <p className="italic">Every acquisition is accompanied by a digital certificate of provenance, ensuring your piece is of verified curator-grade asset.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER III */}
      <section className="reveal-block mb-[100px]" data-chapter="3">
        <div className="font-mono text-gold text-[11px] tracking-widest uppercase mb-3">—— CHAPTER III</div>
        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] bg-card-bg border border-white/10 min-h-[450px]">
          <div className="noise-overlay bg-[linear-gradient(135deg,rgba(80,80,80,0.2)_0%,rgba(20,20,20,0.8)_100%)] bg-cover border-r border-white/10 opacity-60 min-h-[150px] md:min-h-full"></div>
          <div className="p-10 md:p-[60px]">
            <h2 className="text-gold text-[3rem] mb-10">Cancel & Return Policy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-white font-bold text-[1.2rem] mb-3">The Cooling Period</h3>
                <p className="text-[#a0a0a0] text-[0.9rem]">You have the right to cancel your order within 14 days of receiving your item without giving any reason. The cancellation period will expire after 14 days from the day you acquire physical possession of the goods.</p>
              </div>
              <div>
                <h3 className="text-white font-bold text-[1.2rem] mb-3">Restoration & Care</h3>
                <p className="text-[#a0a0a0] text-[0.9rem]">To exercise the right to cancel, you must inform us via a clear statement. Items must be returned in their original condition and packaging to ensure the preservation of the artwork's value.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER IV & V */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-[100px]">
        <section className="reveal-block" data-chapter="4">
          <div className="font-mono text-gold text-[11px] tracking-widest uppercase mb-3">—— CHAPTER IV</div>
          <div className="bg-card-bg border border-white/10 p-10 h-full transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(245,200,66,0.1)]">
            <h2 className="text-white text-[2.2rem] mb-4">Sales & Pricing</h2>
            <p className="text-[#a0a0a0] leading-relaxed">Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.</p>
            <div className="flex gap-2.5 my-[25px]">
              {['USD', 'EUR', 'GBP'].map(curr => (
                <span key={curr} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono">{curr}</span>
              ))}
            </div>
            <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#a0a0a0]">GLOBAL CURRENCIES ACCEPTED</div>
          </div>
        </section>

        <section className="reveal-block" data-chapter="5">
          <div className="font-mono text-gold text-[11px] tracking-widest uppercase mb-3">—— CHAPTER V</div>
          <div className="bg-card-bg border border-white/10 p-10 h-full relative overflow-hidden transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(245,200,66,0.1)]">
            <div className="absolute top-[30px] right-[30px] opacity-10 w-[60px] h-[60px]">
              <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <h2 className="text-gold text-[2.2rem] mb-4">Tax Obligations</h2>
            <p className="text-[#a0a0a0] leading-relaxed">The purchaser is responsible for any customs and import taxes that may apply. The Digital Curator is not responsible for delays due to customs procedures in your local territory.</p>
          </div>
        </section>
      </div>

      {/* CHAPTER VI */}
      <section className="reveal-block mb-[100px]" data-chapter="6">
        <div className="font-mono text-gold text-[11px] tracking-widest uppercase mb-3">—— CHAPTER VI</div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex-1">
            <h1 className="text-gold text-[5rem] font-bold leading-[0.9] tracking-tight mb-6 md:mb-0 uppercase">OWNERSHIP TRANSFER</h1>
            <p className="text-[#a0a0a0] text-[0.9rem] leading-relaxed mt-4">The Artwork shall be and remain at the risk of the Seller/Artist until it is shipped and reach to the Buyer and thereafter the risk shall shift to the Buyer.</p>
          </div>
          <div className="flex-[0.8] text-right">
            <div className="floating-doc max-w-full opacity-80 contrast-[1.1] brightness-[0.8] sepia-[0.3]" />
          </div>
        </div>
      </section>

      {/* ACTION BLOCK */}
      <section className="text-center py-20 reveal-block">
        <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#a0a0a0] mb-[30px]">ACKNOWLEDGMENT REQUIRED</div>
        <button className="group relative bg-gold text-black px-[60px] py-5 font-serif font-bold text-[1.1rem] uppercase overflow-hidden transition-transform active:scale-95">
          <span className="relative z-10">Accept Terms</span>
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-[600ms] group-hover:left-full z-0"></div>
        </button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 pt-20 pb-10 text-center">
        <div className="text-gold font-mono text-[10px] tracking-[0.3em] uppercase mb-[30px] font-bold">ZIGGURATSS ARTWORK LLP</div>
        <nav className="flex justify-center gap-10 mb-10">
          {['LEGAL', 'PRIVACY POLICY', 'CONTACT'].map(link => (
            <a key={link} href="#" className="text-white hover:text-gold transition-colors font-mono text-[11px] tracking-widest">{link}</a>
          ))}
        </nav>
        <div className="text-[#a0a0a0] text-[0.75rem]">Copyright © 2026 Zigguratss Artwork LLP. All Rights Reserved.</div>
      </footer>
    </main>
  );
};

export default TermsAndConditions;
