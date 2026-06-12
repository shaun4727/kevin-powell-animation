class PremiumNavigation {
    constructor() {
        this.header = document.getElementById('site-header');
        this.mobileToggle = document.querySelector('.mobile-toggle');
        this.navLinks = document.querySelectorAll('.dropdown-trigger');
        this.navItems = document.querySelectorAll('.has-dropdown');

        this.isMobileMenuOpen = false;

        this.init();
    }

    init() {
        this.bindEvents();
        this.checkScroll();
    }

    bindEvents() {
        // Scroll behavior
        window.addEventListener('scroll', () => this.checkScroll(), { passive: true });

        // Mobile menu toggle
        this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());

        // Desktop/Mobile Dropdown toggles
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleDropdownClick(e, link));
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));

        // Keyboard accessibility (ESC to close)
        document.addEventListener('keydown', (e) => this.handleEscapeKey(e));
    }

    checkScroll() {
        if (window.scrollY > 10) {
            this.header.classList.add('is-scrolled');
        } else {
            this.header.classList.remove('is-scrolled');
        }
    }

    toggleMobileMenu() {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;

        this.header.classList.toggle('mobile-open');
        this.mobileToggle.setAttribute('aria-expanded', this.isMobileMenuOpen);

        // Prevent body scrolling when mobile menu is open
        document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }

    handleDropdownClick(e, trigger) {
        e.preventDefault();

        const parentItem = trigger.closest('.has-dropdown');
        const isCurrentlyExpanded = trigger.getAttribute('aria-expanded') === 'true';

        // Close all other open dropdowns first
        this.closeAllDropdowns(parentItem);

        // Toggle current dropdown
        if (isCurrentlyExpanded) {
            trigger.setAttribute('aria-expanded', 'false');
            parentItem.classList.remove('is-active');
        } else {
            trigger.setAttribute('aria-expanded', 'true');
            parentItem.classList.add('is-active');
        }
    }

    closeAllDropdowns(exceptItem = null) {
        this.navItems.forEach(item => {
            if (item !== exceptItem) {
                item.classList.remove('is-active');
                const trigger = item.querySelector('.dropdown-trigger');
                if (trigger) trigger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    handleOutsideClick(e) {
        // If click is outside the nav list, close all dropdowns
        if (!e.target.closest('.nav-list')) {
            this.closeAllDropdowns();
        }
    }

    handleEscapeKey(e) {
        if (e.key === 'Escape') {
            this.closeAllDropdowns();

            if (this.isMobileMenuOpen) {
                this.toggleMobileMenu();
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PremiumNavigation();
});