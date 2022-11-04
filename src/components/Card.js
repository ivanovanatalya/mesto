class Card {
  constructor(data, userId, selector, handleCardClick, handleCardDelete, handleCardLikes) {
    this._userId = userId;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = selector;
    this._handleCardClick = handleCardClick;
    this._handleCardLikes = handleCardLikes;
    this._handleConfirmDelete = handleCardDelete;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector('.photo-grid__item').cloneNode(true);
  };

  _handleLikeState(likesCount) {
    this._elementLike.classList.toggle('photo-grid__like_active');
    this._elementLikeCounter.innerHTML = likesCount;
  }

  _handleCardDelete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementPic.addEventListener('click', () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });

    this._elementLike.addEventListener('click', (e) => {
      const isLiked = !e.target.classList.contains('photo-grid__like_active');
      this._handleCardLikes({ id: this._cardId, isLiked, setLike: this._handleLikeState.bind(this) });
    });

    this._elementRemove.addEventListener('click', () => {
      this._handleConfirmDelete({ id: this._cardId, removeCard: this._handleCardDelete.bind(this) });
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementRemove = this._element.querySelector('.photo-grid__delete');
    if (this._ownerId !== this?._userId) {
      this._elementRemove.hidden = true;
    }
    this._elementPic = this._element.querySelector('.photo-grid__pic');
    this._elementPic.src = this._link;
    this._elementPic.alt = this._name;
    this._elementLike = this._element.querySelector('.photo-grid__like');
    this._elementLikeCounter = this._element.querySelector('.photo-grid__like-counter');
    if (this._likes.find(item => item._id === this._userId)) {
      this._handleLikeState(this._likes.length);
    }
    this._elementLikeCounter.innerHTML = this._likes.length;
    this._elementTitle = this._element.querySelector('.photo-grid__title')
    this._elementTitle.textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}

export default Card;
