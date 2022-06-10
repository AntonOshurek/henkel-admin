import { KEYCODE_TAB, NAVIGATION_STATUS } from '../utils/constants'
import {
  bodyElement, headerElement,
  navigationElement, menuButtonElement,
  navigationLinksArray
} from '../utils/node-elements';

const FIRST_MENU_FOCUS_ELEMENT = navigationLinksArray[0];
const LAST_MENU_FOCUS_ELEMENT = navigationLinksArray[navigationLinksArray.length - 1];

const screenWidth = window.screen.width;

let currentNavigationStatus = null;
let lastFocusInPage = null;
navigationLinksArray.forEach((link) => link.setAttribute('tabindex', '-1'));

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    lastFocusInPage.focus();
    closeNavigation();
  }
};

function openNavigation() {
  navigationElement.classList.add('navigation--open');
  headerElement.classList.add('header--open-menu');
  navigationLinksArray.forEach((link) => link.removeAttribute('tabindex'));
  navigationLinksArray[0].focus();

  screenWidth < 900 ? bodyElement.classList.add('body--scrolloff') : null;

  document.addEventListener('keydown', onEscKeydown);
  bodyElement.addEventListener('keydown', menuFocus);

  currentNavigationStatus = NAVIGATION_STATUS.OPEN;
};

function closeNavigation() {
  navigationElement.classList.remove('navigation--open');
  headerElement.classList.remove('header--open-menu');
  navigationLinksArray.forEach((link) => link.setAttribute('tabindex', '-1'));

  screenWidth < 900 ? bodyElement.classList.remove('body--scrolloff') : null;

  document.removeEventListener('keydown', onEscKeydown);
  bodyElement.removeEventListener('keydown', menuFocus);

  currentNavigationStatus = NAVIGATION_STATUS.CLOSE;
}

const menu = () => {
  menuButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    if(currentNavigationStatus === NAVIGATION_STATUS.OPEN) {
      lastFocusInPage = null
      closeNavigation()
    } else {
      lastFocusInPage = document.activeElement
      openNavigation()
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
