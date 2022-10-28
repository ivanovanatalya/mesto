class FormValidator {
  constructor(validationSettings, formWrapper, buttonOpenForm, isInitialValid = false) {
    this._validationSettings = validationSettings;
    this._formWrapper = formWrapper;
    this._buttonOpenForm = buttonOpenForm;
    this._isInitialValid = isInitialValid;
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some(input => !input.validity.valid)
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput(this._inputList)) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  };

  _checkInputs = (form) => {
    this._inputList.forEach((inputElement) => {
      this._isValid(form, inputElement);
    });
  }

  _disableButton = () => {
    this._submitButton.classList.add(this._validationSettings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton = () => {
    this._submitButton.classList.remove(this._validationSettings.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListeners = (formElement) => {
    this._inputList = Array.from(formElement.querySelectorAll(this._validationSettings.inputSelector));

    this._submitButton = formElement.querySelector(this._validationSettings.submitButtonSelector);

    this._inputList.forEach((inputElement) => {
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
    const form = this._formWrapper.querySelector(this._validationSettings.formSelector);
    this._setEventListeners(form);
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
