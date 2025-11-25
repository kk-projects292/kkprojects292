// Authentication and User Management

// Initialize users storage - uses localStorage to store JSON data
async function initUsersStorage() {
    if (!localStorage.getItem('ecommerce_users')) {
        // Try to load from users.json file if it exists
        try {
            const response = await fetch('users.json');
            if (response.ok) {
                const users = await response.json();
                if (Array.isArray(users) && users.length > 0) {
                    localStorage.setItem('ecommerce_users', JSON.stringify(users));
                    return;
                }
            }
        } catch (e) {
            // File doesn't exist or can't be loaded, continue with empty array
            console.log('users.json not found, initializing with empty array');
        }
        // Initialize with empty array
        localStorage.setItem('ecommerce_users', JSON.stringify([]));
    }
}

// Get all users from storage
function getUsers() {
    // Ensure storage is initialized (synchronous check)
    if (!localStorage.getItem('ecommerce_users')) {
        // If not initialized, return empty array (will be initialized on next page load)
        return [];
    }
    try {
        return JSON.parse(localStorage.getItem('ecommerce_users') || '[]');
    } catch (e) {
        console.error('Error reading users:', e);
        return [];
    }
}

// Save users to storage
function saveUsers(users) {
    try {
        localStorage.setItem('ecommerce_users', JSON.stringify(users));
        return true;
    } catch (e) {
        console.error('Error saving users:', e);
        return false;
    }
}

// Get current logged in user
function getCurrentUser() {
    try {
        const userData = localStorage.getItem('ecommerce_current_user');
        return userData ? JSON.parse(userData) : null;
    } catch (e) {
        return null;
    }
}

// Set current logged in user
function setCurrentUser(user) {
    if (user) {
        localStorage.setItem('ecommerce_current_user', JSON.stringify(user));
    } else {
        localStorage.removeItem('ecommerce_current_user');
    }
}

// Register a new user - stores in localStorage (JSON format)
function registerUser(name, email, password) {
    const users = getUsers();
    
    // Check if email already exists
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        return false;
    }

    // Create new user object
    const newUser = {
        id: Date.now().toString(), // Simple ID generation
        name: name,
        email: email.toLowerCase(),
        password: password, // In production, this should be hashed
        registeredAt: new Date().toISOString()
    };

    // Add user to array
    users.push(newUser);
    
    // Save to localStorage (stored as JSON format)
    if (saveUsers(users)) {
        // Store a copy for JSON export (formatted JSON)
        localStorage.setItem('ecommerce_users_json', JSON.stringify(users, null, 2));
        console.log('User data saved to localStorage in JSON format:', newUser);
        return true;
    }
    return false;
}

// Export users to downloadable JSON file
function exportUsersToFile() {
    const users = getUsers();
    const jsonString = JSON.stringify(users, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Login user - checks user data from storage
function loginUser(email, password) {
    const users = getUsers();
    
    // Find user by email (case-insensitive)
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    // Check if user exists and password matches
    if (user && user.password === password) {
        // Set current user (without password)
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            registeredAt: user.registeredAt
        };
        setCurrentUser(userData);
        return true;
    }
    
    return false;
}

// Logout user - clears the current user session and removes user data from localStorage
function logoutUser() {
    // Remove current user session from localStorage
    localStorage.removeItem('ecommerce_current_user');
    
    // Optionally clear other user-specific data if needed
    // Note: Cart data is kept so user doesn't lose items if they log back in
    
    // User session is now cleared, navigation will update to show login menu
}

// Check if user is logged in
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// Require authentication - redirect to login if not logged in
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Export users data as JSON (for backup/export purposes)
function exportUsersJSON() {
    const users = getUsers();
    // Remove passwords before exporting
    const safeUsers = users.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        registeredAt: u.registeredAt
    }));
    return JSON.stringify(safeUsers, null, 2);
}

// Import users data from JSON (for import purposes)
function importUsersJSON(jsonString) {
    try {
        const users = JSON.parse(jsonString);
        if (Array.isArray(users)) {
            saveUsers(users);
            return true;
        }
        return false;
    } catch (e) {
        console.error('Error importing users:', e);
        return false;
    }
}

// Update navigation based on login status
function updateNavigation() {
    const navMenus = document.querySelectorAll('.nav-menu');
    const currentUser = getCurrentUser();
    
    navMenus.forEach(navMenu => {
        if (!navMenu) return;
        
        // Remove existing login/logout links
        const existingAuthLinks = navMenu.querySelectorAll('.auth-link');
        existingAuthLinks.forEach(link => link.remove());
        
        // Add appropriate link - structure matches other nav items
        const authLi = document.createElement('li');
        authLi.className = 'auth-link';
        
        if (currentUser) {
            // Show user icon with name and logout after login
            authLi.innerHTML = `
                <a href="#" class="logout-link" onclick="logoutUser(); return false;">
                    <svg class="user-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span class="user-name">${currentUser.name}</span>
                    <span>Logout</span>
                </a>
            `;
        } else {
            // Show login link with icon when not logged in - matches other nav items structure
            authLi.innerHTML = `
                <a href="login.html">
                    <svg class="user-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Login</span>
                </a>
            `;
        }
        navMenu.appendChild(authLi);
    });
}

// Global logout function that handles UI update and redirect
function handleLogout() {
    // Clear current user session and remove user data from localStorage
    logoutUser();
    
    // Immediately update navigation to remove username and show login menu
    // This ensures the UI updates before redirect
    updateNavigation();
    
    // Small delay to ensure UI updates are visible, then redirect
    setTimeout(function() {
        // Redirect to home page (initial stage)
        window.location.href = 'index.html';
    }, 100);
    
    // Prevent default link behavior
    return false;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async function() {
    await initUsersStorage();
    updateNavigation();
});

// Make functions available globally
window.registerUser = registerUser;
window.loginUser = loginUser;
window.logoutUser = handleLogout; // Use the wrapper function that includes redirect
window.isLoggedIn = isLoggedIn;
window.requireAuth = requireAuth;
window.getCurrentUser = getCurrentUser;
window.updateNavigation = updateNavigation;
window.exportUsersToFile = exportUsersToFile;

