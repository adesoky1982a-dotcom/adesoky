// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Elevate navbar on scroll
const header = document.querySelector(".top-nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    header.classList.add("elevated");
  } else {
    header.classList.remove("elevated");
  }
});

// ===== Scroll reveal animations =====
const revealTargetsSelectors = [
  ".hero-left",
  ".hero-card",
  "#about .section-inner",
  "#sectors .cards-grid",
  "#projects .projects-grid",
  "#experience .timeline",
  "#competencies .competencies-grid",
  "#downloads .downloads-grid",
  "#contact .contact-layout"
];

const revealEls = [];

revealTargetsSelectors.forEach((sel, idx) => {
  document.querySelectorAll(sel).forEach(el => {
    el.classList.add("reveal");
    if (idx === 1) el.classList.add("delay-1"); // hero card
    revealEls.push(el);
  });
});

const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18
  }
);

revealEls.forEach(el => io.observe(el));

// ===== Animated counters for stats in hero =====
const statNumbers = document.querySelectorAll(".stat-number");
let statsAnimated = false;

function animateNumber(el) {
  const target = parseInt(el.textContent.replace(/\D/g, ""), 10);
  if (isNaN(target)) return;

  let current = 0;
  const step = Math.max(1, Math.floor(target / 40));

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + (el.textContent.includes("+") ? "+" : "");
  }, 35);
}

const statsObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        statNumbers.forEach(animateNumber);
        statsObserver.disconnect();
      }
    });
  },
  { threshold: 0.3 }
);

const statsContainer = document.querySelector(".hero-stats");
if (statsContainer) statsObserver.observe(statsContainer);
