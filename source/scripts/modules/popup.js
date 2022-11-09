export default function popup() {
  const infoControls = document.querySelector('.info-controls');
  const popup = document.querySelector('.modal');
  const closePopupButton = document.querySelector('.modal__close-button');

  const body = document.querySelector('.body');

  infoControls.addEventListener('click', (evt) => {
    if (evt.target.tagName === 'BUTTON') {
      const controlName = evt.target.getAttribute('data-control');

      if(controlName === 'open-modal') {
        popup.classList.remove('out');
        popup.classList.add('open');
        body.classList.add('body--open-modal')
        closePopupButton.addEventListener('click', closePopup);
      }
    }
  });

  function closePopup() {
    popup.classList.add('out');
    popup.classList.remove('open');
    body.classList.remove('body--open-modal');
    closePopupButton.addEventListener('click', closePopup);
  }
}
