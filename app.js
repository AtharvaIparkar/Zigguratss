// Enhanced Hero Carousel Class
class EnhancedHeroCarousel {
    constructor(data) {
        this.data = data;
        this.currentSlide = 0;
        this.slides = [];
        this.dots = [];
        this.prevBtn = null;
        this.nextBtn = null;
        this.autoplayInterval = null;
        this.flipIntervals = [];
        this.isAutoplay = data.settings.autoplay;
        this.autoplayDelay = data.settings.autoplayDelay;
        this.flipInterval = data.settings.flipInterval;
        this.flipOnClick = data.settings.flipOnClick;
        
        this.init();
    }

    async init() {
        try {
            await this.generateHTML();
            this.cacheElements();
            this.bindEvents();
            this.startAutoplay();
            this.startArtworkFlips();
            await this.preloadImages();
        } catch (error) {
            console.error('Failed to initialize carousel:', error);
        }
    }

    generateHTML() {
        return new Promise((resolve) => {
            const slidesContainer = document.getElementById('slides-container');
            const dotsContainer = document.getElementById('dots-container');
            
            this.data.slides.forEach((slideData, index) => {
                const slide = this.createSlideElement(slideData, index);
                slidesContainer.appendChild(slide);
                
                const dot = this.createDotElement(index);
                dotsContainer.appendChild(dot);
            });
            
            resolve();
        });
    }

    createSlideElement(slideData, index) {
        const slide = document.createElement('div');
        const backgroundClass = slideData.background ? slideData.background : '';
        slide.className = `slide ${index === 0 ? 'active' : ''} ${backgroundClass}`;
        slide.setAttribute('data-slide', index);
        slide.setAttribute('data-type', slideData.type);
        
        slide.innerHTML = `
            <div class="slide-content">
                <h1>${slideData.headline}</h1>
                <p>${slideData.subtext}</p>
                <a href="${slideData.cta.url}" class="cta-button">${slideData.cta.text}</a>
                <div class="quick-links">
                    ${slideData.quickLinks.map(link => 
                        `<a href="${link.url}">${link.text}</a>`
                    ).join('')}
                </div>
            </div>
            <div class="artwork-gallery">
                ${slideData.frames.map(frame => 
                    this.createArtworkFrameHTML(frame, slideData.type)
                ).join('')}
            </div>
        `;
        
        return slide;
    }

    createArtworkFrameHTML(artwork, slideType) {
        const position = artwork.position;
        const positionStyle = this.generatePositionStyle(position);
        const isStatic = slideType === 'static-cluster';
        const frameClass = isStatic ? 'artwork-frame static' : 'artwork-frame';
        const animationDelay = isStatic ? `animation-delay: ${Math.random() * 2}s;` : '';
        const adaptOrientation = artwork.adaptToOrientation ? 'data-adapt-orientation="true"' : '';
        const flipMode = artwork.flipMode || 'timed';
        const flipDelay = artwork.flipDelay || 0;
        
        if (isStatic) {
            const image = artwork.images[0];
            // Check if this is sculpture gallery (frameless)
            const isFrameless = artwork.id && artwork.id.startsWith('static-6') || artwork.id.startsWith('static-7') || artwork.id.startsWith('static-8');
            
            if (isFrameless) {
                return `
                    <div class="artwork-image-only" 
                         style="${positionStyle} ${animationDelay}" 
                         tabindex="0" 
                         role="img"
                         aria-label="${image.alt}"
                         data-artwork-id="${artwork.id}"
                         ${adaptOrientation}>
                        <img src="${image.src}" 
                             ${image.fallback ? `onerror="this.src='${image.fallback}'"` : ''}
                             alt="${image.alt}" 
                             class="frameless-image"
                             loading="lazy">
                    </div>
                `;
            }
            
            return `
                <div class="${frameClass}" 
                     style="${positionStyle} ${animationDelay}" 
                     tabindex="0" 
                     role="img" 
                     aria-label="${image.alt}"
                     data-artwork-id="${artwork.id}"
                     ${adaptOrientation}>
                    <div class="frame-inner">
                        <div class="frame-face front">
                            <img src="${image.src}" 
                                 ${image.fallback ? `onerror="this.src='${image.fallback}'"` : ''}
                                 alt="${image.alt}" 
                                 class="artwork-image"
                                 loading="lazy"
                                 onload="this.closest('.artwork-frame').classList.add('loaded')">
                        </div>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="${frameClass}" 
                     style="${positionStyle}" 
                     tabindex="0" 
                     role="button" 
                     aria-label="View artwork details - click to flip"
                     data-artwork-id="${artwork.id}"
                     data-flip-mode="${flipMode}"
                     data-flip-delay="${flipDelay}"
                     ${adaptOrientation}>
                    <div class="frame-inner">
                        ${artwork.images.map((image, index) => `
                            <div class="frame-face ${index === 0 ? 'front' : 'back'}">
                                <img src="${image.src}" 
                                 ${image.fallback ? `onerror="this.src='${image.fallback}'"` : ''}
                                 alt="${image.alt}" 
                                 class="artwork-image"
                                 loading="lazy"
                                 onload="this.closest('.artwork-frame').classList.add('loaded')">
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
    }

    generatePositionStyle(position) {
        let style = '';
        Object.entries(position).forEach(([key, value]) => {
            if (key === 'rotation') {
                style += `transform: rotate(${value}); `;
            } else if (key === 'zIndex') {
                style += `z-index: ${value}; `;
            } else {
                style += `${key}: ${value}; `;
            }
        });
        return style;
    }

    createDotElement(index) {
        const dot = document.createElement('button');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.setAttribute('data-slide', index);
        return dot;
    }

    cacheElements() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
    }

    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        this.bindTouchEvents();
        this.bindAutoplayEvents();
        this.bindArtworkEvents();
        this.bindOrientationDetection();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoplay();
            } else if (this.isAutoplay) {
                this.startAutoplay();
            }
        });
    }

    handleKeydown(e) {
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'Escape':
                this.stopAutoplay();
                break;
        }
    }

    bindTouchEvents() {
        let startX = 0;
        let endX = 0;
        
        const carousel = document.querySelector('.hero-carousel');
        
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
        }, { passive: true });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }

    bindAutoplayEvents() {
        const carousel = document.querySelector('.hero-carousel');
        carousel.addEventListener('mouseenter', () => this.stopAutoplay());
        carousel.addEventListener('mouseleave', () => this.startAutoplay());
    }

    bindArtworkEvents() {
        document.querySelectorAll('.artwork-frame:not(.static)').forEach(frame => {
            if (this.flipOnClick) {
                frame.addEventListener('click', () => this.flipFrame(frame));
            }
        });
    }

    bindOrientationDetection() {
        document.querySelectorAll('[data-adapt-orientation="true"] img').forEach(img => {
            if (img.complete) {
                this.adaptFrameOrientation(img);
            } else {
                img.addEventListener('load', () => this.adaptFrameOrientation(img));
            }
        });
    }

    adaptFrameOrientation(img) {
        const frame = img.closest('.artwork-frame');
        if (!frame) return;

        const aspectRatio = img.naturalWidth / img.naturalHeight;
        
        frame.classList.remove('frame--portrait', 'frame--landscape', 'frame--square');
        
        if (aspectRatio > 1.2) {
            frame.classList.add('frame--landscape');
        } else if (aspectRatio < 0.8) {
            frame.classList.add('frame--portrait');
        } else {
            frame.classList.add('frame--square');
        }
    }

    goToSlide(index) {
        if (index === this.currentSlide) return;
        
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].setAttribute('aria-selected', 'false');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].setAttribute('aria-selected', 'true');
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }

    startAutoplay() {
        if (this.isAutoplay && !document.hidden) {
            this.stopAutoplay();
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoplayDelay);
        }
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    flipFrame(frame) {
        const inner = frame.querySelector('.frame-inner');
        const currentRotation = inner.style.transform.includes('rotateY(180deg)') ? 180 : 0;
        const newRotation = currentRotation === 0 ? 180 : 0;
        inner.style.transform = `rotateY(${newRotation}deg)`;
    }

    startArtworkFlips() {
        if (this.data.settings.autoplayFrames) {
            setInterval(() => {
                const activeSlide = document.querySelector('.slide.active');
                const slideData = this.data.slides[this.currentSlide];
                
                if (slideData.type === 'flipping' && slideData.autoFlip) {
                    const frames = activeSlide.querySelectorAll('.artwork-frame:not(.static)');
                    
                    frames.forEach((frame, index) => {
                        const flipMode = frame.dataset.flipMode || 'timed';
                        const flipDelay = parseInt(frame.dataset.flipDelay) || 0;
                        
                        if (flipMode === 'timed') {
                            setTimeout(() => {
                                this.flipFrame(frame);
                            }, (index * 500) + flipDelay);
                        }
                    });
                }
            }, this.flipInterval);
        }
    }

    async preloadImages() {
        const images = document.querySelectorAll('.artwork-image');
        const promises = Array.from(images).map(img => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = resolve;
                }
            });
        });
        
        await Promise.all(promises);
    }
}

// Navigation Controller
class NavigationController {
    constructor() {
        this.elements = {
            mega: document.getElementById('megaPanel'),
            content: document.getElementById('megaContent'),
            navLeft: document.getElementById('navLeft'),
            search: document.getElementById('searchWrapper')
        };
        this.timer = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateRoute();
        window.addEventListener('hashchange', () => this.updateRoute());
        window.addEventListener('resize', () => {
            if (!this.isMobile()) {
                this.elements.navLeft.classList.remove('open');
            }
        });
    }

    isMobile() {
        return window.innerWidth <= 768;
    }

    render = {
        artwork: () => {
            if (this.isMobile()) {
                this.elements.content.innerHTML = `
                    <div class="col-left">
                        <div class="category-list">
                            ${data.artwork.categories.map((cat, i) => 
                                `<a href="#/artwork" class="${i === 0 ? 'active' : ''}">${cat}</a>`
                            ).join('')}
                        </div>
                    </div>`;
            } else {
                this.elements.content.innerHTML = `
                    <div class="col-left">
                        <div class="category-list">
                            ${data.artwork.categories.map((cat, i) => 
                                `<a href="#/artwork" class="${i === 0 ? 'active' : ''}">${cat}</a>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="col-mid">
                        ${Object.entries(data.artwork.filters).map(([name, items]) => `
                            <div class="col">
                                <h4>${name}</h4>
                                <ul>${items.map(item => `<li><a href="#/artwork">${item}</a></li>`).join('')}</ul>
                            </div>
                        `).join('')}
                    </div>
                    <div class="col-right">
                        <div class="thumbnail" style="background-image:url(${data.artwork.featured.image})"></div>
                        <div style="font-size:13px;color:#333333;margin-top:15px;text-align:center;font-weight:500">
                            ${data.artwork.featured.title}
                        </div>
                    </div>`;
            }
        },

        artist: () => {
            if (this.isMobile()) {
                this.elements.content.innerHTML = `
                    <div class="col-left">
                        <div class="category-list">
                            ${data.artists.categories.map((cat, i) => 
                                `<a href="#/artist" class="${i === 0 ? 'active' : ''}">${cat}</a>`
                            ).join('')}
                        </div>
                    </div>`;
            } else {
                this.elements.content.innerHTML = `
                    <div class="col-left">
                        <div class="category-list">
                            ${data.artists.categories.map((cat, i) => 
                                `<a href="#/artist" class="${i === 0 ? 'active' : ''}">${cat}</a>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="col-mid">
                        ${Object.entries(data.artists.groups).map(([name, artists]) => `
                            <div class="col">
                                <h4>${name}</h4>
                                <ul>${artists.map(artist => `<li><a href="#/artist">${artist}</a></li>`).join('')}</ul>
                            </div>
                        `).join('')}
                    </div>
                    <div class="col-right">
                        <div class="profiles">
                            ${data.artists.profiles.map(profile => `
                                <div class="profile">
                                    <div class="pic" style="background-image:url(${profile.image});background-size:cover;background-position:center"></div>
                                    <div class="name">${profile.name}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>`;
            }
        }
    };

    openMega(type) {
        this.render[type]();
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.elements.mega.classList.add('visible');
            if (this.isMobile()) this.elements.navLeft.classList.remove('open');
        }, 70);
    }

    closeMega() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.elements.mega.classList.remove('visible'), 120);
    }

    bindEvents() {
        document.querySelectorAll('.has-mega').forEach(link => {
            const type = link.dataset.megaType;
            
            if (!this.isMobile()) {
                link.addEventListener('mouseenter', () => this.openMega(type));
                link.addEventListener('mouseleave', () => this.closeMega());
            }
            
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.isMobile()) {
                    this.elements.mega.classList.contains('visible') ? this.closeMega() : this.openMega(type);
                } else {
                    this.openMega(type);
                }
            });
        });

        this.elements.mega.addEventListener('mouseenter', () => clearTimeout(this.timer));
        if (!this.isMobile()) {
            this.elements.mega.addEventListener('mouseleave', () => this.closeMega());
        }

        document.getElementById('searchBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.elements.search.classList.toggle('open');
            const navContainer = document.querySelector('.nav-container');
            
            if (this.elements.search.classList.contains('open')) {
                document.getElementById('searchInput').focus();
                navContainer.classList.add('search-active');
            } else {
                navContainer.classList.remove('search-active');
            }
        });

        document.getElementById('navToggle').addEventListener('click', () => {
            this.elements.navLeft.classList.toggle('open');
            if (this.elements.navLeft.classList.contains('open')) {
                this.closeMega();
                this.elements.search.classList.remove('open');
            }
        });

        document.addEventListener('click', (e) => {
            const target = e.target;
            
            if (!this.elements.mega.contains(target) && !target.closest('.has-mega')) {
                this.closeMega();
            }
            
            if (!this.elements.search.contains(target)) {
                this.elements.search.classList.remove('open');
                document.querySelector('.nav-container').classList.remove('search-active');
            }
            
            if (!this.elements.navLeft.contains(target) && !target.closest('#navToggle')) {
                this.elements.navLeft.classList.remove('open');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMega();
                this.elements.search.classList.remove('open');
                document.querySelector('.nav-container').classList.remove('search-active');
                this.elements.navLeft.classList.remove('open');
            }
        });
    }

    updateRoute() {
        const path = (location.hash.slice(1) || '/').split('?')[0];
        const pageTitle = data.pages[path] || 'Page Not Found';
        const container = document.getElementById('pageContainer');
        
        container.style.opacity = '0';
        setTimeout(() => {
            container.innerHTML = `<h2>${pageTitle}</h2>`;
            container.style.opacity = '1';
        }, 150);
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            const href = link.getAttribute('href');
            const isActive = href && href.slice(1).split('?')[0] === path;
            link.classList.toggle('active', isActive);
        });
        
        this.closeMega();
        this.elements.search.classList.remove('open');
        document.querySelector('.nav-container').classList.remove('search-active');
        this.elements.navLeft.classList.remove('open');
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedHeroCarousel(carouselData);
    new NavigationController();
});