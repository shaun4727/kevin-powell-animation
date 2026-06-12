class PremiumModal {
    constructor(modalElement) {
        this.modal = modalElement;
        this.window = this.modal.querySelector('.modal-window');
        this.closeButtons = this.modal.querySelectorAll('[data-modal-close]');

        // Accessibility & State tracking
        this.focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        this.firstFocusable = null;
        this.lastFocusable = null;
        this.previousActiveElement = null;
        this.isOpen = false;

        this.init();
    }

    init() {
        // Bind methods to maintain context
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.close = this.close.bind(this);

        // Attach close button listeners
        this.closeButtons.forEach(btn => {
            btn.addEventListener('click', this.close);
        });
    }

    updateFocusableElements() {
        const focusableContent = this.modal.querySelectorAll(this.focusableElements);
        this.firstFocusable = focusableContent[0];
        this.lastFocusable = focusableContent[focusableContent.length - 1];
    }

    open() {
        if (this.isOpen) return;

        // Store the element that triggered the modal to restore focus later
        this.previousActiveElement = document.activeElement;

        this.isOpen = true;
        this.updateFocusableElements();

        // DOM Updates
        this.modal.setAttribute('aria-hidden', 'false');
        this.modal.classList.add('is-open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Event Listeners
        document.addEventListener('keydown', this.handleKeyDown);
        this.modal.addEventListener('click', this.handleOutsideClick);

        // Set focus to modal window for screen readers, or first input
        const firstInput = this.modal.querySelector('input');
        if (firstInput) {
            // Small delay ensures display:none to block transition completes
            setTimeout(() => firstInput.focus(), 50);
        } else {
            this.window.focus();
        }
    }

    close() {
        if (!this.isOpen) return;
        this.isOpen = false;

        // DOM Updates
        this.modal.setAttribute('aria-hidden', 'true');
        this.modal.classList.remove('is-open');
        document.body.style.overflow = ''; // Restore background scrolling

        // Cleanup Event Listeners
        document.removeEventListener('keydown', this.handleKeyDown);
        this.modal.removeEventListener('click', this.handleOutsideClick);

        // Restore focus to original trigger element
        if (this.previousActiveElement) {
            this.previousActiveElement.focus();
        }
    }

    handleOutsideClick(e) {
        // If the click is directly on the backdrop (not on the modal window)
        if (e.target === this.modal) {
            this.close();
        }
    }

    handleKeyDown(e) {
        // ESC to close
        if (e.key === 'Escape') {
            this.close();
            return;
        }

        // Tab trap
        if (e.key === 'Tab') {
            // If there are no focusable elements, prevent tabbing
            if (!this.firstFocusable) {
                e.preventDefault();
                return;
            }

            if (e.shiftKey) { // Shift + Tab
                if (document.activeElement === this.firstFocusable || document.activeElement === this.window) {
                    e.preventDefault();
                    this.lastFocusable.focus();
                }
            } else { // Tab
                if (document.activeElement === this.lastFocusable) {
                    e.preventDefault();
                    this.firstFocusable.focus();
                }
            }
        }
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    const modalDOM = document.getElementById('premium-modal');
    const triggerBtn = document.getElementById('open-modal-btn');

    if (modalDOM && triggerBtn) {
        const modalInstance = new PremiumModal(modalDOM);

        // Prevent default form submission for demo purposes
        const form = document.getElementById('upgrade-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                // Here you would handle your API call, then close
                modalInstance.close();
            });
        }

        triggerBtn.addEventListener('click', () => {
            modalInstance.open();
        });
    }
});