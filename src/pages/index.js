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

// //modal
const modalSrc = document.querySelector('.popup__pic');
const modalTitle = document.querySelector('.popup__pic-caption');
const modalImage = document.querySelector('.popup_type_modal');
const popupImageSelector = '.popup_type_modal';

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
popupImage.setEventListeners()
const userInfo = new UserInfo(profileNameSelector, profileDescriptionSelector);

//создаем экземпляр класса Card
function createCard(item) {
  const card = new Card(item, '#photo-grid-template', popupImage.open.bind(popupImage));
  return card.generateCard();
}
const obj = { initialCards, createCard };
const section = new Section({ items: initialCards, renderer: createCard }, photoContainerSelector);
section.addItems();

function handlePhotoFormSubmit(inputValues) {
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

buttonEdit.addEventListener('click', editProfile);
buttonAdd.addEventListener('click', () => popupAdd.open());

//создаем экземпляр класса FormValidator
const isInitialValid = true;
const validateProfile = new FormValidator(validationSettings, popupProfile, buttonEdit, isInitialValid);
const validatePhoto = new FormValidator(validationSettings, popupPhoto, buttonAdd);
validateProfile.enableValidation();
validatePhoto.enableValidation();
