import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initial-cards.js';

// button
const buttonClose = document.querySelector('#profileClose');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
// photo-grid
const photoContainer = document.querySelector('.photo-grid');
const photoTemplate = document.querySelector('#photo-grid-template');
// popup
const popupProfileSelector = '.popup_type_profile';
const popupProfile = document.querySelector(popupProfileSelector);
const popupPhotoSelector = '.popup_type_photo';
const popupPhoto = document.querySelector(popupPhotoSelector);
const photoClose = document.querySelector('#popupPhotoClose');
// form profile
const formSelector = document.querySelector('.form');
const nameInput = document.querySelector('.form__input_type_name');
const descriptionInput = document.querySelector('.form__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
// photo
const formPhoto = document.querySelector('.form_type_photo');
const photoTitleInput = document.querySelector('.form__input_type_title');
const photoLinkInput = document.querySelector('.form__input_type_src');
const photoShow = document.querySelector('#createPhoto');
// //modal
const popupModal = document.querySelector('.popup_type_modal');
const modalPhotoClose = document.querySelector('#modalClose');

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_error',
  errorSelector: '.form__input-error-message',
  errorActiveClass: 'form__input-error-message_active',
};

//создаем экземпляр класса Card
function createCard(item) {
  const card = new Card(item, '#photo-grid-template');
  return card.generateCard();
}

//form add photo
function handlePhotoFormSubmit(evt) {
  evt.preventDefault();
  const data = {name:photoTitleInput.value, link:photoLinkInput.value};
  const newCard = createCard(data);
  photoContainer.prepend(newCard);
  photoTitleInput.value = '';
  photoLinkInput.value = '';
  closePopup(popupPhoto);

}

initialCards.forEach(function (item) {
  const newCard = createCard(item);
  photoContainer.append(newCard);
});

//add form profile
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

function checkInputs (form, params) {
  const inputList = Array.from(form.querySelectorAll(params.inputSelector));
  inputList.forEach((inputElement) => {
      // this._isValid(form, inputElement, params);
    });
}

function editProfile() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfile);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePressEsc);
  document.addEventListener('mousedown', handleClickOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePressEsc);
  document.removeEventListener('mousedown', handleClickOverlay);
}

function handlePressEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    if (activePopup) {
      closePopup(activePopup)
    };
  }
}

function handleClickOverlay(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (activePopup && evt.target === activePopup) {
    closePopup(activePopup);
  }
}

//event listeners
formSelector.addEventListener('submit', handleFormSubmit);
buttonClose.addEventListener('click', () => { closePopup(popupProfile); });
buttonEdit.addEventListener('click', editProfile);
buttonAdd.addEventListener('click', () => {
  openPopup(popupPhoto);
});

//создаем экземпляр класса FormValidator
const validateProfile = new FormValidator(validationSettings, popupProfileSelector, buttonEdit);
const validatePhoto = new FormValidator(validationSettings, popupPhotoSelector, buttonAdd);
validateProfile.enableValidation();
validatePhoto.enableValidation();

formPhoto.addEventListener('submit', handlePhotoFormSubmit);
photoClose.addEventListener('click', () => { closePopup(popupPhoto); });
modalPhotoClose.addEventListener('click', () => { closePopup(popupModal); });

export { openPopup, closePopup};
