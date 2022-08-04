const hasInvalidInput = (inputList) => {
  return inputList.some(input => !input.validity.valid)
};

const toggleButtonState = (inputList, buttonElement, params) => {
  console.log(buttonElement)
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.disabled=true;
  } else {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.disabled=false;
    console.log(buttonElement.classList)
  }
};

const setEventListeners = (formElement, params) => {
  const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
  const buttonElement = formElement.querySelector(params.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity('');
    inputElement.addEventListener('input', () => {
      toggleButtonState(inputList, buttonElement, params);
      isValid(formElement, inputElement, params);
    });
  });
}

const isValid = (formElement, inputElement, params) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, params);
  } else {
    hideInputError(formElement, inputElement, params);
  }
}

const enableValidation = (params) => {
  const formList = Array.from(document.querySelectorAll(params.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, params);
  });
};

const showInputError = (formElement, inputElement, errorMessage, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id} + ${params.errorSelector}`);
  inputElement.classList.add(params.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(params.errorActiveClass);
};

const hideInputError = (formElement, inputElement, params) => {
  const errorElement = formElement.querySelector(`#${inputElement.id} + ${params.errorSelector}`);
  inputElement.classList.remove(params.inputErrorClass);
  errorElement.classList.remove(params.errorActiveClass);
  errorElement.textContent = '';
};
