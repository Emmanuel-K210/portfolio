const body = document.querySelector("body");
const rootStyle = getComputedStyle(document.documentElement);
const header = document.querySelector("header");
const toggleTheme = document.getElementById("toggle-theme");
const icon = document.querySelector("#theme-icon");
const menuIcon = document.querySelector("#menu-icon");

const container = document.querySelector(".container"); // scrollable container
const sections = [...container.querySelectorAll(".section")];
const menuLinks = [...document.querySelectorAll(".service-item a")];

// Associer id de section → lien
const linkById = Object.fromEntries(
  menuLinks.map(a => [a.getAttribute("href").slice(1), a])
);

// ---- Typed.js ----
var typed = new Typed('#element', {
  strings: ['Full stack Java', 'Android', 'Integrateur de solution'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

// ---- ScrollReveal ----
ScrollReveal({ reset: false, distance: '80px', duration: 1200, delay: 200 });
ScrollReveal().reveal('.greeting-text', { origin: 'top' });
//ScrollReveal().reveal('.groups , p', { origin: 'bottom' });
//ScrollReveal().reveal('h3,#img-about', { origin: 'left' });

// ---- Theme toggle ----
toggleTheme.addEventListener("click", changeTheme);

function changeTheme() {
  body.classList.toggle("dark-mod");
  icon.classList.add("animate");
  setTimeout(() => {
    icon.src = body.classList.contains("dark-mod") 
      ? "./assets/icon/moon2.svg" 
      : "./assets/icon/sun.svg";

    menuIcon.src = body.classList.contains("dark-mod")
      ? "./assets/icon/menu-icon-white.svg"
      : "./assets/icon/menu-icon.svg";

    icon.classList.remove("animate");
  }, 250);

  updateHeaderBg();
}

// ---- Observer pour menu actif ----
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    menuLinks.forEach(a => a.classList.remove('active'));
    linkById[id]?.classList.add('active');
    history.replaceState(null, '', `#${id}`);
  });
}, { root: container, threshold: 0.6 });

sections.forEach(s => io.observe(s));

// ---- Header background ----
container.addEventListener("scroll", updateHeaderBg);

function updateHeaderBg() {
  if (!body.classList.contains("dark-mod")) {
    header.style.backgroundColor = rootStyle.getPropertyValue('--interractive-component').trim();
  } else {
    header.style.backgroundColor = "#113555";
  }
  header.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
}

// ---- Click menu ----
menuLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
