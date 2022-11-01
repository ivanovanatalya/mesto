class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._authToken = options.headers.authorization;
  }

  getCurrentUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: { authorization: this._authToken},
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: { authorization: this._authToken},
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  deleteCard(cardID) {
    return fetch(`${this._url}/cards/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  setCardLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }


  deleteCardLike(cardID) {
    return fetch(`${this._url}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }


  editAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'DELETE',
      headers: {
        authorization: this._authToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ avatar })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}

export default Api;
