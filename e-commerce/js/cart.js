// Cart management functions

// Get cart from local storage
function getCart() {
    try {
        return JSON.parse(localStorage.getItem('ecommerce_cart') || '[]');
    } catch (e) {
        return [];
    }
}

// Save cart to local storage
function saveCart(cart) {
    localStorage.setItem('ecommerce_cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(productId, quantity = 1) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        alert('Product not found');
        return;
    }

    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        // Update quantity (max 10)
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > 10) {
            alert('Maximum quantity is 10');
            existingItem.quantity = 10;
        } else {
            existingItem.quantity = newQuantity;
        }
    } else {
        // Add new item
        cart.push({
            productId: productId,
            quantity: quantity,
            price: product.price
        });
    }
    
    saveCart(cart);
    updateCartCount();
}

// Remove item from cart
function removeCartItem(productId) {
    const cart = getCart();
    const filteredCart = cart.filter(item => item.productId !== productId);
    saveCart(filteredCart);
    updateCartCount();
}

// Update cart item quantity
function updateCartItemQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
        if (quantity < 1) {
            removeCartItem(productId);
        } else if (quantity > 10) {
            alert('Maximum quantity is 10');
            item.quantity = 10;
            saveCart(cart);
        } else {
            item.quantity = quantity;
            saveCart(cart);
        }
    }
    
    updateCartCount();
}

// Clear cart
function clearCart() {
    localStorage.removeItem('ecommerce_cart');
    updateCartCount();
}

// Get cart total
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update cart count in navigation
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cart-count');
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        if (element) {
            element.textContent = count;
        }
    });
}

// Make functions available globally
window.addToCart = addToCart;
window.removeCartItem = removeCartItem;
window.updateCartItemQuantity = updateCartItemQuantity;
window.clearCart = clearCart;
window.getCart = getCart;
window.getCartTotal = getCartTotal;
window.updateCartCount = updateCartCount;
