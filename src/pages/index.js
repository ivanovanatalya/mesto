import './index.css'; // добавьте импорт главного файла стилей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../components/initial-cards.js';
import Section from "../components/Section.js";
import Popup from '../components/Popup';
import PopupWithImage from '../components/PopupWhitImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

// button
const buttonClose = document.querySelector('#profileClose');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
// photo-grid
const photoContainer = document.querySelector('.photo-grid');
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
// //modal
const modalSrc = document.querySelector('.popup__pic');
const modalTitle = document.querySelector('.popup__pic-caption');
const modalImage = document.querySelector('.popup_type_modal');

const popupModal = { src: modalSrc, title: modalTitle, value: modalImage };
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

function handlePhotoFormSubmit(evt) {
  evt.preventDefault();
  const data = { name: photoTitleInput.value, link: photoLinkInput.value };
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

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

function editProfile() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openPopup(popupProfile);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePressEsc);
  popup.addEventListener('mousedown', handleClickOverlay);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePressEsc);
  popup.removeEventListener('mousedown', handleClickOverlay);
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
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  };
}

formSelector.addEventListener('submit', handleFormSubmit);
buttonClose.addEventListener('click', () => { closePopup(popupProfile); });
buttonEdit.addEventListener('click', editProfile);
buttonAdd.addEventListener('click', () => {
  openPopup(popupPhoto);
});

//создаем экземпляр класса FormValidator
const isInitialValid = true;
const validateProfile = new FormValidator(validationSettings, popupProfile, buttonEdit, isInitialValid);
const validatePhoto = new FormValidator(validationSettings, popupPhoto, buttonAdd);
validateProfile.enableValidation();
validatePhoto.enableValidation();

formPhoto.addEventListener('submit', handlePhotoFormSubmit);
photoClose.addEventListener('click', () => { closePopup(popupPhoto); });
modalPhotoClose.addEventListener('click', () => { closePopup(modalImage); });

export { openPopup, popupModal };
