const btnMobile = document.querySelector('.fa-bars');
const navbar = document.querySelector('.navbar');

function toggleMenu() {
    btnMobile.classList.toggle('fa-times');
    navbar.classList.toggle('nav-toggle');
}

btnMobile.addEventListener('click', toggleMenu);