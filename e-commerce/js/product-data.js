// Product catalog data - 20 products across 4 categories
const products = [
    // Electronics (5 products)
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "Electronics",
        price: 79.99,
        description: "Premium wireless headphones with noise cancellation, 30-hour battery life, and superior sound quality.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        category: "Electronics",
        price: 249.99,
        description: "Advanced smartwatch with fitness tracking, heart rate monitor, GPS, and smartphone connectivity.",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
    },
    {
        id: 3,
        name: "4K Ultra HD TV 55 inch",
        category: "Electronics",
        price: 599.99,
        description: "55-inch 4K Smart TV with HDR, voice control, and streaming apps built-in.",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&h=500&fit=crop"
    },
    {
        id: 4,
        name: "Laptop Computer 15 inch",
        category: "Electronics",
        price: 899.99,
        description: "High-performance laptop with 16GB RAM, 512GB SSD, and Intel Core i7 processor.",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop"
    },
    {
        id: 5,
        name: "Wireless Charging Pad",
        category: "Electronics",
        price: 29.99,
        description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
        image: "https://m.media-amazon.com/images/I/61oIAKY9s1L._SX679_.jpg"
    },
    // Clothing (5 products)
    {
        id: 6,
        name: "Classic Denim Jacket",
        category: "Clothing",
        price: 69.99,
        description: "Timeless denim jacket made from premium cotton, perfect for any season.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop"
    },
    {
        id: 7,
        name: "Cotton T-Shirt Pack",
        category: "Clothing",
        price: 39.99,
        description: "Pack of 3 comfortable cotton t-shirts in various colors, 100% organic cotton.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop"
    },
    {
        id: 8,
        name: "Running Sneakers",
        category: "Clothing",
        price: 89.99,
        description: "Lightweight running shoes with cushioned sole and breathable mesh upper.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"
    },
    {
        id: 9,
        name: "Winter Wool Coat",
        category: "Clothing",
        price: 149.99,
        description: "Warm and stylish wool coat perfect for cold weather, available in multiple colors.",
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500&h=500&fit=crop"
    },
    {
        id: 10,
        name: "Leather Belt",
        category: "Clothing",
        price: 34.99,
        description: "Genuine leather belt with adjustable sizing and classic buckle design.",
        image: "https://m.media-amazon.com/images/I/71a5CvjG9mL._SX679_.jpg"
    },
    // Books (5 products)
    {
        id: 11,
        name: "The Great Novel",
        category: "Books",
        price: 19.99,
        description: "A captivating novel about adventure and discovery, perfect for book lovers.",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop"
    },
    {
        id: 12,
        name: "Programming Guide",
        category: "Books",
        price: 49.99,
        description: "Comprehensive guide to modern programming languages and best practices.",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=500&fit=crop"
    },
    {
        id: 13,
        name: "Cookbook Collection",
        category: "Books",
        price: 29.99,
        description: "Delicious recipes from around the world with beautiful photography and step-by-step instructions.",
        image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&h=500&fit=crop"
    },
    {
        id: 14,
        name: "History Encyclopedia",
        category: "Books",
        price: 59.99,
        description: "Complete encyclopedia covering world history from ancient times to modern day.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
    },
    {
        id: 15,
        name: "Science Fiction Classic",
        category: "Books",
        price: 24.99,
        description: "Award-winning science fiction novel exploring the future of humanity.",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&h=500&fit=crop"
    },
    // Home & Garden (5 products)
    {
        id: 16,
        name: "Indoor Plant Set",
        category: "Home & Garden",
        price: 44.99,
        description: "Set of 3 beautiful indoor plants perfect for home decoration and air purification.",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop"
    },
    {
        id: 17,
        name: "Ceramic Dinner Set",
        category: "Home & Garden",
        price: 79.99,
        description: "Elegant 16-piece ceramic dinner set for 4 people, dishwasher safe.",
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&h=500&fit=crop"
    },
    {
        id: 18,
        name: "Garden Tool Kit",
        category: "Home & Garden",
        price: 54.99,
        description: "Complete garden tool set with trowel, pruners, gloves, and storage bag.",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop"
    },
    {
        id: 19,
        name: "Decorative Throw Pillows",
        category: "Home & Garden",
        price: 39.99,
        description: "Set of 2 premium decorative throw pillows with modern designs.",
        image: "https://m.media-amazon.com/images/I/81F79urkMCL._SX679_.jpg"
    },
    {
        id: 20,
        name: "LED Desk Lamp",
        category: "Home & Garden",
        price: 34.99,
        description: "Modern LED desk lamp with adjustable brightness and color temperature.",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop"
    }
];



