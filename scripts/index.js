// Кнопки "Закрыть", "Редактировать" //
const closeButton = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__button-edit');
// Попап //
const popup = document.querySelector('.popup');
// Форма //
const formElement = document.querySelector('.form');
// поля формы //
const nameInput = document.querySelector('.form__input_type_name');
const descriptionInput = document.querySelector('.form__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

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
