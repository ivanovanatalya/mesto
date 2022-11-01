class Card {
  constructor(data, selector, handleCardClick, handleCardDelete) {
    this._id = data._id || '';
    this._name = data.name;
    this._link = data.link;
    this._likeCounter = data.likes?.length || 0;
    this._cardSelector = selector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.photo-grid__item').cloneNode(true);
  };

  _handleCardLike() {
    this._elementLike.classList.toggle('photo-grid__like_active');
  }

  // _handleCardDelete() {

  //   this._element.remove();
  //   this._element = null;
  // }

  _setEventListeners() {
    this._elementPic.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
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
    this._elementPic.src = this._link;
    this._elementPic.alt = this._name;
    this._elementLike = this._element.querySelector('.photo-grid__like');
    this._elementLikeCounter = this._element.querySelector('.photo-grid__like-counter');
    this._elementLikeCounter.innerHTML = this._likeCounter;
    this._element.querySelector('.photo-grid__title').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
