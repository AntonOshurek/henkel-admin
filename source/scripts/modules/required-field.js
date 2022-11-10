const requiredField = () => {
  const requiredInputs = document.getElementsByTagName('input');
  const submitButton = document.querySelector('.info-controls__submit-button');
  const notification = document.querySelector('.notification');

  const requiredFieldsNotificationText = 'Обязательные поля не были заполнены!';
  const saveDocumentSuccessText = 'Документ был сохранён успешно.';

  let errorsArray = [];

  for (let i = 0; i < requiredInputs.length; i++) {
    if(requiredInputs[i].getAttribute('required') !== null) {
      requiredInputs[i].addEventListener('input', validateValue);
    }
  }

  notification.querySelector('.notification__close-button').addEventListener('click', (evt) => {
    evt.preventDefault();
    onCloseNotificationButtonHandler();
  });

  submitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    if(errorsArray.length > 0) {
      submitError();
    } else {
      submitSuccess();
    }
  });

  function onCloseNotificationButtonHandler() {
    notification.classList.remove('notification--show-error');
    notification.classList.remove('notification--show-success');
  }

  function submitError() {
    submitButton.classList.add('info-controls__submit-button--error');
    notification.classList.remove('notification--show-success');
    notification.classList.add('notification--show-error');
    notification.querySelector('.notification__info').textContent = errorsArray.toString();
    notification.querySelector('.notification__title').textContent = requiredFieldsNotificationText;

    setTimeout(() => {
      submitButton.classList.remove('info-controls__submit-button--error');
    }, 1000);
  }

  function submitSuccess() {
    notification.classList.remove('notification--show-error');
    notification.classList.add('notification--show-success');
    notification.querySelector('.notification__title').textContent = saveDocumentSuccessText;
  }

  function validateValue(evt) {
    const requireFieldName = evt.target.parentElement.querySelector('.edit-field__field-name').innerText;
    if(evt.target.value === '') {
      if(!errorsArray.includes(requireFieldName)) {
        errorsArray.push(requireFieldName);
      }
      this.parentElement.classList.add('edit-field--required');
    } else {
      if(errorsArray.indexOf(requireFieldName) !== -1) {
        errorsArray.splice(errorsArray.indexOf(requireFieldName), 1);
      }
      this.parentElement.classList.remove('edit-field--required');
    }
  }
}

export default requiredField;
