const menuToggle = document.querySelector(".menu-toggle");
const stackContainer = document.querySelector(".stack");

menuToggle.addEventListener("click", () => {
    // Toggle the active animation attribute on the parent
    const isOpen = stackContainer.hasAttribute("data-big-nav");

    if (isOpen) {
        stackContainer.removeAttribute("data-big-nav");
        menuToggle.setAttribute("aria-expanded", "false");
    } else {
        stackContainer.setAttribute("data-big-nav", "open");
        menuToggle.setAttribute("aria-expanded", "true");
    }
});