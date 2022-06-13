/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./source/scripts/modules/menu.js":
/*!****************************************!*\
  !*** ./source/scripts/modules/menu.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menu": function() { return /* binding */ menu; }
/* harmony export */ });
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/constants */ "./source/scripts/utils/constants.js");
/* harmony import */ var _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/node-elements */ "./source/scripts/utils/node-elements.js");


const FIRST_MENU_FOCUS_ELEMENT = _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray[0];
const LAST_MENU_FOCUS_ELEMENT = _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray[_utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray.length - 1];
const screenWidth = window.screen.width;
let currentNavigationStatus = _utils_constants__WEBPACK_IMPORTED_MODULE_0__.NAVIGATION_STATUS.CLOSE;
let lastFocusInPage = null;
_utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray.forEach(link => link.setAttribute('tabindex', '-1'));

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    menuLogick();
  }
}

function openNavigation() {
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationElement.classList.add('navigation--open');
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.headerElement.classList.add('header--open-menu');
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray.forEach(link => link.setAttribute('tabindex', '0'));
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
  currentNavigationStatus = _utils_constants__WEBPACK_IMPORTED_MODULE_0__.NAVIGATION_STATUS.CLOSE;
}

function menuLogick() {
  if (currentNavigationStatus === _utils_constants__WEBPACK_IMPORTED_MODULE_0__.NAVIGATION_STATUS.OPEN) {
    lastFocusInPage.focus();
    closeNavigation();
  } else {
    lastFocusInPage = document.activeElement;
    openNavigation();
  }
}

const menu = () => {
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.menuButtonElement.addEventListener('click', evt => {
    evt.preventDefault();
    menuLogick();
  });
};

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

const sensitivity = 200;
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

  if (Math.abs(d.x) > Math.abs(d.y)) {
    //Проверяем, движение по какой оси было длиннее
    if (Math.abs(d.x) > sensitivity) {
      //Проверяем, было ли движение достаточно длинным
      if (d.x > 0) {
        //Если значение больше нуля, значит пользователь двигал пальцем справа налево
        menuLogick();
      } else {
        //Иначе он двигал им слева направо
        console.log('right');
        menuLogick();
      }
    }
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
/* harmony export */   "headerElement": function() { return /* binding */ headerElement; },
/* harmony export */   "menuButtonElement": function() { return /* binding */ menuButtonElement; },
/* harmony export */   "navigationElement": function() { return /* binding */ navigationElement; },
/* harmony export */   "navigationLinksArray": function() { return /* binding */ navigationLinksArray; }
/* harmony export */ });
const bodyElement = document.querySelector('.body');
const headerElement = document.querySelector('.header');
const navigationElement = document.querySelector('.navigation');
const menuButtonElement = document.querySelector('.header__menu-btn');
const navigationLinksArray = document.querySelectorAll('.navigation__link');

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


(0,_modules_menu__WEBPACK_IMPORTED_MODULE_1__.menu)();
(0,_modules_tcheme_control__WEBPACK_IMPORTED_MODULE_0__.tchemeControl)();
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map