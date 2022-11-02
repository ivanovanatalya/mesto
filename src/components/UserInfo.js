export default class UserInfo {
  constructor(nameSelector, infoSelector, avatarSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
    this._userAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      userName: this._userName.innerHTML,
      userInfo: this._userInfo.innerHTML
    };
  }

  setUserInfo(userName, userInfo) {
    this._userName.innerHTML = userName;
    this._userInfo.innerHTML = userInfo;
  }

  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
}
