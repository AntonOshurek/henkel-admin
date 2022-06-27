/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/scripts/modules/clock.js":
/*!*****************************************!*\
  !*** ./source/scripts/modules/clock.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ initClock; }
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./source/scripts/utils/utils.js");
/* harmony import */ var _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/node-elements */ "./source/scripts/utils/node-elements.js");


function initClock() {
  const timeInterval = setInterval(updateClock, 1000);
  updateClock(); // for first launch
}
;

function getTime() {
  const t = new Date();
  const year = t.getFullYear();
  const mounth = t.getMonth() + 1;
  const days = t.getDate();
  const hours = t.getHours();
  const minutes = t.getMinutes();
  const seconds = t.getSeconds();
  return {
    'year': year,
    'mounth': (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.getZero)(mounth),
    'days': (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.getZero)(days),
    'hours': (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.getZero)(hours),
    'minutes': (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.getZero)(minutes),
    'seconds': (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.getZero)(seconds)
  };
}

;

function updateClock() {
  const t = getTime();
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.dateBlock.textContent = `${t.year}-${t.mounth}-${t.days}`;
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.hourseBlock.textContent = `${t.hours}`;
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.minutesBlock.textContent = `${t.minutes}`;
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.secondsBlock.textContent = `${t.seconds}`;
}

;

/***/ }),

/***/ "./source/scripts/modules/menu.js":
/*!****************************************!*\
  !*** ./source/scripts/modules/menu.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menuInit": function() { return /* binding */ menuInit; }
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./source/scripts/utils/constants.js");
/* harmony import */ var _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/node-elements */ "./source/scripts/utils/node-elements.js");


const FIRST_MENU_FOCUS_ELEMENT = _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray[0];
const LAST_MENU_FOCUS_ELEMENT = _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray[_utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray.length - 1];
const screenWidth = window.screen.width;
let currentNavigationStatus = null;
let lastFocusInPage = null;

const menuInit = () => {
  currentNavigationStatus = _utils_constants__WEBPACK_IMPORTED_MODULE_0__.NAVIGATION_STATUS.CLOSE; // when we have js we can added tabindex -1 for all links in hidden menu for block focus in hidden elements

  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray.forEach(link => link.setAttribute('tabindex', '-1'));
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.menuButtonElement.addEventListener('click', evt => {
    evt.preventDefault();
    menuLogick();
  });
};

function menuLogick() {
  if (currentNavigationStatus === _utils_constants__WEBPACK_IMPORTED_MODULE_0__.NAVIGATION_STATUS.OPEN) {
    closeNavigation();
  } else {
    openNavigation();
  }
}

function openNavigation() {
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationElement.classList.add('navigation--open');
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.headerElement.classList.add('header--open-menu');
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray.forEach(link => link.setAttribute('tabindex', '0'));
  lastFocusInPage = document.activeElement;
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray[0].focus();
  screenWidth < 900 ? _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.bodyElement.classList.add('body--scrolloff') : null;
  document.addEventListener('keydown', onEscKeydown);
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.bodyElement.addEventListener('keydown', menuFocus);
  currentNavigationStatus = _utils_constants__WEBPACK_IMPORTED_MODULE_0__.NAVIGATION_STATUS.OPEN;
}

;

function closeNavigation() {
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationElement.classList.remove('navigation--open');
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.headerElement.classList.remove('header--open-menu');
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray.forEach(link => link.setAttribute('tabindex', '-1'));
  screenWidth < 900 ? _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.bodyElement.classList.remove('body--scrolloff') : null;
  document.removeEventListener('keydown', onEscKeydown);
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.bodyElement.removeEventListener('keydown', menuFocus);
  lastFocusInPage.focus();
  currentNavigationStatus = _utils_constants__WEBPACK_IMPORTED_MODULE_0__.NAVIGATION_STATUS.CLOSE;
}

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    menuLogick();
  }
} // focus control when the menu is open


function menuFocus(e) {
  if (e.key === 'Tab' || e.keyCode === _utils_constants__WEBPACK_IMPORTED_MODULE_0__.KEYCODE_TAB) {
    if (e.shiftKey)
      /* shift + tab */
      {
        if (document.activeElement === FIRST_MENU_FOCUS_ELEMENT) {
          e.preventDefault();
          _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.menuButtonElement.focus();
        } else if (document.activeElement === _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.menuButtonElement) {
          e.preventDefault();
          LAST_MENU_FOCUS_ELEMENT.focus();
        }
      } else
      /*tab*/
      {
        if (document.activeElement === LAST_MENU_FOCUS_ELEMENT) {
          e.preventDefault();
          _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.menuButtonElement.focus();
        } else if (document.activeElement === _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.menuButtonElement) {
          e.preventDefault();
          FIRST_MENU_FOCUS_ELEMENT.focus();
        }
      }
  }
} // swips


let touchStart = null; //Точка начала касания

let touchPosition = null; //Текущая позиция
//Чувствительность — количество пикселей, после которого жест будет считаться свайпом

const sensitivity = 100;
const leftSideMaxarea = 40; // зона в 40px от левого края - там где будут считаться свайпы для открытия

_utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.bodyElement.addEventListener("touchstart", function (e) {
  TouchStart(e);
}); //Начало касания

_utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.bodyElement.addEventListener("touchmove", function (e) {
  TouchMove(e);
}); //Движение пальцем по экрану
//Пользователь отпустил экран

_utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.bodyElement.addEventListener("touchend", function (e) {
  TouchEnd(e);
}); //Отмена касания

_utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.bodyElement.addEventListener("touchcancel", function (e) {
  TouchEnd(e);
});

function TouchStart(e) {
  //Получаем текущую позицию касания
  touchStart = {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY
  };
  touchPosition = {
    x: touchStart.x,
    y: touchStart.y
  };
}

function TouchMove(e) {
  //Получаем новую позицию
  touchPosition = {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY
  };
}

function TouchEnd(e) {
  CheckAction(); //Определяем, какой жест совершил пользователь
  //Очищаем позиции

  touchStart = null;
  touchPosition = null;
}

function CheckAction() {
  let d = //Получаем расстояния от начальной до конечной точек по обеим осям
  {
    x: touchStart.x - touchPosition.x,
    y: touchStart.y - touchPosition.y
  };

  if (Math.abs(d.x) > sensitivity) {
    //Проверяем, было ли движение достаточно длинным
    if (d.x > 0) {
      //Если значение больше нуля, значит пользователь двигал пальцем справа налево
      currentNavigationStatus === _utils_constants__WEBPACK_IMPORTED_MODULE_0__.NAVIGATION_STATUS.OPEN ? closeNavigation() : null;
    } else {
      //Иначе он двигал им слева направо
      if (touchStart.x < leftSideMaxarea) {
        currentNavigationStatus === _utils_constants__WEBPACK_IMPORTED_MODULE_0__.NAVIGATION_STATUS.CLOSE ? openNavigation() : null;
      }
    }
  }
}



/***/ }),

/***/ "./source/scripts/modules/popup.js":
/*!*****************************************!*\
  !*** ./source/scripts/modules/popup.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ popup; }
/* harmony export */ });
function popup() {
  const infoControls = document.querySelector('.info-controls');
  const popup = document.querySelector('.popup');
  const closePopupButton = document.querySelector('.popup__close-button');
  infoControls.addEventListener('click', evt => {
    if (evt.target.tagName === 'BUTTON') {
      const controlName = evt.target.getAttribute('data-control');

      if (controlName === 'add-asort') {
        popup.classList.add('popup--open');
        closePopupButton.addEventListener('click', closePopup);
      }
    }
  });

  function closePopup() {
    popup.classList.remove('popup--open');
    closePopupButton.addEventListener('click', closePopup);
  }
}

/***/ }),

/***/ "./source/scripts/modules/tcheme-control.js":
/*!**************************************************!*\
  !*** ./source/scripts/modules/tcheme-control.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tchemeControl": function() { return /* binding */ tchemeControl; }
/* harmony export */ });
const tchemeControl = () => {
  const lightStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=light]');
  const darkStyles = document.querySelectorAll('link[rel=stylesheet][media*=prefers-color-scheme][media*=dark]');
  const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');
  const fieldset = document.querySelector('.theme-switcher');

  function setupSwitcher() {
    const savedScheme = getSavedScheme();

    if (savedScheme !== null) {
      const currentRadio = document.querySelector(`.theme-switcher__radio[value=${savedScheme}]`);
      currentRadio.checked = true;
    }

    fieldset.addEventListener('change', evt => {
      setScheme(evt.target.value);
    });
  }

  function setupScheme() {
    const savedScheme = getSavedScheme();
    const systemScheme = getSystemScheme();
    if (savedScheme === null) return;

    if (savedScheme !== systemScheme) {
      setScheme(savedScheme);
    }
  }

  function setScheme(scheme) {
    switchMedia(scheme);

    if (scheme === 'auto') {
      clearScheme();
    } else {
      saveScheme(scheme);
    }
  }

  function switchMedia(scheme) {
    let lightMedia;
    let darkMedia;

    if (scheme === 'auto') {
      lightMedia = '(prefers-color-scheme: light)';
      darkMedia = '(prefers-color-scheme: dark)';
    } else {
      lightMedia = scheme === 'light' ? 'all' : 'not all';
      darkMedia = scheme === 'dark' ? 'all' : 'not all';
    }

    [...lightStyles].forEach(link => {
      link.media = lightMedia;
    });
    [...darkStyles].forEach(link => {
      link.media = darkMedia;
    });
  }

  function getSystemScheme() {
    const darkScheme = darkSchemeMedia.matches;
    return darkScheme ? 'dark' : 'light';
  }

  function getSavedScheme() {
    return localStorage.getItem('color-scheme');
  }

  function saveScheme(scheme) {
    localStorage.setItem('color-scheme', scheme);
  }

  function clearScheme() {
    localStorage.removeItem('color-scheme');
  }

  setupSwitcher();
  setupScheme();
};



/***/ }),

/***/ "./source/scripts/utils/constants.js":
/*!*******************************************!*\
  !*** ./source/scripts/utils/constants.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KEYCODE_TAB": function() { return /* binding */ KEYCODE_TAB; },
/* harmony export */   "NAVIGATION_STATUS": function() { return /* binding */ NAVIGATION_STATUS; }
/* harmony export */ });
const KEYCODE_TAB = 9;
const NAVIGATION_STATUS = {
  OPEN: 'open',
  CLOSE: 'close'
};

/***/ }),

/***/ "./source/scripts/utils/node-elements.js":
/*!***********************************************!*\
  !*** ./source/scripts/utils/node-elements.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bodyElement": function() { return /* binding */ bodyElement; },
/* harmony export */   "dateBlock": function() { return /* binding */ dateBlock; },
/* harmony export */   "headerElement": function() { return /* binding */ headerElement; },
/* harmony export */   "hourseBlock": function() { return /* binding */ hourseBlock; },
/* harmony export */   "menuButtonElement": function() { return /* binding */ menuButtonElement; },
/* harmony export */   "minutesBlock": function() { return /* binding */ minutesBlock; },
/* harmony export */   "navigationElement": function() { return /* binding */ navigationElement; },
/* harmony export */   "navigationLinksArray": function() { return /* binding */ navigationLinksArray; },
/* harmony export */   "secondsBlock": function() { return /* binding */ secondsBlock; }
/* harmony export */ });
const bodyElement = document.querySelector('.body');
const headerElement = document.querySelector('.header');
const navigationElement = document.querySelector('.navigation');
const menuButtonElement = document.querySelector('.header__menu-btn');
const navigationLinksArray = document.querySelectorAll('.navigation__link'); // clock block

const dateBlock = document.querySelector('.clock__date'); // for full date yyyy-mm-dd

const hourseBlock = document.querySelector('.clock__hourse');
const minutesBlock = document.querySelector('.clock__minutes');
const secondsBlock = document.querySelector('.clock__seconds');

/***/ }),

/***/ "./source/scripts/utils/utils.js":
/*!***************************************!*\
  !*** ./source/scripts/utils/utils.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getZero": function() { return /* binding */ getZero; }
/* harmony export */ });
function getZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!*********************************!*\
  !*** ./source/scripts/index.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tcheme_control__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tcheme-control */ "./source/scripts/modules/tcheme-control.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/menu */ "./source/scripts/modules/menu.js");
/* harmony import */ var _modules_clock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/clock */ "./source/scripts/modules/clock.js");
/* harmony import */ var _modules_popup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/popup */ "./source/scripts/modules/popup.js");




window.addEventListener('DOMContentLoaded', () => {
  (0,_modules_menu__WEBPACK_IMPORTED_MODULE_1__.menuInit)();
  (0,_modules_tcheme_control__WEBPACK_IMPORTED_MODULE_0__.tchemeControl)();

  if (document.location.pathname === '/index.html' || document.location.pathname === '/henkel-admin/index.html' || document.location.pathname === '/henkel-admin/' || document.location.pathname === '/') {
    (0,_modules_clock__WEBPACK_IMPORTED_MODULE_2__["default"])();
  }

  if (document.location.pathname === '/offer.html' || document.location.pathname === '/henkel-admin/offer.html') {
    (0,_modules_popup__WEBPACK_IMPORTED_MODULE_3__["default"])();
  }
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map