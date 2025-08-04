
// Show/Hide Sections (Single Page Application [SPA] Funtionality)
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.spa-section');
    const navLinks = document.querySelectorAll('.nav-link');

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

    // Click Navigation MGMT
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const hash = link.getAttribute('href');
            history.pushState(null, '', hash); // update URL live. No reload necesary.
            showSectionByHash(hash);
        });
    });

    // Handle back/forth navigation
    window.addEventListener('popstate', () => {
        showSectionByHash(window.location.hash || '#home');
    });

    // Prevent auto scroll on section load
    

    // Load home page on initial page load
    showSectionByHash(window.location.hash || '#home');
});