const menuBtn = document.querySelector('.header__menu-btn');
const nav = document.querySelector('.navigation');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.navigation__link');

let navStatus = false;
navLinks.forEach((link) => link.setAttribute('tabindex', '-1'));

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeNav();
  }
};

function openNav() {
  nav.classList.add('open');
  header.classList.add('header--open-menu');
  navLinks.forEach((link) => link.removeAttribute('tabindex'));
  navLinks[0].focus();
  document.addEventListener('keydown', onEscKeydown);
  navStatus = true;
};

function closeNav() {
  nav.classList.remove('open');
  header.classList.remove('header--open-menu');
  navLinks.forEach((link) => link.setAttribute('tabindex', '-1'));
  document.removeEventListener('keydown', onEscKeydown);
  navStatus = false;
}

const menu = () => {
  menuBtn.addEventListener('click', (evt) => {
    navStatus ? closeNav() : openNav();
  });
};

export { menu };
