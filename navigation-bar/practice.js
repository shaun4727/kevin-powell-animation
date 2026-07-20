class PremiumNavigation {
    constructor() {
        this.header = document.getElementById('site-header');
        this.navLinks = document.querySelectorAll('.dropdown-trigger');
        this.navItems = document.querySelectorAll('.has-dropdown');

        this.init();
    }
    init() {
        // this.checkScroll();
        this.bindEvents();
    }
    checkScroll() {
        if (window.scrollY > 10) {
            this.header.classList.add('is-scrolled');
        } else {
            this.header.classList.remove('is-scrolled');
        }
    }

    bindEvents() {
        window.addEventListener('scroll', () => this.checkScroll(), { passive: true });


        this.navLinks.forEach(navlink => {
            navlink.addEventListener('click', (e) => this.handleDropdownClick(e, navlink));
        });


        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    handleDropdownClick(e, trigger) {
        e.preventDefault();
        console.log('clicked');
        const parentItem = trigger.closest('.has-dropdown');
        const isCurrentlyExpanded = trigger.getAttribute('aria-expanded') === 'true';

        this.closeAllDropdown(parentItem);

        if (isCurrentlyExpanded) {
            trigger.setAttribute('aria-expanded', 'false');
            parentItem.classList.remove('is-active');
        } else {
            console.log(isCurrentlyExpanded);
            trigger.setAttribute('aria-expanded', 'true');
            parentItem.classList.add('is-active');
        }
    }

    closeAllDropdown(parentItem) {
        this.navItems.forEach(item => {
            if (item !== parentItem) {
                item.classList.remove('is-active');
                const trigger = item.querySelector('.dropdown-trigger');
                if (trigger) {
                    trigger.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    handleOutsideClick(e) {
        // If click is outside the nav list, close all dropdowns
        if (!e.target.closest('.nav-list')) {
            this.closeAllDropdown();
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    new PremiumNavigation();
});