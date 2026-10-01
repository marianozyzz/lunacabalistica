const year = document.querySelector("#year");

if (year) year.textContent = new Date().getFullYear();

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
const parallaxLayers = document.querySelectorAll(".tree-background, .ambient, .section-symbol");
let parallaxFrame = 0;

function updateParallax() {
  const scrollTop = window.scrollY;

  parallaxLayers.forEach((layer, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    const speed = layer.classList.contains("tree-background") ? 0.035 : layer.classList.contains("section-symbol") ? 0.022 : 0.018;
    const property = layer.classList.contains("section-symbol") ? "--symbol-y" : "--parallax-y";
    layer.style.setProperty(property, `${scrollTop * speed * direction}px`);
  });

  parallaxFrame = 0;
}

function requestParallax() {
  if (reducedMotion.matches || parallaxFrame) return;
  parallaxFrame = requestAnimationFrame(updateParallax);
}

window.addEventListener("scroll", requestParallax, { passive: true });
updateParallax();
