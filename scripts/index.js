import Card from './Card.js';
import FormValidator from './FormValidator.js';

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
const modalSrc = popupModal.querySelector('.popup__pic');
const modalTitle = popupModal.querySelector('.popup__pic-caption');
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

//создаем экземпляр класса FormValidator
const validateProfile = new FormValidator(validationSettings, popupProfileSelector);
const validatePhoto = new FormValidator(validationSettings, popupPhotoSelector);
validateProfile.enableValidation();
validatePhoto.enableValidation();

//создаем экземпляр класса Card
function createCard(item) {
  const card = new Card(item, '#photo-grid-template');
  return card.generateCard();
}

//form add photo
function handlePhotoFormSubmit(evt) {
  evt.preventDefault();
  const data = {};
  data.name = photoTitleInput.value;
  data.link = photoLinkInput.value;
  // photoContainer.prepend(addPhoto(photoTitleInput.value, photoLinkInput.value));
  // photoTitleInput.value = '';
  // photoLinkInput.value = '';
  const newCard = createCard(data);
  photoContainer.prepend(newCard);
  closePopup(popupPhoto);
}
// add photo
function addPhoto(name, link) {
  function handleDeletePhoto(evt) {
    evt.target.closest('.photo-grid__item').remove();
  }

  function handleLike(evt) {
    evt.target.classList.toggle('photo-grid__like_active');
  }

  const newPhoto = photoTemplate.content.querySelector('.photo-grid__item').cloneNode(true);
  const photoSrc = newPhoto.querySelector('.photo-grid__pic');
  const photoTitle = newPhoto.querySelector('.photo-grid__title');
  const buttonDelete = newPhoto.querySelector('.photo-grid__delete');
  const buttonLike = newPhoto.querySelector('.photo-grid__like');

  photoTitle.textContent = name;
  photoSrc.alt = name;
  photoSrc.src = link;

  function handleModal() {
    openPopup(popupModal);
    modalTitle.textContent = name;
    modalSrc.alt = name;
    modalSrc.src = link;
  }

  buttonDelete.addEventListener('click', handleDeletePhoto);
  buttonLike.addEventListener('click', handleLike);
  photoSrc.addEventListener('click', handleModal);

  return newPhoto;
}

// initialCards.forEach(function (item) {
//   const newCard = createCard(item['name'], item['link']);
//   photoContainer.append(newCard);
// });

//add form profile
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfile);
}

function editProfile() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  checkInputs(popupProfile, validationSettings);
  toggleButtonState(popupProfile, validationSettings);
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
  toggleButtonState(popupPhoto, validationSettings);
  openPopup(popupPhoto);
});
formPhoto.addEventListener('submit', handlePhotoFormSubmit);
photoShow.addEventListener('click', addPhoto);
photoClose.addEventListener('click', () => { closePopup(popupPhoto); });
modalPhotoClose.addEventListener('click', () => { closePopup(popupModal); });
