// ========== assets/js/products.js ==========
// Products page dynamic functionality with images

// Product database with image filenames
const products = [
  {
    id: 1,
    name: 'Classic Harmony',
    category: 'classic',
    price: 2490,
    desc: 'Timeless design with premium pocket springs and natural fillings for balanced support.',
    icon: 'fa-bed',
    size: 'queen',
    image: 'beds1.jfif'
  },
  {
    id: 2,
    name: 'Ergo Rest',
    category: 'ergonomic',
    price: 3290,
    desc: 'Zoned memory foam and latex adapt to your body, relieving pressure points.',
    icon: 'fa-hand-sparkles',
    size: 'king',
    image: 'beds2.jfif'  // Updated to use beds2.jfif
  },
  {
    id: 3,
    name: 'Smart Serene',
    category: 'smart',
    price: 4990,
    desc: 'Adjustable firmness, sleep tracking, and zero-gravity position. Innovation meets luxury.',
    icon: 'fa-moon',
    size: 'split king',
    image: 'beds3.jfif'  // Updated to use beds3.jfif
  },
  {
    id: 4,
    name: 'Organic Gold',
    category: 'luxury',
    price: 5890,
    desc: 'Hand-tufted organic cotton, cashmere blend, and sustainable latex. Pure indulgence.',
    icon: 'fa-leaf',
    size: 'cal king',
    image: 'beds4.jfif'  // Updated to use beds4.jfif
  },
  {
    id: 5,
    name: 'Heritage Plus',
    category: 'classic',
    price: 2890,
    desc: 'Traditional craftsmanship with modern pocket spring technology and European linen cover.',
    icon: 'fa-crown',
    size: 'queen',
    image: 'beds5.jfif'  // Updated to use beds5.jfif
  },
  {
    id: 6,
    name: 'PostureSense',
    category: 'ergonomic',
    price: 3590,
    desc: 'Seven-zone support system with cooling gel infusion for temperature regulation.',
    icon: 'fa-temperature-low',
    size: 'king',
    image: 'beds6.jfif'  // Updated to use beds6.jfif
  },
  {
    id: 7,
    name: 'Aura Smart',
    category: 'smart',
    price: 5290,
    desc: 'Bio-motion sensors and ambient lighting that syncs with your circadian rhythm.',
    icon: 'fa-lightbulb',
    size: 'eastern king',
    image: 'beds7.jfif'  // Updated to use beds7.jfif
  },
  {
    id: 8,
    name: 'Imperial Gold',
    category: 'luxury',
    price: 6990,
    desc: 'Limited edition with gold-thread upholstery, silk panel, and hand-stitched details.',
    icon: 'fa-gem',
    size: 'super king',
    image: 'beds8.jfif'  // Updated to use beds8.jfif
  }
];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');

// Current state
let currentFilter = 'all';
let currentSort = 'default';
let filteredProducts = [...products];

// Function to get image HTML with fallback
function getImageHTML(imageName, productName, icon) {
  return `
    <div class="product-image">
      <img src="assets/images/${imageName}" 
           alt="${productName}" 
           onerror="this.onerror=null; this.parentElement.classList.add('placeholder'); this.style.display='none'; this.parentElement.innerHTML='<i class=\'fas ${icon}\'></i>';">
    </div>
  `;
}

// Render products to grid
function renderProducts() {
  if (!productsGrid) return;
  
  // Apply filter
  if (currentFilter === 'all') {
    filteredProducts = [...products];
  } else {
    filteredProducts = products.filter(p => p.category === currentFilter);
  }
  
  // Apply sort
  if (currentSort === 'price-low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'name') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  // Generate HTML with actual images
  productsGrid.innerHTML = filteredProducts.map(product => `
    <div class="product-card" data-category="${product.category}" data-price="${product.price}">
      ${getImageHTML(product.image, product.name, product.icon)}
      <div class="product-info">
        <h3>${product.name}</h3>
        <div class="product-category">${product.category}</div>
        <p class="product-desc">${product.desc}</p>
        <div class="product-price">$${product.price.toLocaleString()} <small>${product.size}</small></div>
        <a href="#" class="btn-card">view details</a>
      </div>
    </div>
  `).join('');
  
  // Re-trigger animations
  document.querySelectorAll('.product-card').forEach((card, index) => {
    card.style.animation = 'none';
    card.offsetHeight; // reflow
    card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.05}s`;
  });
}
// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const body = document.body;

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Change icon based on menu state
    const icon = this.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      body.classList.remove('menu-open');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });

  // Close menu when clicking outside (optional - handled by overlay)
  document.addEventListener('click', function(e) {
    if (body.classList.contains('menu-open') && 
        !navLinks.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
      navLinks.classList.remove('active');
      body.classList.remove('menu-open');
      const icon = mobileMenuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active');
      body.classList.remove('menu-open');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
}

// Filter button handlers
filterButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    // Update active state
    filterButtons.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    // Update filter and render
    currentFilter = this.dataset.filter;
    renderProducts();
  });
});

// Sort handler
if (sortSelect) {
  sortSelect.addEventListener('change', function() {
    currentSort = this.value;
    renderProducts();
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  renderProducts();
  
  // Add quick view functionality (demo)
  productsGrid.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-card') || e.target.parentElement.classList.contains('btn-card')) {
      e.preventDefault();
      const card = e.target.closest('.product-card');
      if (card) {
        const productName = card.querySelector('h3').textContent;
        alert(`✨ ${productName} — a masterpiece of comfort. Our sleep consultant will contact you shortly.`);
      }
    }
  });
});