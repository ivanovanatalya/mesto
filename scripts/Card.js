import { openPopup, closePopup } from './index.js';

class  Card {

  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = selector;
    this._popupModal = document.querySelector('.popup_type_modal');
    this._modalSrc = this._popupModal.querySelector('.popup__pic');
    this._modalTitle = this._popupModal.querySelector('.popup__pic-caption');

  }
  _getTemplate() {
    const newPhoto = document.querySelector(this._cardSelector).content.querySelector('.photo-grid__item').cloneNode(true);
    const photoSrc = newPhoto.querySelector('.photo-grid__pic');
    const photoTitle = newPhoto.querySelector('.photo-grid__title');
    const buttonDelete = newPhoto.querySelector('.photo-grid__delete');
    const buttonLike = newPhoto.querySelector('.photo-grid__like');
    photoTitle.textContent = this._name;
    photoSrc.alt = this._name;
    photoSrc.src = this._link;

    this._element = newPhoto;
  };
  // модальное окно для просмотра фото
  _handleCardModal() {
      openPopup(this._popupModal);
      this._modalTitle.textContent = this._name;
      this._modalSrc.alt = this._name;
      this._modalSrc.src = this._link;
  }
  // лайк
  _handleCardLike() {
    this._element.classList.toggle('photo-grid__like_active');
  }
  // удаление
  _handleCardDelete() {
    this._element.remove();
  }
  // слушатели
  _setEventListeners() {
		this._element.querySelector('.photo-grid__pic').addEventListener('click', () => {
			this._handleCardModal();
		});

    this._element.querySelector('.photo-grid__like').addEventListener('click', () => {
			this._handleCardLike();
		});

    this._element.querySelector('.photo-grid__delete').addEventListener('click', () => {
			this._handleCardDelete();
		});

    
	}
  // photoClose.addEventListener('click', () => { closePopup(popupPhoto); });
  // modalPhotoClose.addEventListener('click', () => { closePopup(popupModal); });

  //карточка
  generateCard() {
    this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.photo-grid__pic').src = this._link;
    this._element.querySelector('.photo-grid__pic').alt = this._name;
    this._element.querySelector('.photo-grid__title').textContent = this._name;

    return this._element;
  }
}

export default Card;
