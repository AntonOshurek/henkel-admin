const menuBtn = document.querySelector('.header__menu-btn');
const nav = document.querySelector('.navigation');
const header = document.querySelector('.header');

let navStatus = false;

const openNav = () => {
  nav.classList.add('open');
  header.classList.add('header--open-menu');
  navStatus = true;
};

const closeNav = () => {
  nav.classList.remove('open');
  header.classList.remove('header--open-menu');
  navStatus = false;
}

const menu = () => {
  menuBtn.addEventListener('click', (evt) => {
    navStatus ? closeNav() : openNav();
  });
};

// const startPageWidthValue = window.innerWidth;
// console.log(startPageWidthValue);

// window.addEventListener('resize', () => {
//   var w = document.documentElement.clientWidth;
//   w >= 900 ? openNav() : closeNav();
//   console.log(w);
// });

export { menu };

