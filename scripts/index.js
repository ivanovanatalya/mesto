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
  document.addEventListener('mousedown', handleClickOverlay);
}
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.addEventListener('keydown', handlePressEsc);
  document.addEventListener('mousedown', handleClickOverlay);
}
function handlePressEsc(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (activePopup && evt.key === 'Escape') {
    closePopup(activePopup);
  }
}

function handleClickOverlay(evt) {
  const activePopup = document.querySelector('.popup_opened');
  if (activePopup && evt.target === activePopup) {
    closePopup(activePopup);
  }
}

const toggleButtonState = (inputList, buttonElement) => {
  if (isValid(inputList)) {                    // 13. Вызываем функцию hasInvalidInput с передачей в нее массива полей ввода группы полей. Анализируем возвращенное функцией значение
    buttonElement.classList.add('form__submit_disabled'); // В ПР нужно добавить атрибут disabled
  } else {
    buttonElement.classList.remove('form__submit_disabled ');
  }
  };

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form_input'));
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
    });
  });
}

  const isValid = (formElement, inputElement) => {
    if(!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
    // button.disabled = false
    }
  }
  const enableValidation = () => {
    // Найдём все формы с указанным классом в DOM,
    // сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll('.form'));
    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
  };
  // Вызовем функцию
  enableValidation();

  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector('.form__input_error');
    inputElement.classList.add('form__input_error');
    errorElement.textContent = errorMessage;
    // errorElement.classList.add('form__input-error_active');
  };

  const hideInputError = (formElement, inputElement) => {
    // const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_error');
    // errorElement.classList.remove('form__input-error_active');
    // errorElement.textContent = '';
  };



//event listeners
formElement.addEventListener('submit', handlerFormSubmit);
closeButton.addEventListener('click', () => { closePopup(popupProfile); });
editButton.addEventListener('click', editProfile);

addButton.addEventListener('click', () => { openPopup(popupPhoto); });

formPhoto.addEventListener('submit', handlePhotoFormSubmit);
showPhoto.addEventListener('click', addPhoto);

closePhoto.addEventListener('click', () => { closePopup(popupPhoto); });
closeModalPhoto.addEventListener('click', () => { closePopup(popupModal); });
