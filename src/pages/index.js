import './index.css'; // добавьте импорт главного файла стилей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../components/initial-cards.js';
import Section from "../components/Section.js";
import Popup from '../components/Popup';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

// button
// const buttonClose = document.querySelector('#profileClose');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonAdd = document.querySelector('.profile__button-add');
// photo-grid
const photoContainerSelector = '.photo-grid';
const photoContainer = document.querySelector(photoContainerSelector);
// popup
const popupProfileSelector = '.popup_type_profile';
const popupProfile = document.querySelector(popupProfileSelector);
const popupPhotoSelector = '.popup_type_photo';
const popupPhoto = document.querySelector(popupPhotoSelector);
const photoClose = document.querySelector('#popupPhotoClose');
// form profile
const formSelector = '.form';
const form = document.querySelector(formSelector);
const nameInput = document.querySelector('.form__input_type_name');
const descriptionInput = document.querySelector('.form__input_type_description');
const profileNameSelector = '.profile__name';
const profileDescriptionSelector = '.profile__description';
// photo
// const formPhoto = document.querySelector('.form_type_photo');
// const photoTitleInput = document.querySelector('.form__input_type_title');
// const photoLinkInput = document.querySelector('.form__input_type_src');
// //modal
const modalSrc = document.querySelector('.popup__pic');
const modalTitle = document.querySelector('.popup__pic-caption');
const modalImage = document.querySelector('.popup_type_modal');
const popupImageSelector = '.popup_type_modal';

// const popupModal = { src: modalSrc, title: modalTitle, value: modalImage };
// const modalPhotoClose = document.querySelector('#modalClose');

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_error',
  errorSelector: '.form__input-error-message',
  errorActiveClass: 'form__input-error-message_active',
};

const popupEdit = new PopupWithForm(popupProfileSelector, handleFormSubmit);
popupEdit.setEventListeners();
const popupAdd = new PopupWithForm(popupPhotoSelector, handlePhotoFormSubmit);
popupAdd.setEventListeners();
const popupImage = new PopupWithImage(popupImageSelector);
const userInfo = new UserInfo(profileNameSelector, profileDescriptionSelector);

//создаем экземпляр класса Card
function createCard(item) {
  const card = new Card(item, '#photo-grid-template', popupImage.open);
  return card.generateCard();
}
const obj = { initialCards, createCard };
const section = new Section(obj, photoContainerSelector );
section.addItems();

function handlePhotoFormSubmit(inputValues) {
  console.log(inputValues)
  const data = { name: inputValues.photo_title, link: inputValues.photo_link };
  const newCard = createCard(data);
  photoContainer.prepend(newCard);
}

function handleFormSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.profile_name, inputValues.profile_title)
}

function editProfile() {
  const user = userInfo.getUserInfo();
  nameInput.value = user.userName;
  descriptionInput.value = user.userInfo;
  popupEdit.open()
}

// // переношу в Popup
// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', handlePressEsc);
//   popup.addEventListener('mousedown', handleClickOverlay);
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', handlePressEsc);
//   popup.removeEventListener('mousedown', handleClickOverlay);
// }

// function handlePressEsc(evt) {
//   if (evt.key === 'Escape') {
//     const activePopup = document.querySelector('.popup_opened');
//     if (activePopup) {
//       closePopup(activePopup)
//     };
//   }
// }

// function handleClickOverlay(evt) {
//   if (evt.target === evt.currentTarget) {
//     closePopup(evt.target)
//   };
// }

// form.addEventListener('submit', handleFormSubmit);
buttonEdit.addEventListener('click', editProfile);
buttonAdd.addEventListener('click', () => popupAdd.open());
// buttonClose.addEventListener('click', () => { closePopup(popupProfile); });

//создаем экземпляр класса FormValidator
const isInitialValid = true;
const validateProfile = new FormValidator(validationSettings, popupProfile, buttonEdit, isInitialValid);
const validatePhoto = new FormValidator(validationSettings, popupPhoto, buttonAdd);
validateProfile.enableValidation();
validatePhoto.enableValidation();

// formPhoto.addEventListener('submit', handlePhotoFormSubmit);
// photoClose.addEventListener('click', () => { closePopup(popupPhoto); });
// modalPhotoClose.addEventListener('click', () => { closePopup(modalImage); });

// export { openPopup, popupModal };
