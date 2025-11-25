// Checkout form handling

// Process checkout form submission
function processCheckout() {
    const cart = getCart();
    
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items to cart first.');
        window.location.href = 'cart.html';
        return;
    }

    // Get form values
    const customerName = document.getElementById('customer-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    // Validate form
    if (!customerName || !email || !phone || !address) {
        alert('Please fill in all required fields.');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Get products for order items
    const orderItems = cart.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
            name: product ? product.name : 'Unknown Product',
            quantity: item.quantity,
            price: item.price
        };
    });

    // Calculate total
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order object
    const order = {
        orderId: generateOrderId(),
        customerName: customerName,
        email: email,
        phone: phone,
        address: address,
        items: orderItems,
        totalPrice: totalPrice,
        orderDate: new Date().toISOString()
    };

    // Save order to local storage
    saveOrder(order);

    // Clear cart
    clearCart();

    // Redirect to orders page
    alert('Order placed successfully!');
    window.location.href = 'orders.html';
}

// Generate unique order ID
function generateOrderId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    return `ORD-${timestamp}-${random}`;
}

// Save order to local storage
function saveOrder(order) {
    try {
        const orders = JSON.parse(localStorage.getItem('ecommerce_orders') || '[]');
        orders.push(order);
        localStorage.setItem('ecommerce_orders', JSON.stringify(orders));
    } catch (e) {
        console.error('Error saving order:', e);
        alert('Error saving order. Please try again.');
    }
}

// Make function available globally
window.processCheckout = processCheckout;



