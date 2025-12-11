  // ====== HAMBURGER + NAV OVERLAY ======
const hamburger = document.getElementById("hamburger");
const navbar = document.querySelector(".navbar");
const navOverlay = document.getElementById("navOverlay");

if (hamburger && navbar && navOverlay) {
    hamburger.addEventListener("click", () => {
        navbar.classList.toggle("nav-open");
        navOverlay.classList.toggle("show");
        hamburger.classList.toggle("is-active");
    });

    navOverlay.addEventListener("click", () => {
        navbar.classList.remove("nav-open");
        navOverlay.classList.remove("show");
        hamburger.classList.remove("is-active");
    });

    document.querySelectorAll(".navbar a").forEach((link) => {
        link.addEventListener("click", () => {
            navbar.classList.remove("nav-open");
            navOverlay.classList.remove("show");
            hamburger.classList.remove("is-active");
        });
    });
}