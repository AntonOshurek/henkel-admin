import { tchemeControl } from './modules/tcheme-control';
import { menuInit } from './modules/menu';
import popup from './modules/popup';



window.addEventListener('DOMContentLoaded', () => {
  menuInit();
  tchemeControl();

  if(document.location.pathname === '/offer.html' || document.location.pathname === '/henkel-admin/offer.html') {
    popup();
  }
});
