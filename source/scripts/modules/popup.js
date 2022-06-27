export default function popup() {
  const infoControls = document.querySelector('.info-controls');
  const popup = document.querySelector('.popup');
  const closePopupButton = document.querySelector('.popup__close-button');

  infoControls.addEventListener('click', (evt) => {
    if (evt.target.tagName === 'BUTTON') {
      const controlName = evt.target.getAttribute('data-control');

      if(controlName === 'add-asort') {
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
