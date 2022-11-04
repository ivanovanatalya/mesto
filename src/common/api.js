class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._authToken = options.headers.authorization;
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

  getCurrentUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: { authorization: this._authToken},
    })
    .then(res => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: { authorization: this._authToken},
    })
    .then(res => this._getResponseData(res));
  }

  editProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, about })
    })
    .then(res => this._getResponseData(res));
  }

  addCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    })
    .then(res => this._getResponseData(res));
  }

  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken,
      },
    })
    .then(res => this._getResponseData(res));
  }

  setCardLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authToken,
      },
    })
    .then(res => this._getResponseData(res));
  }


  deleteCardLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken,
      },
    })
    .then(res => this._getResponseData(res));
  }


  editAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar })
    })
    .then(res => this._getResponseData(res));
  }
}

export default Api;
