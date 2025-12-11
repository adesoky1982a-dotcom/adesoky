// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Shadow on scroll for navbar
const header = document.querySelector(".top-nav");
window.addEventListener("scroll", () => {
  header.style.boxShadow = window.scrollY > 10
    ? "0 4px 18px rgba(0,0,0,0.14)"
    : "none";
});
