import './index.css'; // добавьте импорт главного файла стилей
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../common/api.js';
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
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
  profileAvatarSelector,
  api_token,
  userAvatar,
  popupAvatarSelector,
  popupAvatarElement,
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
    authorization: api_token,
    'Content-Type': 'application/json'
  }
});

//создаем экземпляр класса Card
function createCard(item) {
  const card = new Card(item, userId, '#photo-grid-template',
    popupImage.open.bind(popupImage),
    popupConfirm.open.bind(popupConfirm),
    handleCardLikes,
  );
  return card.generateCard();
}

function handleChangeAvatar(inputValues) {
  popupAvatar.isLoading(true);
  api.editAvatar(inputValues.avatar_link)
  .then((res) => {
    userInfo.setUserAvatar(res.avatar);
    popupAvatar.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() => {
    popupAvatar.isLoading(false);
  });
}

function handleFormSubmit(inputValues) {
  popupEdit.isLoading(true);
  api.editProfile(
    inputValues.profile_name,
    inputValues.profile_title,
    )
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      popupEdit.isLoading(false);
    });
}

function handlePhotoFormSubmit(inputValues) {
  popupAdd.isLoading(true);
  api.addCard({ name: inputValues.photo_title, link: inputValues.photo_link })
  .then(res => {
    section.addItem(res);
    popupAdd.close();
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  })
  .finally(() => {
    popupAdd.isLoading(false);
  });
}

function handleCardLikes(data) {
  const { id, isLiked, setLike } = data;
  if (isLiked) {
    api.setCardLike(id)
    .then((res) => {
      setLike(res.likes.length);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });

  } else {
    api.deleteCardLike(id)
    .then((res) => {
      setLike(res.likes.length);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  }
}

function handleCardDelete(data) {
  const { id, removeCard } = data;
  api.deleteCard(id)
    .then(() => {
      removeCard();
      popupConfirm.close();
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

const popupEdit = new PopupWithForm(popupProfileSelector, handleFormSubmit);
popupEdit.setEventListeners();
const popupAdd = new PopupWithForm(popupPhotoSelector, handlePhotoFormSubmit);
popupAdd.setEventListeners();
const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();
const popupConfirm = new PopupWithConfirmation(popupConfirmSelector, handleCardDelete);
popupConfirm.setEventListeners();
const popupAvatar = new PopupWithForm(popupAvatarSelector, handleChangeAvatar);
popupAvatar.setEventListeners();
const userInfo = new UserInfo(profileNameSelector, profileDescriptionSelector, profileAvatarSelector);

let userId = '';
const userPromise = api.getCurrentUser()
  .then((res) => {
    userInfo.setUserAvatar(res.avatar);
    userInfo.setUserInfo(res.name, res.about);
    userId = res._id;
  })

let section = {};
const cardsPromise = api.getInitialCards()
  .then(res => {
    section = new Section({
      items: res,
      renderer: createCard },
      photoContainerSelector,
    );
    section.addItems();
  })
Promise.all([userPromise, cardsPromise])
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

buttonEdit.addEventListener('click', editProfile);
buttonAdd.addEventListener('click', () => popupAdd.open());
userAvatar.addEventListener('click', () => popupAvatar.open())

//создаем экземпляр класса FormValidator
const isInitialValid = true;
const validateProfile = new FormValidator(validationSettings, popupProfile, buttonEdit, isInitialValid);
const validatePhoto = new FormValidator(validationSettings, popupPhoto, buttonAdd);
const validateAvatar = new FormValidator(validationSettings, popupAvatarElement, userAvatar);
validateProfile.enableValidation();
validatePhoto.enableValidation();
validateAvatar.enableValidation();
