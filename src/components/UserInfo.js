export default class UserInfo {
  constructor(nameSelector, infoSelector) {
    this._userName = document.querySelector(nameSelector).innerHTML;
    this._userInfo = document.querySelector(infoSelector).innerHTML;
  }

  getUserInfo() {
    return {userName: this._userName, userInfo: this._userInfo};
  }

  setUserInfo(userName, userInfo) {
    this._userName.innerHTML = userName;
    this._userInfo.innerHTML = userInfo;
  }
}
