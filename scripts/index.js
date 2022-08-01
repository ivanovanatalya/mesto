// button
const closeButton = document.querySelector('#profileClose');
const editButton = document.querySelector('.profile__button-edit');
const addButton = document.querySelector('.profile__button-add');
// photo-grid
const photoContainer = document.querySelector('.photo-grid');
const photoTemplate = document.querySelector('#photo-grid-template');
// popup
const popupProfile = document.querySelector('.popup_type_profile');
const popupPhoto = document.querySelector('.popup_type_photo');
const closePhoto = document.querySelector('#popupPhotoClose');
// form profile
const formElement = document.querySelector('.form');
const nameInput = document.querySelector('.form__input_type_name');
const descriptionInput = document.querySelector('.form__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
// photo
const formPhoto = document.querySelector('.form_type_photo');
const photoTitleInput = document.querySelector('.form__input_type_title');
const photoLinkInput = document.querySelector('.form__input_type_src');
const showPhoto = document.querySelector('#createPhoto');
//modal
const popupModal = document.querySelector('.popup_type_modal');
const modalSrc = popupModal.querySelector('.popup__pic');
const modalTitle = popupModal.querySelector('.popup__pic-caption');
const closeModalPhoto = document.querySelector('#modalClose');

//form add photo
function handlePhotoFormSubmit (evt) {
  evt.preventDefault();
  photoContainer.prepend(addPhoto(photoTitleInput.value, photoLinkInput.value));
  photoTitleInput.value = '';
  photoLinkInput.value = '';
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
  const deleteButton = newPhoto.querySelector('.photo-grid__delete');
  const likeButton = newPhoto.querySelector('.photo-grid__like');

  photoTitle.textContent = name;
  photoSrc.alt = name;
  photoSrc.src = link;

  function handleModal() {
    openPopup(popupModal);
    modalTitle.textContent = name;
    modalSrc.alt = name;
    modalSrc.src = link;
  }

  deleteButton.addEventListener('click', handleDeletePhoto);
  likeButton.addEventListener('click', handleLike);
  photoSrc.addEventListener('click', handleModal);

  return newPhoto;
}

initialCards.forEach(function(item) {
  const newCard = addPhoto(item['name'], item['link']);
  photoContainer.append(newCard);
});

//add form profile
function handlerFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(popupProfile);
}
function editProfile() {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', handlePressEsc);
}
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.addEventListener('keydown', handlePressEsc);
}
function handlePressEsc(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (activePopup && evt.key === 'Escape') {
    closePopup(activePopup);
  }
}

//event listeners
formElement.addEventListener('submit', handlerFormSubmit);
closeButton.addEventListener('click', () => { closePopup(popupProfile); });
editButton.addEventListener('click', editProfile);

addButton.addEventListener('click', () => { openPopup(popupPhoto); });

formPhoto.addEventListener('submit', handlePhotoFormSubmit);
showPhoto.addEventListener('click', addPhoto);

closePhoto.addEventListener('click', () => { closePopup(popupPhoto); });
closeModalPhoto.addEventListener('click', () => { closePopup(popupModal); });
