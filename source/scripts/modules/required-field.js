const requiredField = () => {
  const requiredInputs = document.getElementsByTagName('input');
  // console.log(requiredInputs);

  for (let i = 0; i < requiredInputs.length; i++) {

    if(requiredInputs[i].getAttribute('required') !== null) {
      console.log(requiredInputs[i])
      // console.log(requiredInputs[i].parentElement)
      requiredInputs[i].addEventListener('input', validateValue)
    }
  }
}

function validateValue(evt) {
  if(evt.target.value === '') {
    console.log('required!')

    this.parentElement.classList.add('edit-field--required');
  } else {
    this.parentElement.classList.remove('edit-field--required')
  }
}

export default requiredField;
