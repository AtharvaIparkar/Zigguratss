// Carousel Data
const carouselData = {
  settings: {
    autoplay: true,
    autoplayDelay: 2500,
    flipInterval: 3000,
    flipOnClick: true,
    autoplayFrames: true
  },
  slides: [
    {
      type: 'flipping',
      autoFlip: true,
      background: 'textured',
      headline: 'Discover Masterpieces',
      subtext: 'Explore our curated collection of contemporary and classical artworks from renowned artists worldwide.',
      cta: { text: 'Browse Collection', url: '#/artwork' },
      quickLinks: [
        { text: 'New Arrivals', url: '#/new' },
        { text: 'Featured Artists', url: '#/artists' },
        { text: 'Exhibitions', url: '#/exhibitions' }
      ],
      frames: [
        {
          id: 'flip-1',
          position: { top: '-30%', left: '-16%', rotation: '-6deg', zIndex: 3 },
          adaptToOrientation: true,
          flipMode: 'timed',
          images: [
            { src: 'https://zigguratss.com/assets/upload/art-1288.jpg', alt: 'Portrait 1' },
            { src: 'https://zigguratss.com/assets/upload/art/zigguratss_174e5e57a7cbb67d92945ee70cdbd09d.jpg', alt: 'Portrait 2' }
          ]
        },
        {
          id: 'flip-2',
          position: { top: '-45%', left: '30%', rotation: '10deg', zIndex: 4 },
          adaptToOrientation: true,
          flipMode: 'timed',
          flipDelay: 1000,
          images: [
            { src: 'https://zigguratss.com/assets/upload/art/image_68d1653592424.jpg', alt: 'Landscape 1' },
            { src: 'https://zigguratss.com/assets/upload/art-1116.jpg', alt: 'Landscape 2' }
          ]
        },
        {
          id: 'flip-3',
          position: { top: '52%', left: '17%', rotation: '4deg', zIndex: 2 },
          adaptToOrientation: true,
          flipMode: 'timed',
          flipDelay: 2000,
          images: [
            { src: 'https://zigguratss.com/assets/upload/art-1299.jpg', alt: 'Square 1' },
            { src: 'https://zigguratss.com/assets/upload/art-877.JPG', alt: 'Square 2' }
          ]
        },
        {
          id: 'flip-4',
          position: { top: '-40%', left: '70%', rotation: '-8deg', zIndex: 1 },
          adaptToOrientation: true,
          flipMode: 'timed',
          flipDelay: 1500,
          images: [
            { src: 'https://zigguratss.com/assets/upload/art-367.jpg', alt: 'Portrait 3' },
            { src: 'https://zigguratss.com/assets/upload/art-114.jpg', alt: 'Portrait 4' }
          ]
        },
        {
          id: 'flip-5',
          position: { top: '50%', left: '60%', rotation: '6deg', zIndex: 5 },
          adaptToOrientation: true,
          flipMode: 'timed',
          flipDelay: 2500,
          images: [
            { src: 'https://zigguratss.com/assets/upload/art/image_68d165ce35701.jpg', alt: 'Landscape 3' },
            { src: 'https://zigguratss.com/assets/upload/art-1293.jpg', alt: 'Landscape 4' }
          ]
        }
      ]
    },
    {
      type: 'static-cluster',
      background: 'gradient',
      headline: 'Contemporary Collection',
      subtext: 'Immerse yourself in modern artistic expressions that challenge conventions and inspire new perspectives.',
      cta: { text: 'View Modern Art', url: '#/modern' },
      quickLinks: [
        { text: 'Abstract', url: '#/abstract' },
        { text: 'Digital Art', url: '#/digital' },
        { text: 'Mixed Media', url: '#/mixed' }
      ],
      frames: [
        {
          id: 'static-1',
          position: { top: '10%', left: '10%', rotation: '-8deg', zIndex: 2 },
          adaptToOrientation: true,
          images: [{ src: 'https://zigguratss.com/assets/upload/art/Goucho_68d6bdfcba04b.jpg', alt: 'Modern Art' }]
        },
        {
          id: 'static-2',
          position: { top: '50%', left: '45%', rotation: '5deg', zIndex: 3 },
          adaptToOrientation: true,
          images: [{ src: 'https://zigguratss.com/assets/upload/art-1323.jpg', alt: 'Abstract' }]
        },
        {
          id: 'static-3',
          position: { top: '-48%', left: '45%', rotation: '-3deg', zIndex: 1 },
          adaptToOrientation: true,
          images: [{ src: 'https://zigguratss.com/assets/upload/art/Abhinay-_form_of_classical_and_traditional_dances_of_India_32x31_40k_68d790bc4848b.jpeg', alt: 'Contemporary' }]
        }
      ]
    },
    {
      type: 'static-cluster',
      background: '',
      headline: 'Classical Masters',
      subtext: 'Experience timeless beauty through carefully preserved works from history\'s greatest artistic minds.',
      cta: { text: 'Explore Classics', url: '#/classical' },
      quickLinks: [
        { text: 'Renaissance', url: '#/renaissance' },
        { text: 'Baroque', url: '#/baroque' },
        { text: 'Impressionism', url: '#/impressionism' }
      ],
      frames: [
        {
          id: 'static-4',
          position: { top: '-20%', left: '25%', rotation: '8deg', zIndex: 2 },
          adaptToOrientation: true,
          images: [{ src: 'https://res.cloudinary.com/dp2e8mfvm/image/upload/v1754041327/hljwyntmlfjkewhusn9c.jpg', alt: 'Classical' }]
        },
        {
          id: 'static-5',
          position: { top: '45%', left: '60%', rotation: '-5deg', zIndex: 1 },
          adaptToOrientation: true,
          images: [{ src: 'https://res.cloudinary.com/dp2e8mfvm/image/upload/v1756224320/efbvelgsq8h8fb2gmtzb.jpg', alt: 'Impressionist' }]
        }
      ]
    },
    {
      type: 'static-cluster',
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      headline: 'Sculpture Gallery',
      subtext: 'Three-dimensional masterworks that capture form, movement, and emotion in bronze, marble, and modern materials.',
      cta: { text: 'View Sculptures', url: '#/sculptures' },
      quickLinks: [
        { text: 'Bronze Works', url: '#/bronze' },
        { text: 'Marble Classics', url: '#/marble' },
        { text: 'Modern Forms', url: '#/modern-sculpture' }
      ],
      frames: [
        {
          id: 'static-6',
          position: { top: '-5%', left: '13%', rotation: '2deg', zIndex: 3 },
          adaptToOrientation: true,
          images: [{ src: 'https://zigguratss.com/assets/upload/art-1181.jpg', alt: 'Bronze Sculpture' }]
        },
        {
          id: 'static-7',
          position: { top: '10%', left: '45%', rotation: '6deg', zIndex: 1 },
          adaptToOrientation: true,
          images: [{ src: 'https://zigguratss.com/assets/upload/art-174.jpg', alt: 'Marble Art' }]
        },
        {
          id: 'static-8',
          position: { top: '25%', left: '78%', rotation: '-2deg', zIndex: 2 },
          adaptToOrientation: true,
          images: [{ src: 'https://zigguratss.com/assets/upload/art/painting_1-min_68d6b0b0ad38a.JPG', alt: 'Modern Form' }]
        }
      ]
    },
    {
      type: 'static-cluster',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      headline: 'Digital & Mixed Media',
      subtext: 'Contemporary expressions blending traditional techniques with cutting-edge digital artistry and innovative materials.',
      cta: { text: 'Explore Digital Art', url: '#/digital' },
      quickLinks: [
        { text: 'Digital Paintings', url: '#/digital-paintings' },
        { text: 'Mixed Media', url: '#/mixed-media' },
        { text: 'Interactive Art', url: '#/interactive' }
      ],
      frames: []
    }
  ]
};

// Navigation Data
const data = {
  artwork: {
    categories: ["Paintings", "Sculptures", "Photography", "Digital Art", "Mixed Media", "Prints", "Drawings"],
    filters: {
      Category: ["Abstract", "Portrait", "Landscape", "Still Life", "Contemporary", "Classical", "Modern"],
      Style: ["Impressionism", "Cubism", "Surrealism", "Minimalism", "Pop Art", "Realism", "Expressionism"],
      Medium: ["Oil on Canvas", "Acrylic", "Watercolor", "Charcoal", "Digital", "Bronze", "Marble"]
    },
    featured: {
      title: "Featured Artwork",
      image: "https://via.placeholder.com/200x150/f5f5f5/999?text=Featured"
    }
  },
  artists: {
    categories: ["Painters", "Sculptors", "Photographers", "Digital Artists", "Mixed Media Artists", "Printmakers"],
    groups: {
      Emerging: ["Sofia Chen", "Marcus Rivera", "Elena Volkov", "James Park", "Aria Nakamura"],
      Featured: ["Isabella Romano", "David Kim", "Sarah Mitchell", "Carlos Mendez", "Nina Petrov"],
      Bestseller: ["Alexander Stone", "Maria Santos", "Robert Chen", "Lisa Anderson", "Ahmed Hassan"],
      Famous: ["Catherine Moore", "Vincent Torres", "Rachel Green", "Michael Brown", "Anna Kowalski"],
      Master: ["Leonardo Rossi", "Yuki Tanaka", "Pierre Dubois", "Sophia Williams", "Marco Benedetti"]
    },
    profiles: [
      { name: "Isabella Romano", image: "" },
      { name: "Alexander Stone", image: "" },
      { name: "Sofia Chen", image: "" },
      { name: "Leonardo Rossi", image: "" },
      { name: "Catherine Moore", image: "" },
      { name: "David Kim", image: "" },
      { name: "Yuki Tanaka", image: "" },
      { name: "Maria Santos", image: "" }
    ]
  },
  pages: {
    "/": "Welcome to Zigguratss",
    "/artwork": "Artwork Collection",
    "/artist": "Artist Directory",
    "/exhibitions": "Exhibitions",
    "/about": "About Us",
    "/contact": "Contact"
  }
};