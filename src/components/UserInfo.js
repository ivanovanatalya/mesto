export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._userName = document.querySelector(nameSelector);
    this._userInfo = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {userName: this._userName.innerHTML, userInfo: this._userInfo.innerHTML};
  }

  setUserInfo(userName, userInfo) {
    this._userName.innerHTML = userName;
    this._userInfo.innerHTML = userInfo;
  }
}
