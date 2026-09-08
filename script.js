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
