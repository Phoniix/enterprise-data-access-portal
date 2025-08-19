window.isIndex = window.location.pathname.includes("index");

// Function to initialize navigation once elements are loaded
function initializeNavigation() {
    const sections = document.querySelectorAll('.spa-section');
    const navLinks = document.querySelectorAll('.navbar-links a');
    
    console.log("Initializing navigation with", navLinks.length, "links");

    function showSectionByHash(hash) {
        sections.forEach(section => {
            section.classList.add('hidden');
        });

        const target = document.querySelector(hash);
        if(target) {
            target.classList.remove('hidden');
            requestAnimationFrame(() => {
                window.scrollTo(0, 0);
            });
        }
    }

    function updateActiveLink() {
        const currentHash = window.location.hash || '#home';
        
        navLinks.forEach(nav => {
            const href = nav.getAttribute('href');
            // Check if the href ends with the current hash
            if (href.endsWith(currentHash)) {
                nav.classList.add('active-page');
                console.log("✅ Added active-page to:", nav.textContent);
            } else {
                nav.classList.remove('active-page');
            }
        });
    }

    // Click Navigation MGMT
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links, add to clicked one
            navLinks.forEach(nav => nav.classList.remove('active-page'));
            link.classList.add('active-page');

            const href = link.getAttribute('href');
            // Extract just the hash part (everything after #)
            const hash = href.includes('#') ? '#' + href.split('#')[1] : '#home';
            
            history.pushState(null, '', hash);
            showSectionByHash(hash);
        });
    });

    // Handle back/forth navigation
    window.addEventListener('popstate', () => {
        showSectionByHash(window.location.hash || '#home');
        updateActiveLink();
    });

    // Load home page on initial page load
    showSectionByHash(window.location.hash || '#home');
    updateActiveLink();
    
    console.log("Navigation initialized successfully!");
}

// Wait for navigation links to appear in the DOM
function waitForNavigation() {
    const navLinks = document.querySelectorAll('.navbar-links a');
    
    if (navLinks.length > 0) {
        // Navigation found, initialize it
        initializeNavigation();
    } else {
        // Keep checking every 100ms until navigation appears
        console.log("Waiting for navigation to load...");
        setTimeout(waitForNavigation, 100);
    }
}

// Start checking once DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, waiting for navigation...");
    waitForNavigation();
});

// Alternative: Use MutationObserver for better performance (optional)
function observeForNavigation() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const navLinks = document.querySelectorAll('.navbar-links a');
                if (navLinks.length > 0) {
                    console.log("Navigation detected by observer!");
                    observer.disconnect(); // Stop observing
                    initializeNavigation();
                }
            }
        });
    });

    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Uncomment this line if you prefer the observer approach:
// document.addEventListener('DOMContentLoaded', observeForNavigation);