// const hasInvalidInput = (inputList) => {
//   return inputList.some(input => !input.validity.valid)
// };

// const toggleButtonState = (formElement, params) => {
//   const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
//   const buttonElement = formElement.querySelector(params.submitButtonSelector);
//   if (hasInvalidInput(inputList)) {
//     disableButton(buttonElement, params);
//   } else {
//     enableButton(buttonElement, params);
//   }
// };

// const checkInputs = (form, params) => {
//   const inputList = Array.from(form.querySelectorAll(params.inputSelector));
//   inputList.forEach((inputElement) => {
//       isValid(form, inputElement, params);
//     });
// }

// const disableButton = (buttonElement, params) => {
//   buttonElement.classList.add(params.inactiveButtonClass);
//   buttonElement.disabled = true;
// }

// const enableButton = (buttonElement, params) => {
//   buttonElement.classList.remove(params.inactiveButtonClass);
//   buttonElement.disabled = false;
// }

// const setEventListeners = (formElement, params) => {
//   const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
//   inputList.forEach((inputElement) => {
//     inputElement.setCustomValidity('');
//     inputElement.addEventListener('input', () => {
//       toggleButtonState(formElement, params);
//       isValid(formElement, inputElement, params);
//     });
//   });
// }

// const isValid = (formElement, inputElement, params) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, params);
//   } else {
//     hideInputError(formElement, inputElement, params);
//   }
// }

// const enableValidation = (params) => {
//   const formList = Array.from(document.querySelectorAll(params.formSelector));
//   formList.forEach((formElement) => {
//     setEventListeners(formElement, params);
//   });
// };

// const showInputError = (formElement, inputElement, errorMessage, params) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id} + ${params.errorSelector}`);
//   inputElement.classList.add(params.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(params.errorActiveClass);
// };

// const hideInputError = (formElement, inputElement, params) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id} + ${params.errorSelector}`);
//   inputElement.classList.remove(params.inputErrorClass);
//   errorElement.classList.remove(params.errorActiveClass);
//   errorElement.textContent = '';
// };
