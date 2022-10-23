import { openPopup, popupModal } from './index.js';


class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = selector;
    this._modalSrc = popupModal.src;
    this._modalTitle = popupModal.title;
    this._popupModal = popupModal.value;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.photo-grid__item').cloneNode(true);
  };

  _handleCardModal() {
    openPopup(this._popupModal);
    this._modalTitle.textContent = this._name;
    this._modalSrc.alt = this._name;
    this._modalSrc.src = this._link;
  }

  _handleCardLike() {
    this._elementLike.classList.toggle('photo-grid__like_active');
  }

  _handleCardDelete() {
    this._element = null;
    this._element.remove();
  }

  _setEventListeners() {
    this._elementPic.addEventListener('click', () => {
      this._handleCardModal();
    });

    this._elementLike.addEventListener('click', () => {
      this._handleCardLike();
    });

    this._element.querySelector('.photo-grid__delete').addEventListener('click', () => {
      this._handleCardDelete();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementPic = this._element.querySelector('.photo-grid__pic');
    this._elementLike = this._element.querySelector('.photo-grid__like');
    this._elementPic.src = this._link;
    this._elementPic.alt = this._name;
    this._element.querySelector('.photo-grid__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;