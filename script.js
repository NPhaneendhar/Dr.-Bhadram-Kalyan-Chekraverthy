const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const body = document.body;

window.addEventListener("load", () => {
  body.classList.remove("preload");
  requestAnimationFrame(() => {
    body.classList.add("is-ready");
  });
});

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("show");
    menuBtn.classList.toggle("active", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuBtn.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("active"));
}
