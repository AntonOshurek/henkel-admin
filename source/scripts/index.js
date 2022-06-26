import { tchemeControl } from './modules/tcheme-control';
import { menuInit } from './modules/menu';
import initClock from './modules/clock';



window.addEventListener('DOMContentLoaded', () => {
  menuInit();
  tchemeControl();

  if(document.location.pathname === '/index.html' || document.location.pathname === '/henkel-admin/index.html' || document.location.pathname === '/') {
    initClock();
  }
});
