// Кнопки "Закрыть", "Редактировать" //
let closeButton = document.querySelector('.popup__close');
let editButton = document.querySelector('.profile__button-edit');
// Попап //
let popup = document.querySelector('.popup');
// Форма //
let formElement = document.querySelector('.form');
// поля формы //
let nameInput = document.querySelector('.form__input_name');
let descriptionInput = document.querySelector('.form__input_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  popupClose();
}

function popupOpen() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', popupClose);
editButton.addEventListener('click', popupOpen);