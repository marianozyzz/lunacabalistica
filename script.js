const year = document.querySelector("#year");
const toast = document.querySelector(".toast");
let toastTimer;

if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll('[data-placeholder="true"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (!toast) return;

    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 2400);
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px" });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const parallaxLayers = document.querySelectorAll(".tree-background, .ambient");
let parallaxFrame = 0;

function updateParallax() {
  const scrollTop = window.scrollY;

  parallaxLayers.forEach((layer, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    const speed = layer.classList.contains("tree-background") ? 0.045 : 0.025;
    layer.style.setProperty("--parallax-y", `${scrollTop * speed * direction}px`);
  });

  parallaxFrame = 0;
}

function requestParallax() {
  if (reducedMotion.matches || parallaxFrame) return;
  parallaxFrame = requestAnimationFrame(updateParallax);
}

window.addEventListener("scroll", requestParallax, { passive: true });
updateParallax();
