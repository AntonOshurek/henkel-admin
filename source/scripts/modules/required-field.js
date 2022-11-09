const requiredField = () => {
  const requiredInputs = document.getElementsByTagName('input');
  const submitButton = document.querySelector('.info-controls__submit-button');
  const notification = document.querySelector('.notification');

  let errorsArray = [];

  notification.querySelector('.notification__close-button').addEventListener('click', (evt) => {
    evt.preventDefault();

    notification.classList.remove('notification--show-error');
    notification.classList.remove('notification--show-success');
  });

  for (let i = 0; i < requiredInputs.length; i++) {

    if(requiredInputs[i].getAttribute('required') !== null) {
      requiredInputs[i].addEventListener('input', validateValue)
    }
  }

  submitButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    if(errorsArray.length > 0) {
      submitButton.classList.add('info-controls__submit-button--error');
      notification.classList.remove('notification--show-success');
      notification.classList.add('notification--show-error');
      notification.querySelector('.notification__info').textContent = errorsArray.toString();
      notification.querySelector('.notification__title').textContent = 'Обязательные поля не были заполнены!';

      setTimeout(() => {
        submitButton.classList.remove('info-controls__submit-button--error');
      }, 1000);
    } else {
      notification.classList.remove('notification--show-error');
      notification.classList.add('notification--show-success');
      notification.querySelector('.notification__title').textContent = 'Документ был сохранён успешно.';
    }
  })

  function validateValue(evt) {
    const requireFieldName = evt.target.parentElement.querySelector('.edit-field__field-name').innerText;
    if(evt.target.value === '') {

      if(!errorsArray.includes(requireFieldName)) {
        errorsArray.push(requireFieldName);
      }

      this.parentElement.classList.add('edit-field--required');
    } else {

      if(errorsArray.indexOf(requireFieldName) !== -1) {
        errorsArray.splice(errorsArray.indexOf(requireFieldName), 1)
      }
      this.parentElement.classList.remove('edit-field--required')
    }

    console.log(errorsArray);
  }
}

export default requiredField;
