// Кнопки "Закрыть", "Редактировать" //
const closeButton = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__button-edit');
// photo-grid
const photoContainer = document.querySelector('.photo-grid');
const photoTemplate = document.querySelector('#photo-grid-template');
// popup
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPhoto = document.querySelector('.popup_type_photo');
const closeProfileButton = popupProfile.querySelector('.popup__close');

// form
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__input_type_name');
const descriptionInput = document.querySelector('.form__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// photo
const formPhoto = document.querySelector('.form_type_photo');
const photoTitleInput = document.querySelector('.form__input_type_title');
const photoLinkInput = document.querySelector('.form__input_type_src');

const popupModal = document.querySelector('.popup_type_modal');
const modalClose = popupModal.querySelector('.popup__close');
const modalSrc = popupModal.querySelector('.popup__pic');
const modalTitle = popupModal.querySelector('.popup__pic-caption');
const addButton = document.querySelector('.profile__button-add');

const photoShow = document.querySelector('#createPhoto');
const closePopupPhoto = document.querySelector('.popup__close');
const closeModal = document.querySelector('.popup__close');

//форма добавления фото
function photoSubmitHandler (evt) {
  evt.preventDefault();
  photoContainer.prepend(addPhoto(photoTitleInput.value, photoLinkInput.value));
  photoTitleInput.value = ''; // очищаем поля
  photoLinkInput.value = ''; // очищаем поля
  popupClose(popupPhoto);
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
  const deleteButton = newPhoto.querySelector('.photo-grid__delete');
  const likeButton = newPhoto.querySelector('.photo-grid__like');

  photoTitle.textContent = name;
  photoSrc.alt = name;
  photoSrc.src = link;

  function handleModal() {
    popupModal.classList.add('popup_type_modal_add');
    modalTitle.textContent = name;
    modalSrc.alt = name;
    modalSrc.src = link;
    modalClose();
  }

  deleteButton.addEventListener('click', handleDeletePhoto);
  likeButton.addEventListener('click', handleLike);
  photoSrc.addEventListener('click', handleModal);
  popupPhotoClose();

  return newPhoto;
}

initialCards.forEach(function(item) {
  const newCard = addPhoto(item['name'], item['link']);
  photoContainer.append(newCard);
});


//pr5
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
//pr5
function popupPhotoShow() {
  popupPhoto.classList.add('popup_type_photo_visible');
}

function popupPhotoClose() {
  popupPhoto.classList.remove('popup_type_photo_visible');
}
// function modalClose() {
  // popupModal.classList.remove('popup_type_modal_add');
// }

initialCards.forEach(function(item) {
  const newCard = addPhoto(item['name'], item['link']);
  photoContainer.append(newCard);
});


formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', popupClose);
editButton.addEventListener('click', popupOpen);


formPhoto.addEventListener('submit', photoSubmitHandler);
photoShow.addEventListener('click', addPhoto);
addButton.addEventListener('click', popupPhotoShow);

closePopupPhoto.addEventListener('click', popupPhotoClose (popupProfile)); // закрыть попап
// closeModal.addEventListener('click',  modalClose());

