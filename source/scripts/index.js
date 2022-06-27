import { tchemeControl } from './modules/tcheme-control';
import { menuInit } from './modules/menu';
import initClock from './modules/clock';
import popup from './modules/popup';



window.addEventListener('DOMContentLoaded', () => {
  menuInit();
  tchemeControl();

  if(document.location.pathname === '/index.html' || document.location.pathname === '/henkel-admin/index.html' || document.location.pathname === '/henkel-admin/' || document.location.pathname === '/') {
    initClock();
  }

  if(document.location.pathname === '/offer.html' || document.location.pathname === '/henkel-admin/offer.html') {
    popup();
  }
});
