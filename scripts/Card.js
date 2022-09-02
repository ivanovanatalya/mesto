class  Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const newPhoto = document.querySelector(this._cardSelector).content.querySelector('.photo-grid__item').cloneNode(true);
    const photoSrc = newPhoto.querySelector('.photo-grid__pic');
    const photoTitle = newPhoto.querySelector('.photo-grid__title');
    const buttonDelete = newPhoto.querySelector('.photo-grid__delete');
    const buttonLike = newPhoto.querySelector('.photo-grid__like');
    photoTitle.textContent = data.name;
    photoSrc.alt = data.name;
    photoSrc.src = data.link;

    this._element = newPhoto;
  };
  // модальное окно для просмотра фото
  _handleCardModal() {
      openPopup(popupModal);
      modalTitle.textContent = data.name;
      modalSrc.alt = data.name;
      modalSrc.src = data.link;
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
