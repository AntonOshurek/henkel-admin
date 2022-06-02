const bodyElement = document.querySelector('.body');
const headerElement = document.querySelector('.header');
const navigationElement = document.querySelector('.navigation');
const menuButtonElement = document.querySelector('.header__menu-btn');
const navigationLinksArray = document.querySelectorAll('.navigation__link');

const KEYCODE_TAB = 9;
const FIRST_MENU_FOCUS_ELEMENT = navigationLinksArray[0];
const LAST_MENU_FOCUS_ELEMENT = navigationLinksArray[navigationLinksArray.length - 1];
const NAVIGATION_STATUS = {
  OPEN: 'open',
  CLOSE: 'close',
};

let currentNavigationStatus = null;
let lastFocusInPage = null;
navigationLinksArray.forEach((link) => link.setAttribute('tabindex', '-1'));

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    lastFocusInPage.focus();
    closeNav();
  }
};

function openNav() {
  navigationElement.classList.add('open');
  headerElement.classList.add('header--open-menu');
  navigationLinksArray.forEach((link) => link.removeAttribute('tabindex'));
  navigationLinksArray[0].focus();

  document.addEventListener('keydown', onEscKeydown);
  bodyElement.addEventListener('keydown', menuFocus);

  currentNavigationStatus = NAVIGATION_STATUS.OPEN;
};

function closeNav() {
  navigationElement.classList.remove('open');
  headerElement.classList.remove('header--open-menu');
  navigationLinksArray.forEach((link) => link.setAttribute('tabindex', '-1'));

  document.removeEventListener('keydown', onEscKeydown);
  bodyElement.removeEventListener('keydown', menuFocus);

  currentNavigationStatus = NAVIGATION_STATUS.CLOSE;
}

const menu = () => {
  menuButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    if(currentNavigationStatus === NAVIGATION_STATUS.OPEN) {
      lastFocusInPage = null
      closeNav()
    } else {
      lastFocusInPage = document.activeElement
      openNav()
    }
  });
};

function menuFocus(e) {
  if (e.key === 'Tab' || e.keyCode === KEYCODE_TAB) {
    if ( e.shiftKey ) /* shift + tab */ {
      if (document.activeElement === FIRST_MENU_FOCUS_ELEMENT) {
        e.preventDefault();
        menuButtonElement.focus();
      }
      else if(document.activeElement === menuButtonElement) {
        e.preventDefault();
        LAST_MENU_FOCUS_ELEMENT.focus();
      }
    } else /*tab*/  {
      if (document.activeElement === LAST_MENU_FOCUS_ELEMENT) {
        e.preventDefault();
        menuButtonElement.focus();
      } else if(document.activeElement === menuButtonElement) {
        e.preventDefault();
        FIRST_MENU_FOCUS_ELEMENT.focus();
      }
    }
  }
}

export { menu };
