import React, { useState, useMemo, useCallback, useRef, useEffect, createContext, useContext, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
    Palette, Users, Flower2, Globe, Church,
    ExternalLink, X
} from 'lucide-react';

// --- Data (Inlined for portability) ---
const CATEGORIES = [
    {
        id: 'figurative',
        name: 'Figurative',
        icon: Users,
        gradient: 'from-amber-500 via-amber-600 to-amber-700',
        glowColor: 'rgba(245, 158, 11, 0.4)'
    },
    {
        id: 'abstract',
        name: 'Abstract',
        icon: Palette,
        gradient: 'from-purple-500 via-purple-600 to-purple-700',
        glowColor: 'rgba(168, 85, 247, 0.4)'
    },
    {
        id: 'fine-art',
        name: 'Fine Art',
        icon: Flower2,
        gradient: 'from-teal-500 via-teal-600 to-teal-700',
        glowColor: 'rgba(20, 184, 166, 0.4)'
    },
    {
        id: 'aboriginal',
        name: 'Aboriginal',
        icon: Globe,
        gradient: 'from-orange-500 via-orange-600 to-orange-700',
        glowColor: 'rgba(249, 115, 22, 0.4)'
    },
    {
        id: 'religious',
        name: 'Religious',
        icon: Church,
        gradient: 'from-rose-500 via-rose-600 to-rose-700',
        glowColor: 'rgba(244, 63, 94, 0.4)'
    },
];

const ARTWORKS = [
    // Figurative
    {
        id: 1,
        title: "Owl and butterfly",
        artist: "Tatiana Feoktistova",
        category: "Figurative",
        src: "https://zigguratss.com/assets/upload/art-363.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/nature/figurative/acrylic/owl-and-butterfly-363",
        depth: 1.1
    },
    {
        id: 2,
        title: "Fulrani",
        artist: "Priyanka",
        category: "Figurative",
        src: "https://zigguratss.com/assets/upload/art-403.jpg",
        aspectRatio: "square",
        artworkUrl: "https://zigguratss.com/artwork/painting/nature/figurative/acrylic-/fulrani-403",
        depth: 0.9
    },
    {
        id: 3,
        title: "Tune Of Bengal-4",
        artist: "Sekhar Roy",
        category: "Figurative",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_5dbfcd64373d3847ed08dd0d7516244a.jpg",
        aspectRatio: "landscape",
        artworkUrl: "https://zigguratss.com/artwork/painting/everyday-life/figurative/acrylic-on-canvas/tune-of-bengal-4-1464",
        depth: 1.3
    },
    {
        id: 4,
        title: "AN ODE TO BEAUTY",
        artist: "PANCHU GHARAMI",
        category: "Figurative",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_7ac6af7bce41c5be521544f5086a9c5e.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/realism/figurative/acrylic-on-canvas/an-ode-to-beauty-1435",
        depth: 1.0
    },
    {
        id: 21,
        title: "The Indian Couple",
        artist: "Arpa Mukhopadhyay",
        category: "Figurative",
        src: "https://zigguratss.com/assets/upload/art-1163.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/everyday-life/figurative/acrylic/the-indian-couple",
        depth: 1.2
    },
    {
        id: 23,
        title: "BEAUTY WITH AUTHENTICS LIGHT",
        artist: "PANCHU GHARAM",
        category: "Figurative",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_90a3b8fbda3d85b6336555365d7b0970.jpg",
        aspectRatio: "landscape",
        artworkUrl: "https://zigguratss.com/artwork/painting/other/figurative/acrylic-on-canvas/beauty-with-authentics-light-1430",
        depth: 0.8
    },
    {
        id: 22,
        title: "Inner Peace 6",
        artist: "Monalisa Sarkar Mitra",
        category: "Figurative",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_2e117665f770e68eb2fa1eeb07bdc185.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/everyday-life/figurative/acrylic-on-canvas/inner-peace-6-",
        depth: 1.4
    },
    {
        id: 24,
        title: "Eternal Grace",
        artist: "Priyanka Bardhan",
        category: "Figurative",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_40ab5c59106bbfaa3de56dc5194fcfc0.jpeg",
        aspectRatio: "square",
        artworkUrl: "https://zigguratss.com/artwork/painting/abstract-expressionism/figurative/acrylic-and-oil/eternal-grace",
        depth: 1.1
    },
    {
        id: 25,
        title: "THE RIVER BANK",
        artist: "Madhushree Pawar",
        category: "Figurative",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_55e28592c1ccdb68912562fb15baf794.webp",
        aspectRatio: "landscape",
        artworkUrl: "https://zigguratss.com/artwork/painting/landscape/fine-art/watercolor/the-river-bank--1456",
        depth: 0.9
    },
    {
        id: 26,
        title: "Spiritual Sprit..",
        artist: "Vivek Kisan Vadkar",
        category: "Figurative",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_ad1a43d77de7848d0ca95494da23a551.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/animal/fine-art/oil/spiritual-sprit--1451",
        depth: 1.3
    },
    {
        id: 27,
        title: "meeting 2",
        artist: "UTTAM MANNA",
        category: "Figurative",
        src: "https://zigguratss.com/assets/upload/art-1247.jpg",
        aspectRatio: "wide",
        artworkUrl: "https://zigguratss.com/artwork/painting/animal/figurative/acrylic/meeting-2-1247",
        depth: 1.0
    },
    {
        id: 28,
        title: "SADHU 2",
        artist: "PANCHU GHARAMI",
        category: "Figurative",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_a09b9204318463594bfffdf2024381a4.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/religious/religious/acrylic-on-canvas/sadhu-2-1448",
        depth: 1.2
    },

    // Abstract
    {
        id: 5,
        title: "Nature",
        artist: "Dnyaneshwar dhavale",
        category: "Abstract",
        src: "https://zigguratss.com/assets/upload/art-1331.jpg",
        aspectRatio: "square",
        artworkUrl: "https://zigguratss.com/artwork/painting/abstraction/abstract/acrylic-on-canvas/nature-1331",
        depth: 1.2
    },
    {
        id: 6,
        title: "Nisarg",
        artist: "Dnyaneshwar dhavale",
        category: "Abstract",
        src: "https://zigguratss.com/assets/upload/art-1332.jpg",
        aspectRatio: "landscape",
        artworkUrl: "https://zigguratss.com/artwork/painting/abstraction/abstract/acrylic-on-canvas/nisarg-1332",
        depth: 0.8
    },
    {
        id: 7,
        title: "Lord Buddha and the water droplets",
        artist: "Nandini Saha Ghosh",
        category: "Abstract",
        src: "https://zigguratss.com/assets/upload/art-1269.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/religious/abstract/acrylic-/lord-buddha-and-the-water-droplets--1269",
        depth: 1.4
    },
    {
        id: 8,
        title: "PEACEFUL MOSEY",
        artist: "Madhushree Pawar",
        category: "Abstract",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_9f22ef5c72a65798868da19df3215a24.webp",
        aspectRatio: "wide",
        artworkUrl: "https://zigguratss.com/artwork/painting/landscape/surrealism/acrylic/peaceful-mosey--1454",
        depth: 1.1
    },
    {
        id: 29,
        title: "Harmonious Interplay VIII",
        artist: "Bappaditya Roy Chowdhury",
        category: "Abstract",
        src: "https://zigguratss.com/assets/upload/art-1256.jpg",
        aspectRatio: "square",
        artworkUrl: "https://zigguratss.com/artwork/painting/abstraction/abstract/acrylic/harmonious-interplay-viii-1256",
        depth: 1.3
    },
    {
        id: 30,
        title: "Held in Time",
        artist: "Richard Anbudurai ",
        category: "Abstract",
        src: "https://res.cloudinary.com/dp2e8mfvm/image/upload/v1756401274/kndry1ysa7xxwsr1kg3q.jpg",
        aspectRatio: "landscape",
        artworkUrl: "https://zigguratss.com/artwork/painting/abstract-expressionism/abstract/canvas/held-in-time-1385",
        depth: 0.9
    },
    {
        id: 31,
        title: "Untitled 2017",
        artist: "Parag Vanarse",
        category: "Abstract",
        src: "https://zigguratss.com/assets/upload/art-1015.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/abstraction/cubism/oil-on-canvas/untitled-2017-1015",
        depth: 1.4
    },
    {
        id: 32,
        title: "Harmonious Interplay IX",
        artist: "Bappaditya Roy Chowdhury",
        category: "Abstract",
        src: "https://zigguratss.com/assets/upload/art-1257.jpg",
        aspectRatio: "square",
        artworkUrl: "https://zigguratss.com/artwork/painting/abstraction/abstract/acrylic/harmonious-interplay-ix-1257",
        depth: 1.1
    },
    {
        id: 33,
        title: "Harmonious Interplay VII",
        artist: "Bappaditya Roy Chowdhury",
        category: "Abstract",
        src: "https://zigguratss.com/assets/upload/art-1255.jpg",
        aspectRatio: "square",
        artworkUrl: "https://zigguratss.com/artwork/painting/abstraction/abstract/acrylic/harmonious-interplay-vii-1255",
        depth: 1.0
    },
    {
        id: 34,
        title: "WEST SIDE 1",
        artist: "Sambhu Karmakar",
        category: "Abstract",
        src: "https://zigguratss.com/assets/upload/art-1098.jpg",
        aspectRatio: "landscape",
        artworkUrl: "https://zigguratss.com/artwork/painting/abstraction/abstract/acrylic-on-paper/west-side-1-1098",
        depth: 1.2
    },
    {
        id: 35,
        title: "Inspiration-II",
        artist: "Pradip Sarkar",
        category: "Abstract",
        src: "https://zigguratss.com/assets/upload/art-1004.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/abstraction/geometric/acrylicon-canvas/inspiration-ii-1004",
        depth: 0.8
    },

    // Fine Art
    {
        id: 9,
        title: "Serenity - River with ducks in the sunset",
        artist: "Nandini Saha Ghosh",
        category: "Fine Art",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_fcb0d2af0d88ddfd97d68697c71143e4.webp",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/landscape/fine-art/acrylic-/serenity---river-with-ducks-in-the-sunset--1477",
        depth: 1.3
    },
    {
        id: 10,
        title: "THE RIVER BANK",
        artist: "Madhushree Pawar",
        category: "Fine Art",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_55e28592c1ccdb68912562fb15baf794.webp",
        aspectRatio: "landscape",
        artworkUrl: "https://zigguratss.com/artwork/painting/landscape/fine-art/watercolor-/the-river-bank--1456",
        depth: 0.9
    },
    {
        id: 11,
        title: "Serenity -riverside",
        artist: "Nandini Saha Ghosh",
        category: "Fine Art",
        src: "https://zigguratss.com/assets/upload/art/image_68d1653592424.jpg",
        aspectRatio: "square",
        artworkUrl: "https://zigguratss.com/artwork/painting/landscape/fine-art/acrylic-/serenity--riverside-1401",
        depth: 1.2
    },
    {
        id: 12,
        title: "The Abandoned Ship",
        artist: "Nandini Saha Ghosh",
        category: "Fine Art",
        src: "https://zigguratss.com/assets/upload/art/IMG20251004135250~2_691d4dcf4a798.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/everyday-life/fine-art/acrylic-/the-abandoned-ship-1420",
        depth: 1.0
    },
    {
        id: 36,
        title: "SPRINKLES",
        artist: "Madhushree Pawar",
        category: "Fine Art",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_e99fbad05682ea381bcb78914fa8773f.webp",
        aspectRatio: "landscape",
        artworkUrl: "https://zigguratss.com/artwork/painting/nature/fine-art/watercolor-/sprinkles--1455",
        depth: 1.3
    },
    {
        id: 37,
        title: "Goucho",
        artist: "Sanjana Patel",
        category: "Fine Art",
        src: "https://zigguratss.com/assets/upload/art/Goucho_68d6bdfcba04b.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/religion/fine-art/acrylics-on-canvas/goucho-1405",
        depth: 0.9
    },
    {
        id: 38,
        title: "Autumn",
        artist: "Sanjana Patel",
        category: "Fine Art",
        src: "https://res.cloudinary.com/dp2e8mfvm/image/upload/v1756894643/c28jtrmuz3lya0v9vqhe.jpg",
        aspectRatio: "square",
        artworkUrl: "https://zigguratss.com/artwork/painting/nature/fine-art/acrylics-on-canvas/autumn",
        depth: 1.1
    },
    {
        id: 39,
        title: "legacy in motion",
        artist: "Vivek Kisan Vadkar",
        category: "Fine Art",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_1b20b31ae44de87d6c06beb0496d2c14.jpg",
        aspectRatio: "landscape",
        artworkUrl: "https://zigguratss.com/artwork/painting/animal/fine-art/oil-on-canvas/legacy-in-motion-1450",
        depth: 1.4
    },
    {
        id: 40,
        title: "Serenity -balcony",
        artist: "Nandini Saha Ghosh",
        category: "Fine Art",
        src: "https://zigguratss.com/assets/upload/art/image_68d165ce35701.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/landscape/fine-art/acrylic-/serenity--balcony--1402",
        depth: 1.0
    },

    // Aboriginal
    {
        id: 13,
        title: "Midnight Guwahati 2",
        artist: "Dnyaneshwar dhavale",
        category: "Aboriginal",
        src: "https://zigguratss.com/assets/upload/art-1190.jpg",
        aspectRatio: "landscape",
        artworkUrl: "https://zigguratss.com/artwork/painting/abstraction/aboriginal/acrylic-on-canvas/midnight-guwahati-2-1190",
        depth: 1.1
    },
    {
        id: 14,
        title: "Croon",
        artist: "Chetan Katigar",
        category: "Aboriginal",
        src: "https://zigguratss.com/assets/upload/art-1072.jpg",
        aspectRatio: "square",
        artworkUrl: "https://zigguratss.com/artwork/painting/abstraction/aboriginal/acrylic/croon-1072",
        depth: 1.4
    },
    {
        id: 15,
        title: "Madhubani Fishes-III",
        artist: "Dhatri Deval Thanki",
        category: "Aboriginal",
        src: "https://zigguratss.com/assets/upload/art-1180.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/animal/aboriginal/chitrapat-paper/madhubani-fishes-iii-1180",
        depth: 0.8
    },
    {
        id: 16,
        title: "Energetic Bull",
        artist: "Anupam Pal",
        category: "Aboriginal",
        src: "https://zigguratss.com/assets/upload/art-1017.jpg",
        aspectRatio: "wide",
        artworkUrl: "https://zigguratss.com/artwork/painting/animal/aboriginal/acrylic-on-canvas/energetic-bull-1017",
        depth: 1.2
    },
    {
        id: 41,
        title: "Yellow",
        artist: "Dnyaneshwar dhavale",
        category: "Aboriginal",
        src: "https://zigguratss.com/assets/upload/art-910.jpg",
        aspectRatio: "square",
        artworkUrl: "https://zigguratss.com/artwork/painting/abstraction/aboriginal/acrylic-on-canvas/yellow-910",
        depth: 1.3
    },
    {
        id: 42,
        title: "Sunset on the lake",
        artist: "Vanya Georgieva",
        category: "Aboriginal",
        src: "https://zigguratss.com/assets/upload/art-950.jpeg",
        aspectRatio: "landscape",
        artworkUrl: "https://zigguratss.com/artwork/painting/landscape/aboriginal/oil-/sunset-on-the-lake-",
        depth: 0.8
    },
    {
        id: 43,
        title: "Madhubani Fishes-II",
        artist: "Dhatri Deval Thanki",
        category: "Aboriginal",
        src: "https://zigguratss.com/assets/upload/art-1179.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/animal/aboriginal/chitrapat-paper/madhubani-fishes-ii-1179",
        depth: 1.1
    },

    // Religious
    {
        id: 17,
        title: "SADHU 2",
        artist: "PANCHU GHARAMI",
        category: "Religious",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_a09b9204318463594bfffdf2024381a4.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/religious/religious/acrylic-on-canvas/sadhu-2-1448",
        depth: 1.0
    },
    {
        id: 18,
        title: "GANESHA",
        artist: "PANCHU GHARAMI",
        category: "Religious",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_19061eb75ef9d312040349e342b1b772.jpg",
        aspectRatio: "landscape",
        artworkUrl: "https://zigguratss.com/artwork/painting/religious/religious/acrylic-on-canvas/ganesha-1446",
        depth: 1.3
    },
    {
        id: 19,
        title: "Buddha",
        artist: "Sangita agarwal",
        category: "Religious",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_9c4bd41b050f12541de0ce1bd10a0714.jpg",
        aspectRatio: "square",
        artworkUrl: "https://zigguratss.com/artwork/painting/religious/religious/acrylic-/buddha-1428",
        depth: 0.9
    },
    {
        id: 20,
        title: "GANESHA",
        artist: "PANCHU GHARAMI",
        category: "Religious",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_3e9b904a3d23f0296145e81ab0d45bff.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/religious/religious/acrylic-on-canvas/ganesha-1445",
        depth: 1.1
    },
    {
        id: 44,
        title: "GANESHA",
        artist: "PANCHU GHARAMI",
        category: "Religious",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_4c0f8c9cf8ae480fba7e520594875181.jpg",
        aspectRatio: "landscape",
        artworkUrl: "https://zigguratss.com/artwork/painting/religious/religious/acrylic-on-canvas/ganesha-1443",
        depth: 1.2
    },
    {
        id: 45,
        title: "SADHU 1",
        artist: "PANCHU GHARAMI",
        category: "Religious",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_b6e9a233d68afa046719e3e49321fb58.jpg",
        aspectRatio: "portrait",
        artworkUrl: "https://zigguratss.com/artwork/painting/religion/religious/acrylic-on-canvas/sadhu-1-1447",
        depth: 0.9
    },
    {
        id: 46,
        title: "Navratini- Depicting Nine Women As Symbol Of Power And Joy Of Nine",
        artist: "Mrinal Dutt",
        category: "Religious",
        src: "https://zigguratss.com/assets/upload/art/Navratini-_depicting_nine_women_as_symbol_of_power_and_joy_of_Nine_31x31_40k_68d7913076a96.jpeg",
        aspectRatio: "square",
        artworkUrl: "https://zigguratss.com/artwork/painting/religious/religious/acrylic-on-canvas/navratini--depicting-nine-women-as-symbol-of-power-and-joy-of-nine-1412",
        depth: 1.4
    },
    {
        id: 47,
        title: "PANCHA MUKHI GANESHA",
        artist: "PANCHU GHARAMI",
        category: "Religious",
        src: "https://zigguratss.com/assets/upload/art/zigguratss_6c42ff51506352296c5844ebb426706d.jpg",
        aspectRatio: "landscape",
        artworkUrl: "https://zigguratss.com/artwork/painting/religious/religious/acrylic-on-canvas/pancha-mukhi-ganesha-1442",
        depth: 1.0
    }
];

// --- Assets ---
// NOTE: These are local background images for the "Wall View" panel.
// If you copy this file to another project, you must also copy these 3 PNG files
// and maintain the relative paths OR update these imports to point to their new location.
import portraitBg from '../assets/potrait.png';
import landscapeBg from '../assets/landscape.png';
import boxBg from '../assets/box.png';

// --- Styles Projection ---
const GalleryStyles = () => (
    <style dangerouslySetInnerHTML={{
        __html: `
        .glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(12px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }

        @keyframes carousel-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-33.3333333%)); }
        }

        @keyframes carousel-right {
            0% { transform: translateX(calc(-33.3333333%)); }
            100% { transform: translateX(0); }
        }

        @keyframes painting-shimmer {
            0% { transform: translateX(-150%) skewX(-20deg); }
            60%, 100% { transform: translateX(200%) skewX(-20deg); }
        }

        .animate-carousel-left { animation: carousel-left linear infinite; }
        .animate-carousel-right { animation: carousel-right linear infinite; }
        .animate-painting-shimmer { animation: painting-shimmer 2.5s cubic-bezier(0.22, 1, 0.36, 1) infinite; }
    `}} />
);

// --- Context & Hooks ---
const AntiGravityContext = createContext(null);
const useAntiGravity = () => useContext(AntiGravityContext);

const MagneticContext = createContext(null);
const useMagneticField = () => useContext(MagneticContext);

const useAntiGravityPhysics = ({
    gravity = -0.1,
    drag = 0.98,
    bounce = 0.3,
    maxDisplacement = 40,
} = {}) => {
    const [position, setPosition] = useState({ y: 0, r: 0 });
    const velocity = useRef({ y: 0, r: 0 });
    const frameId = useRef();

    useEffect(() => {
        let lastTime = performance.now();
        const animate = (time) => {
            const dt = (time - lastTime) / 16.67;
            lastTime = time;
            velocity.current.y += gravity * dt;
            velocity.current.y += Math.sin(time / 1000) * 0.5 * dt;
            velocity.current.y *= drag;
            velocity.current.r *= drag;
            setPosition(prev => {
                let newY = prev.y + velocity.current.y * dt;
                let newR = prev.r + (Math.sin(time / 2000) * 0.05) * dt;
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

// --- Sub-Components ---
const ComponentLoader = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-8 h-8 border-2 border-gold-500/20 border-t-gold-500 rounded-full animate-spin" />
    </div>
);

const ParticleSystem = React.memo(({ particleCount = 60 }) => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        resize(); window.addEventListener('resize', resize);
        const particles = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1, color: `rgba(255, 215, 100, ${Math.random() * 0.4 + 0.3})`
        }));
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
                ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
            });
            requestAnimationFrame(animate);
        };
        animate(); return () => window.removeEventListener('resize', resize);
    }, [particleCount]);
    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" />;
});

const DynamicBackground = React.memo(() => (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#0a0a0f]">
        <motion.div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(78, 205, 196, 0.08) 0%, transparent 50%)' }} animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 10, repeat: Infinity }} />
    </div>
));

const MagneticField = ({ children, strength = 0.3, radius = 100 }) => {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    useEffect(() => {
        const move = (e) => setMouse({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', move); return () => window.removeEventListener('mousemove', move);
    }, []);
    const getMagneticForce = useCallback((ref) => {
        if (!ref.current) return { x: 0, y: 0 };
        const rect = ref.current.getBoundingClientRect();
        const dx = mouse.x - (rect.left + rect.width / 2);
        const dy = mouse.y - (rect.top + rect.height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > radius) return { x: 0, y: 0 };
        return { x: dx * (1 - dist / radius) * strength, y: dy * (1 - dist / radius) * strength };
    }, [mouse, radius, strength]);
    return <MagneticContext.Provider value={{ getMagneticForce }}>{children}</MagneticContext.Provider>;
};

const FloatingCard = ({ children, depth = 1, className = "", delay = 0, enable3D = true, isCarousel = false }) => {
    const context = useAntiGravity();
    const scrollYProgress = context?.scrollYProgress;
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const yRange = useMemo(() => isCarousel ? [0, 0] : [Math.random() * -20 * depth, Math.random() * 20 * depth], [depth, isCarousel]);
    const yTransform = scrollYProgress ? useTransform(scrollYProgress, [0, 1], yRange) : 0;

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], isCarousel ? [10, -10] : [8, -8]), { stiffness: 200, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], isCarousel ? [-10, 10] : [-8, 8]), { stiffness: 200, damping: 20 });

    const floatDuration = useMemo(() => isCarousel ? 0 : 6 + Math.random() * 4, [isCarousel]);
    const rotateRange = useMemo(() => isCarousel ? [0, 0] : [-1.5, 1.5], [isCarousel]);
    const yBounce = useMemo(() => isCarousel ? [0, 0, 0] : [0, -8 - Math.random() * 7, 0], [isCarousel]);

    const handleMouseMove = (e) => {
        if (!cardRef.current || !enable3D) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2));
        mouseY.set((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2));
    };

    return (
        <motion.div ref={cardRef} style={{ y: yTransform }} className={`relative group perspective-1000 ${className}`} initial={{ opacity: 0, scale: 0.95, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay }} onMouseMove={handleMouseMove} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => { setIsHovered(false); mouseX.set(0); mouseY.set(0); }} animate={{ y: yBounce, rotate: rotateRange }}>
            <motion.div style={enable3D ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : {}} className="will-change-transform" whileHover={isCarousel ? { scale: 1.08, y: -12, transition: { duration: 0.6 } } : { scale: 1.02 }} animate={{ y: yBounce, rotate: rotateRange }} transition={{ duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}>
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-6 rounded-full opacity-25" style={{ background: 'radial-gradient(ellipse, rgba(78, 205, 196, 0.3) 0%, transparent 70%)', filter: 'blur(12px)' }} />
                <div className="relative bg-zinc-900/90 backdrop-blur-sm rounded-lg border border-white/5" style={{ transform: enable3D ? 'translateZ(20px)' : 'none', boxShadow: '0 12px 24px rgba(0,0,0,0.4)' }}>{children}</div>
            </motion.div>
        </motion.div>
    );
};

const FloatingImage = React.memo(({ src, alt, title, artist, category, artworkUrl, aspectRatio = "landscape", depth = 1, onHoverStart, isCarousel = false }) => {
    const aspectClasses = { landscape: "aspect-[4/3]", portrait: "aspect-[3/4]", square: "aspect-square", wide: "aspect-[16/9]" };
    const gradients = { 'Figurative': 'rgba(245, 158, 11, 0.6)', 'Abstract': 'rgba(168, 85, 247, 0.6)', 'Fine Art': 'rgba(20, 184, 166, 0.6)', 'Aboriginal': 'rgba(249, 115, 22, 0.6)', 'Religious': 'rgba(244, 63, 94, 0.6)' };
    const grad = gradients[category] || 'rgba(113, 113, 122, 0.6)';
    return (
        <FloatingCard depth={depth} delay={0} isCarousel={isCarousel}>
            <motion.div className={`relative rounded-lg overflow-hidden group/img cursor-pointer w-full h-full block`} onHoverStart={() => onHoverStart?.({ src, alt, title, artist, category, artworkUrl, aspectRatio })} onClick={() => onHoverStart?.({ src, alt, title, artist, category, artworkUrl, aspectRatio })}>
                <div className="relative bg-zinc-800/50 backdrop-blur-sm rounded-lg border border-white/5 p-2">
                    <div className={`relative overflow-hidden rounded-md ${aspectClasses[aspectRatio]} bg-zinc-900/80`}>
                        <img src={src} alt={alt} loading="eager" fetchPriority="high" decoding="sync" className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110" />
                        <div className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(135deg, ${grad}, transparent)`, mixBlendMode: 'soft-light' }} />
                        {isCarousel && <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent animate-painting-shimmer pointer-events-none" />}
                    </div>
                </div>
            </motion.div>
        </FloatingCard>
    );
});

const WallPreviewPanel = React.memo(({ artwork, isVisible, onClose }) => {
    if (!artwork) return null;
    const backgroundConfig = {
        portrait: { bgImage: portraitBg, top: '40%', left: '50%', w: '28%' },
        landscape: { bgImage: landscapeBg, top: '32%', left: '50%', w: '42%' },
        square: { bgImage: boxBg, top: '35%', left: '72%', w: '28%' },
        wide: { bgImage: landscapeBg, top: '42%', left: '50%', w: '45%' }
    };
    const config = backgroundConfig[artwork.aspectRatio] || backgroundConfig.square;
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
                    <motion.div className="relative w-full max-w-2xl bg-white/5 border border-white/20 rounded-2xl overflow-hidden shadow-2xl" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} onClick={e => e.stopPropagation()} onMouseLeave={onClose}>
                        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center border border-white/30 text-white hover:bg-black/80"><X size={24} /></button>
                        <div className="relative w-full aspect-[16/10]">
                            <img src={config.bgImage} alt="Wall" className="absolute inset-0 w-full h-full object-cover" />
                            <div className="absolute -translate-x-1/2 -translate-y-1/2 border-[6px] border-[#5a4937] shadow-2xl" style={{ top: config.top, left: config.left || '50%', width: config.w }}>
                                <img src={artwork.src} alt={artwork.title} className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="p-6 text-center text-white">
                            <h3 className="text-xl font-bold mb-1">{artwork.title}</h3>
                            <p className="text-sm opacity-80 mb-4">by {artwork.artist}</p>
                            <button onClick={() => window.location.href = artwork.artworkUrl} className="px-6 py-2 bg-white text-black rounded-full font-medium inline-flex items-center gap-2 hover:bg-zinc-200 transition-colors"><ExternalLink size={16} /> View Details</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

const CarouselRow = React.memo(({ artworks, direction, speed, onHoverStart }) => (
    <div className="w-full overflow-hidden group">
        <div className={`inline-flex items-center gap-6 md:gap-10 ${direction === 'left' ? 'animate-carousel-left' : 'animate-carousel-right'}`} style={{ animationDuration: `${speed}s` }}>
            {[...artworks, ...artworks, ...artworks].map((art, i) => (
                <div key={`${art.id}-${i}`} className="relative inline-block shrink-0" style={{ width: 'min(70vw, 320px)' }}>
                    <FloatingImage {...art} onHoverStart={onHoverStart} isCarousel={true} />
                </div>
            ))}
        </div>
    </div>
));

const InfiniteCarousel = React.memo(({ artworks, activeCategory, onHoverStart }) => (
    <div className="w-screen relative overflow-hidden py-6 left-1/2 -translate-x-1/2" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="flex flex-col gap-12">
                <CarouselRow artworks={artworks.filter((_, i) => i % 2 === 0)} direction="left" speed={35} onHoverStart={onHoverStart} />
                <CarouselRow artworks={artworks.filter((_, i) => i % 2 !== 0)} direction="right" speed={40} onHoverStart={onHoverStart} />
            </motion.div>
        </AnimatePresence>
    </div>
));

const AntiGravityContainer = ({ children }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    return (
        <AntiGravityContext.Provider value={{ scrollYProgress }}>
            <div ref={ref} className="relative">{children}</div>
        </AntiGravityContext.Provider>
    );
};

// --- Main Page Component ---
export const ZigguratsGalleryPage = ({ enableBackground = true, enableParticles = true }) => {
    const [activeCategory, setActiveCategory] = useState('figurative');
    const [hoveredArtwork, setHoveredArtwork] = useState(null);

    // Memoize filtered artworks for performance
    const filteredArtworks = useMemo(() => {
        return ARTWORKS.filter(art => {
            const categoryId = art.category.toLowerCase().replace(/\s+/g, '-');
            return categoryId === activeCategory;
        });
    }, [activeCategory]);

    // Memoize hover handler
    const handleHoverStart = useCallback((artwork) => {
        setHoveredArtwork(artwork);
    }, []);

    const activeCategoryData = useMemo(() =>
        CATEGORIES.find(c => c.id === activeCategory),
        [activeCategory]
    );

    return (
        <section className="relative py-8 sm:py-12 md:py-16 min-h-screen overflow-hidden bg-black text-white font-sans">
            <GalleryStyles />
            {enableBackground && <DynamicBackground />}
            {enableParticles && <ParticleSystem />}

            <div className="w-[95vw] sm:max-w-[90vw] mx-auto relative z-10 px-3 sm:px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold tracking-normal mb-4 sm:mb-6 text-white px-4"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Artworks as per Style
                    </h1>
                    <motion.p
                        className="text-xs sm:text-sm md:text-base tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 px-4"
                        style={{ color: '#C9A04B' }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Artworks we offer as per their style!
                    </motion.p>
                </motion.div>

                <MagneticField strength={0.15} radius={80}>
                    <motion.div
                        className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-5 mb-12 sm:mb-16 px-2 sm:px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {CATEGORIES.map((cat, index) => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;

                            return (
                                <motion.button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 overflow-hidden ${isActive
                                        ? 'text-white shadow-xl scale-105'
                                        : 'text-zinc-400 hover:text-zinc-200 glass hover:scale-105'
                                        }`}
                                    whileHover={{ scale: 1.08, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    style={isActive ? { boxShadow: `0 10px 40px ${cat.glowColor}` } : {}}
                                >
                                    {isActive && (
                                        <motion.div
                                            className={`absolute inset-0 bg-gradient-to-r ${cat.gradient}`}
                                            layoutId="activeCategory"
                                            transition={{ type: "spring", stiffness: 400, damping: 35 }}
                                        />
                                    )}

                                    <span className="relative flex items-center gap-2 z-10">
                                        <Icon className="w-4 h-4" />
                                        {cat.name}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </MagneticField>
            </div>

            <div className="w-full relative z-10 w-screen max-w-[100vw] overflow-hidden">
                <AntiGravityContainer>
                    <InfiniteCarousel
                        artworks={filteredArtworks}
                        activeCategory={activeCategory}
                        onHoverStart={handleHoverStart}
                    />
                </AntiGravityContainer>
            </div>

            <div className="w-[95vw] sm:max-w-[90vw] mx-auto relative z-10 px-3 sm:px-4">
                <motion.div
                    className="mt-24 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <motion.div
                        className="inline-block glass px-8 py-4 rounded-full cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ boxShadow: `0 10px 40px ${activeCategoryData?.glowColor || 'rgba(0,0,0,0.3)'}` }}
                        onClick={() => window.open(`https://zigguratss.com/artworks/painting/${activeCategory}`, '_self')}
                    >
                        <p className="text-sm text-zinc-400 font-medium">View more</p>
                    </motion.div>
                </motion.div>

                <WallPreviewPanel
                    artwork={hoveredArtwork}
                    isVisible={hoveredArtwork !== null}
                    onClose={() => setHoveredArtwork(null)}
                />
            </div>
        </section>
    );
};

export default ZigguratsGalleryPage;
