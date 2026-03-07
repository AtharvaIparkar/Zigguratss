import { Palette, Users, Flower2, Globe, Church } from 'lucide-react';

export const CATEGORIES = [
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

export const ARTWORKS = [
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
