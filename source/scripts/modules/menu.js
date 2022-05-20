const menuBtn = document.querySelector('.header__menu-btn');
const nav = document.querySelector('.navigation');

let navStatus = false;

const openNav = () => {
  nav.classList.add('open');
  navStatus = true;
};

const closeNav = () => {
  nav.classList.remove('open');
  navStatus = false;
}

const menu = () => {
  menuBtn.addEventListener('click', (evt) => {
    navStatus ? closeNav() : openNav();
  });
};

export { menu };

