ScrollReveal({
    reset: false,
    distance: '80px',
    duration: 1200,
    delay: 200
});

ScrollReveal().reveal('.greeting-text , .title', { origin: 'top' });
ScrollReveal().reveal('.groups , img , p', { origin: 'bottom' });
ScrollReveal().reveal('h3,#img-about', { origin: 'left' });

const body = document.querySelector("body");
const rootStyle = getComputedStyle(document.documentElement);
var typed = new Typed('#element', {
    strings: ['Full stack Java', 'Android', 'Integrateur de solution'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

let header = document.querySelector("header");
const toggleTheme = document.getElementById("toggle-theme");
const icon = document.querySelector("#theme-icon");
const menuLinks = document.querySelectorAll('.service-item a');


toggleTheme.addEventListener("click", e => {
    changeTheme()
})


menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        menuLinks.forEach(l => l.classList.remove('active'));
        e.currentTarget.classList.add('active');
    });
});


window.addEventListener("scroll", event => {
    displayBg()
})


function changeTheme() {
    body.classList.toggle("dark-mod"); 

    icon.classList.add("animate");

    setTimeout(() => {
        if (body.classList.contains("dark-mod")) { 
            icon.src = "./assets/icon/moon2.svg";
        } else {
            icon.src = "./assets/icon/sun.svg";
        }
        icon.classList.remove("animate");
    }, 250);

    displayBg();
}

function displayBg() {
   
        if (!body.classList.contains("dark-mod")) {
            const mainColor = rootStyle.getPropertyValue('--interractive-component').trim();
            header.style.backgroundColor = mainColor;
            header.style.boxShadow = " 0 2px 5px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.backgroundColor = "#113555";
            header.style.boxShadow = " 0 2px 5px rgba(0, 0, 0, 0.1)";
        }
}