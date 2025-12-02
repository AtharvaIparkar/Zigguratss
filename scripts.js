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

const elements = {
  mega: document.getElementById('megaPanel'),
  content: document.getElementById('megaContent'),
  navLeft: document.getElementById('navLeft'),
  search: document.getElementById('searchWrapper')
};

let timer;

const render = {
  artwork: () => {
    if (isMobile()) {
      elements.content.innerHTML = `
        <div class="col-left">
          <div class="category-list">
            ${data.artwork.categories.map((cat, i) => 
              `<a href="#/artwork" class="${i === 0 ? 'active' : ''}">${cat}</a>`
            ).join('')}
          </div>
        </div>`;
    } else {
      elements.content.innerHTML = `
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
    if (isMobile()) {
      elements.content.innerHTML = `
        <div class="col-left">
          <div class="category-list">
            ${data.artists.categories.map((cat, i) => 
              `<a href="#/artist" class="${i === 0 ? 'active' : ''}">${cat}</a>`
            ).join('')}
          </div>
        </div>`;
    } else {
      elements.content.innerHTML = `
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

const isMobile = () => window.innerWidth <= 768;

const openMega = (type) => {
  render[type]();
  clearTimeout(timer);
  timer = setTimeout(() => {
    elements.mega.classList.add('visible');
    if (isMobile()) elements.navLeft.classList.remove('open');
  }, 70);
};

const closeMega = () => {
  clearTimeout(timer);
  timer = setTimeout(() => elements.mega.classList.remove('visible'), 120);
};

// Event handlers
document.querySelectorAll('.has-mega').forEach(link => {
  const type = link.dataset.megaType;
  
  if (!isMobile()) {
    link.onmouseenter = () => openMega(type);
    link.onmouseleave = closeMega;
  }
  
  link.onclick = (e) => {
    e.preventDefault();
    if (isMobile()) {
      elements.mega.classList.contains('visible') ? closeMega() : openMega(type);
    } else {
      openMega(type);
    }
  };
  
  link.onkeydown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openMega(type);
    }
  };
});

elements.mega.onmouseenter = () => clearTimeout(timer);
if (!isMobile()) {
  elements.mega.onmouseleave = closeMega;
}

document.getElementById('searchBtn').onclick = (e) => {
  e.preventDefault();
  elements.search.classList.toggle('open');
  if (elements.search.classList.contains('open')) {
    document.getElementById('searchInput').focus();
  }
};

document.getElementById('navToggle').onclick = () => {
  elements.navLeft.classList.toggle('open');
  if (elements.navLeft.classList.contains('open')) {
    closeMega();
    elements.search.classList.remove('open');
  }
};

document.onclick = (e) => {
  const target = e.target;
  
  if (!elements.mega.contains(target) && !target.closest('.has-mega')) {
    closeMega();
  }
  
  if (!elements.search.contains(target)) {
    elements.search.classList.remove('open');
  }
  
  if (!elements.navLeft.contains(target) && !target.closest('#navToggle')) {
    elements.navLeft.classList.remove('open');
  }
};

document.onkeydown = (e) => {
  if (e.key === 'Escape') {
    closeMega();
    elements.search.classList.remove('open');
    elements.navLeft.classList.remove('open');
  }
};

const updateRoute = () => {
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
  
  closeMega();
  elements.search.classList.remove('open');
  elements.navLeft.classList.remove('open');
};

window.onresize = () => {
  if (!isMobile()) {
    elements.navLeft.classList.remove('open');
  }
};

updateRoute();
window.onhashchange = updateRoute;