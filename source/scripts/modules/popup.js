export default function popup() {
  const infoControls = document.querySelector('.info-controls');
  const popup = document.querySelector('.popup');
  const closePopupButton = document.querySelector('.popup__close-button');

  const body = document.querySelector('.body');

  infoControls.addEventListener('click', (evt) => {
    if (evt.target.tagName === 'BUTTON') {
      const controlName = evt.target.getAttribute('data-control');

      if(controlName === 'add-asort') {
        popup.classList.remove('out');
        popup.classList.add('open');
        body.classList.add('body--open-popup')
        closePopupButton.addEventListener('click', closePopup);
      }
    }
  });

  function closePopup() {
    popup.classList.add('out');
    popup.classList.remove('open');
    body.classList.remove('body--open-popup');
    closePopupButton.addEventListener('click', closePopup);
  }
}
