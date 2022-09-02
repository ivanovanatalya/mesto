class FormValidator {
  constructor(validationSettings, formElement, buttonOpenForm, isInitialValid = false) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
    this._buttonOpenForm = buttonOpenForm;
    this._isInitialValid = isInitialValid;
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some(input => !input.validity.valid)
  };

  _toggleButtonState = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this._validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(this._validationSettings.submitButtonSelector);
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
    }
  };

  _checkInputs = (form) => {
    const inputList = Array.from(form.querySelectorAll(this._validationSettings.inputSelector));
    inputList.forEach((inputElement) => {
      this._isValid(form, inputElement);
    });
  }

  _disableButton = (buttonElement) => {
    buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
    buttonElement.disabled = true;
  }

  _enableButton = (buttonElement) => {
    buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
    buttonElement.disabled = false;
  }

  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this._validationSettings.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.setCustomValidity('');
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(formElement);
        this._isValid(formElement, inputElement);
      });
    });

    this._buttonOpenForm.addEventListener('click', () => {
      if (this._isInitialValid) {
        this._checkInputs(formElement);
      };
      this._toggleButtonState(formElement);
    });

  }

  _isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(this._formElement));
    formList.forEach((element) => {
      this._setEventListeners(element);
    });
  };

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id} + ${this._validationSettings.errorSelector}`);
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationSettings.errorActiveClass);
  };

  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id} + ${this._validationSettings.errorSelector}`);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.classList.remove(this._validationSettings.errorActiveClass);
    errorElement.textContent = '';
  };

}

export default FormValidator;
