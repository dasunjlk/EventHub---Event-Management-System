/**
 * Intersection Observer for scroll-based animations.
 * Adds 'is-visible' class to elements when they enter the viewport.
 */
export const initAnimations = () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px', // Reveal slightly after entering viewport
        threshold: 0.05 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // console.log('Revealing element:', entry.target);
                requestAnimationFrame(() => {
                    entry.target.classList.add('is-visible');
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const applyAnimationToElement = (el) => {
        if (el.classList.contains('reveal-on-scroll') || el.classList.contains('is-visible')) return;

        // Comprehensive selectors for all major UI parts
        const selectors = 'section, .glass-panel, .card, .event-card, [class*="card"], .section-heading, .section-subheading, img, button, .footer-section, .nav-item';
        if (el.matches?.(selectors)) {
            // console.log('Observing element:', el);
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        }

        // Refined stagger for grid children
        if (el.parentElement && (el.parentElement.classList.contains('grid') || el.parentElement.className.includes('grid-cols'))) {
            const index = Array.from(el.parentElement.children).indexOf(el);
            if (index < 20) {
                el.style.transitionDelay = `${index * 0.05}s`; // Refined stagger delay
            }
            el.classList.add('reveal-on-scroll');
            observer.observe(el);
        }
    };

    // Initial scan
    const allRevealables = document.querySelectorAll('section, .glass-panel, .card, .event-card, [class*="card"], .section-heading, .section-subheading, img, button, .footer-section, .nav-item');
    allRevealables.forEach(el => applyAnimationToElement(el));

    // Watch for new elements (React dynamic rendering)
    const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Element node
                    applyAnimationToElement(node);
                    // Also check children of the added node
                    const children = node.querySelectorAll?.('section, .glass-panel, .card, .event-card, [class*="card"], .section-heading, .section-subheading, img, button, .footer-section, .nav-item');
                    children?.forEach(child => applyAnimationToElement(child));
                }
            });
        });
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
};

// Auto-initialize
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initAnimations();
} else {
    document.addEventListener('DOMContentLoaded', initAnimations);
}
