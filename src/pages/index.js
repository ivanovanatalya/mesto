import './index.css'; // добавьте импорт главного файла стилей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import initialCards from '../common/initial-cards.js';
import Api from '../common/api.js';
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

import {
  buttonEdit,
  buttonAdd,
  photoContainerSelector,
  popupProfileSelector,
  popupProfile,
  popupPhotoSelector,
  popupPhoto,
  nameInput,
  descriptionInput,
  profileNameSelector,
  profileDescriptionSelector,
  popupImageSelector,
  popupConfirmSelector,
} from "../common/constants";

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_error',
  errorSelector: '.form__input-error-message',
  errorActiveClass: 'form__input-error-message_active',
};
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: 'our-token',
    'Content-Type': 'application/json'
  }
});


const popupEdit = new PopupWithForm(popupProfileSelector, handleFormSubmit);
popupEdit.setEventListeners();
const popupAdd = new PopupWithForm(popupPhotoSelector, handlePhotoFormSubmit);
popupAdd.setEventListeners();
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();
const popupConfirm = new PopupWithForm(popupConfirmSelector, handleCardDelete);
popupConfirm.setEventListeners();
const userInfo = new UserInfo(profileNameSelector, profileDescriptionSelector);

api.getCurrentUser()
  .then((res) => {
    console.log(result)
    userInfo.setUserInfo(res.name, res.about)
    // res.avatar
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

//создаем экземпляр класса Card
function createCard(item) {
  // const card = api.addCard(item.name, item.link)
  // .then(res => {
  //   const cardData = { name: res.name, link: res.link }
  //   return new Card(cardData, '#photo-grid-template', popupImage.open.bind(popupImage));
  // })
  // .catch((err) => {
  //   console.log(err); // выведем ошибку в консоль
  // });
  const card = new Card(item, '#photo-grid-template',
    popupImage.open.bind(popupImage),
    popupConfirm.open.bind(popupConfirm),
  );
  card.addEventListener
  return card.generateCard();
}

const items = api.getInitialCards()
  .then((result) => result)
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

// const section = new Section({ items, renderer: createCard }, photoContainerSelector);
const section = new Section({ items: initialCards, renderer: createCard }, photoContainerSelector);
section.addItems();

function handlePhotoFormSubmit(inputValues) {
  const data = { name: inputValues.photo_title, link: inputValues.photo_link };
  const newCard = createCard(data);
  section.addItem(newCard);
}

function handleFormSubmit(inputValues) {
  userInfo.setUserInfo(inputValues.profile_name, inputValues.profile_title)
  api.editProfile(inputValues.profile_name, inputValues.profile_title)
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

function handleCardDelete(card, cardID) {
  api.deleteCard(cardID)
    .then(() => {
      card.remove();
      card = null;
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
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
