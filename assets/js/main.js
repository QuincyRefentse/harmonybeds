// ========== assets/js/products.js ==========
// Products page dynamic functionality with image placeholders

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
    image: 'beds1.jfif' // Place your image here
  },
  {
    id: 2,
    name: 'Ergo Rest',
    category: 'ergonomic',
    price: 3290,
    desc: 'Zoned memory foam and latex adapt to your body, relieving pressure points.',
    icon: 'fa-hand-sparkles',
    size: 'king',
    image: 'bed-ergonomic.jpg'
  },
  {
    id: 3,
    name: 'Smart Serene',
    category: 'smart',
    price: 4990,
    desc: 'Adjustable firmness, sleep tracking, and zero-gravity position. Innovation meets luxury.',
    icon: 'fa-moon',
    size: 'split king',
    image: 'bed-smart.jpg'
  },
  {
    id: 4,
    name: 'Organic Gold',
    category: 'luxury',
    price: 5890,
    desc: 'Hand-tufted organic cotton, cashmere blend, and sustainable latex. Pure indulgence.',
    icon: 'fa-leaf',
    size: 'cal king',
    image: 'bed-luxury.jpg'
  },
  {
    id: 5,
    name: 'Heritage Plus',
    category: 'classic',
    price: 2890,
    desc: 'Traditional craftsmanship with modern pocket spring technology and European linen cover.',
    icon: 'fa-crown',
    size: 'queen',
    image: 'bed-classic-2.jpg'
  },
  {
    id: 6,
    name: 'PostureSense',
    category: 'ergonomic',
    price: 3590,
    desc: 'Seven-zone support system with cooling gel infusion for temperature regulation.',
    icon: 'fa-temperature-low',
    size: 'king',
    image: 'bed-ergonomic-2.jpg'
  },
  {
    id: 7,
    name: 'Aura Smart',
    category: 'smart',
    price: 5290,
    desc: 'Bio-motion sensors and ambient lighting that syncs with your circadian rhythm.',
    icon: 'fa-lightbulb',
    size: 'eastern king',
    image: 'bed-smart-2.jpg'
  },
  {
    id: 8,
    name: 'Imperial Gold',
    category: 'luxury',
    price: 6990,
    desc: 'Limited edition with gold-thread upholstery, silk panel, and hand-stitched details.',
    icon: 'fa-gem',
    size: 'super king',
    image: 'bed-luxury-2.jpg'
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

// Check if image exists, otherwise use placeholder
function getImageHTML(imageName, productName, icon) {
  // For demo purposes, we'll use placeholders with icons
  // In production, you can replace this with actual image tags
  return `
    <div class="product-image placeholder">
      <i class="fas ${icon}"></i>
      <span style="display: none;">${imageName}</span>
    </div>
  `;
  
  // UNCOMMENT THIS WHEN YOU HAVE ACTUAL IMAGES:
  /*
  return `
    <div class="product-image">
      <img src="assets/images/${imageName}" 
           alt="${productName}" 
           onerror="this.onerror=null; this.parentElement.classList.add('placeholder'); this.style.display='none'; this.parentElement.innerHTML='<i class=\'fas ${icon}\'></i>';">
    </div>
  `;
  */
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
  
  // Generate HTML with image placeholders
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