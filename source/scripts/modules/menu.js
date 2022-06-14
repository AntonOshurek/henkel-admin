import { KEYCODE_TAB, NAVIGATION_STATUS } from '../utils/constants'
import {
  bodyElement, headerElement,
  navigationElement, menuButtonElement,
  navigationLinksArray
} from '../utils/node-elements';

const FIRST_MENU_FOCUS_ELEMENT = navigationLinksArray[0];
const LAST_MENU_FOCUS_ELEMENT = navigationLinksArray[navigationLinksArray.length - 1];

const screenWidth = window.screen.width;

let currentNavigationStatus = NAVIGATION_STATUS.CLOSE;
let lastFocusInPage = null;

navigationLinksArray.forEach((link) => link.setAttribute('tabindex', '-1'));

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    menuLogick();
  }
}

function openNavigation() {
  navigationElement.classList.add('navigation--open');
  headerElement.classList.add('header--open-menu');
  navigationLinksArray.forEach((link) => link.setAttribute('tabindex', '0'));
  lastFocusInPage = document.activeElement;
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

  lastFocusInPage.focus();
  currentNavigationStatus = NAVIGATION_STATUS.CLOSE;
}

function menuLogick() {
  if(currentNavigationStatus === NAVIGATION_STATUS.OPEN) {
    closeNavigation()
  } else {
    openNavigation()
  }
}

const menu = () => {
  menuButtonElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    menuLogick();
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

  // swips
  let touchStart = null; //Точка начала касания
  let touchPosition = null; //Текущая позиция
  //Чувствительность — количество пикселей, после которого жест будет считаться свайпом
  const sensitivity = 100;
  const leftSideMaxarea = 40; // зона в 40px от левого края - там где будут считаться свайпы для открытия

  bodyElement.addEventListener("touchstart", function (e) { TouchStart(e); }); //Начало касания
  bodyElement.addEventListener("touchmove", function (e) { TouchMove(e); }); //Движение пальцем по экрану
  //Пользователь отпустил экран
  bodyElement.addEventListener("touchend", function (e) { TouchEnd(e); });
  //Отмена касания
  bodyElement.addEventListener("touchcancel", function (e) { TouchEnd(e); });

  function TouchStart(e)  {
    //Получаем текущую позицию касания
    touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };
  }

  function TouchMove(e) {
    //Получаем новую позицию
    touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
  }

  function TouchEnd(e) {
    CheckAction(); //Определяем, какой жест совершил пользователь
    //Очищаем позиции
    touchStart = null;
    touchPosition = null;
  }

  function CheckAction()  {

    let d = //Получаем расстояния от начальной до конечной точек по обеим осям
    {
    x: touchStart.x - touchPosition.x,
    y: touchStart.y - touchPosition.y
    };

    if(Math.abs(d.x) > sensitivity) { //Проверяем, было ли движение достаточно длинным
      if(d.x > 0) { //Если значение больше нуля, значит пользователь двигал пальцем справа налево
        currentNavigationStatus === NAVIGATION_STATUS.OPEN ? closeNavigation() : null;
      }
      else { //Иначе он двигал им слева направо
        if(touchStart.x < leftSideMaxarea ) {
          currentNavigationStatus === NAVIGATION_STATUS.CLOSE ? openNavigation() : null;
        }
      }
    }

  }

export { menu };
