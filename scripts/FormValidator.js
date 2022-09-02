class FormValidator {
  constructor(validationSettings, formElement, buttonOpenForm) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
    this._buttonOpenForm = buttonOpenForm;
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some(input => !input.validity.valid)
  };

  _toggleButtonState = (formElement, params) => {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    const buttonElement = formElement.querySelector(params.submitButtonSelector);
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement, params);
    } else {
     this._enableButton(buttonElement, params);
    }
  };

  _checkInputs = (form, params) => {
    const inputList = Array.from(form.querySelectorAll(params.inputSelector));
    inputList.forEach((inputElement) => {
        this._isValid(form, inputElement, params);
      });
  }

  _disableButton = (buttonElement, params) => {
    buttonElement.classList.add(params.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  _enableButton = (buttonElement, params) => {
    buttonElement.classList.remove(params.inactiveButtonClass);
    buttonElement.disabled = false;
  }

  _setEventListeners = (formElement, params) => {
    const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.setCustomValidity('');
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(formElement, params);
        this._isValid(formElement, inputElement, params);
      });
    });

    this._buttonOpenForm.addEventListener('click', () => {
      this._checkInputs(formElement, params);
      this._toggleButtonState(formElement, params);
    });

  }

  _isValid = (formElement, inputElement, params) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, params);
    } else {
      this._hideInputError(formElement, inputElement, params);
    }
  }

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._formElement));
    formList.forEach((element) => {
      this._setEventListeners(element, this._validationSettings);
    });
  };

  _showInputError = (formElement, inputElement, errorMessage, params) => {
    const errorElement = formElement.querySelector(`#${inputElement.id} + ${params.errorSelector}`);
    inputElement.classList.add(params.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(params.errorActiveClass);
  };

  _hideInputError = (formElement, inputElement, params) => {
    const errorElement = formElement.querySelector(`#${inputElement.id} + ${params.errorSelector}`);
    inputElement.classList.remove(params.inputErrorClass);
    errorElement.classList.remove(params.errorActiveClass);
    errorElement.textContent = '';
  };

}

export default FormValidator;
