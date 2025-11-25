// Main JavaScript for homepage functionality

let currentFilter = 'all';
let currentSearch = '';
let featuredIndex = 0;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    setupFeaturedSlider();
    setupSearchFilter();
    updateCartCount();
});

// Display products based on filter and search
function displayProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    let filteredProducts = products;

    // Apply category filter
    if (currentFilter !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === currentFilter);
    }

    // Apply search filter
    if (currentSearch) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
            p.description.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }

    // Display products
    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found.</p>';
        return;
    }

    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-card-info">
                <span class="product-card-category">${product.category}</span>
                <h3>${product.name}</h3>
                <p class="product-card-price">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id}, 1)">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Setup featured products slider
function setupFeaturedSlider() {
    const slider = document.getElementById('featured-slider');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!slider) return;

    // Get first 5 products as featured
    const featuredProducts = products.slice(0, 5);

    // Display featured products
    slider.innerHTML = featuredProducts.map(product => `
        <div class="product-card" style="min-width: 250px; flex-shrink: 0; margin-right: 1rem;" onclick="window.location.href='product-detail.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-card-info">
                <span class="product-card-category">${product.category}</span>
                <h3>${product.name}</h3>
                <p class="product-card-price">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary" onclick="event.stopPropagation(); addToCart(${product.id}, 1)">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Slider navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            featuredIndex = (featuredIndex - 1 + featuredProducts.length) % featuredProducts.length;
            updateSliderPosition();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            featuredIndex = (featuredIndex + 1) % featuredProducts.length;
            updateSliderPosition();
        });
    }

    // Auto-slide every 5 seconds
    setInterval(() => {
        featuredIndex = (featuredIndex + 1) % featuredProducts.length;
        updateSliderPosition();
    }, 5000);

    function updateSliderPosition() {
        const cardWidth = 250 + 16; // card width + gap
        const maxIndex = Math.max(0, featuredProducts.length - 3); // Show 3 cards at a time on desktop
        if (featuredIndex > maxIndex) {
            featuredIndex = maxIndex;
        }
        slider.style.transform = `translateX(-${featuredIndex * cardWidth}px)`;
    }
    
    // Initialize slider position
    updateSliderPosition();
}

// Setup search and filter functionality
function setupSearchFilter() {
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Search input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            displayProducts();
        });
    }

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Update filter
            currentFilter = btn.dataset.category;
            displayProducts();
        });
    });
}

// Add to cart function (uses cart.js functions)
function addToCart(productId, quantity) {
    if (typeof window.addToCart === 'function') {
        window.addToCart(productId, quantity);
        alert('Product added to cart!');
    } else {
        // Load cart.js if not already loaded
        const script = document.createElement('script');
        script.src = 'js/cart.js';
        script.onload = () => {
            if (window.addToCart) {
                window.addToCart(productId, quantity);
                alert('Product added to cart!');
            }
        };
        document.head.appendChild(script);
    }
    updateCartCount();
}

// Update cart count in navigation
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        try {
            const cart = JSON.parse(localStorage.getItem('ecommerce_cart') || '[]');
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = count;
        } catch (e) {
            cartCount.textContent = '0';
        }
    }
}

