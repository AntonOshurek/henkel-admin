const menuBtn = document.querySelector('.header__menu-btn');
const nav = document.querySelector('.navigation');
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.navigation__link');
const body = document.querySelector('.body');

let navStatus = false;
let lastFocusInPage = null;
navLinks.forEach((link) => link.setAttribute('tabindex', '-1'));

const onEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    lastFocusInPage.focus();
    console.log(lastFocusInPage)
    closeNav();
  }
};

function openNav() {
  nav.classList.add('open');
  header.classList.add('header--open-menu');
  navLinks.forEach((link) => link.removeAttribute('tabindex'));
  navLinks[0].focus();
  document.addEventListener('keydown', onEscKeydown);
  body.addEventListener('keydown', menuFocus);

  navStatus = true;
};

function closeNav() {
  nav.classList.remove('open');
  header.classList.remove('header--open-menu');
  navLinks.forEach((link) => link.setAttribute('tabindex', '-1'));
  document.removeEventListener('keydown', onEscKeydown);
  body.removeEventListener('keydown', menuFocus);

  navStatus = false;
}

const menu = () => {
  menuBtn.addEventListener('click', (evt) => {
    navStatus ? lastFocusInPage = null : lastFocusInPage = document.activeElement
    navStatus ? closeNav() : openNav();
  });
};

function menuFocus(e) {
  const elementsArray = navLinks;
  const firstFocusableEl = elementsArray[0];
  const lastFocusableEl = elementsArray[elementsArray.length - 1];
  const KEYCODE_TAB = 9;

  const isTabPressed = (e.key === 'Tab' || e.keyCode === KEYCODE_TAB);

  if (isTabPressed) {
    if ( e.shiftKey ) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        e.preventDefault();
        menuBtn.focus();
      }
      else if(document.activeElement === menuBtn) {
        e.preventDefault();
        lastFocusableEl.focus();
      }
    } else {
      if (document.activeElement === lastFocusableEl) {
        e.preventDefault();
        menuBtn.focus();
      } else if(document.activeElement === menuBtn) {
        e.preventDefault();
        firstFocusableEl.focus();
      }
    }
  }
}

export { menu };
