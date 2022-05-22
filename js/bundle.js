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
};

const menu = () => {
  menuBtn.addEventListener('click', evt => {
    navStatus ? closeNav() : openNav();
  });
}; // const startPageWidthValue = window.innerWidth;
// console.log(startPageWidthValue);
// window.addEventListener('resize', () => {
//   var w = document.documentElement.clientWidth;
//   w >= 900 ? openNav() : closeNav();
//   console.log(w);
// });




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