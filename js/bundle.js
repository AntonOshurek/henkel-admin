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
let currentNavigationStatus = null;
let lastFocusInPage = null;
_utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray.forEach(link => link.setAttribute('tabindex', '-1'));

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    lastFocusInPage.focus();
    closeNavigation();
  }
}

;

function openNavigation() {
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationElement.classList.add('open');
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.headerElement.classList.add('header--open-menu');
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray.forEach(link => link.removeAttribute('tabindex'));
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray[0].focus();
  document.addEventListener('keydown', onEscKeydown);
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.bodyElement.addEventListener('keydown', menuFocus);
  currentNavigationStatus = _utils_constants__WEBPACK_IMPORTED_MODULE_0__.NAVIGATION_STATUS.OPEN;
}

;

function closeNavigation() {
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationElement.classList.remove('open');
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.headerElement.classList.remove('header--open-menu');
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.navigationLinksArray.forEach(link => link.setAttribute('tabindex', '-1'));
  document.removeEventListener('keydown', onEscKeydown);
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.bodyElement.removeEventListener('keydown', menuFocus);
  currentNavigationStatus = _utils_constants__WEBPACK_IMPORTED_MODULE_0__.NAVIGATION_STATUS.CLOSE;
}

const menu = () => {
  _utils_node_elements__WEBPACK_IMPORTED_MODULE_1__.menuButtonElement.addEventListener('click', evt => {
    evt.preventDefault();

    if (currentNavigationStatus === _utils_constants__WEBPACK_IMPORTED_MODULE_0__.NAVIGATION_STATUS.OPEN) {
      lastFocusInPage = null;
      closeNavigation();
    } else {
      lastFocusInPage = document.activeElement;
      openNavigation();
    }
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
(0,_modules_tcheme_control__WEBPACK_IMPORTED_MODULE_0__.tchemeControl)(); // document.addEventListener('keydown', (evt) => {
//   console.log(document.activeElement)
// })
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map