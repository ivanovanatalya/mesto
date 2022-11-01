(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const t=function(){function t(e,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._name=e.name,this._link=e.link,this._cardSelector=n,this._handleCardClick=r}var n,r;return n=t,(r=[{key:"_getTemplate",value:function(){return document.querySelector(this._cardSelector).content.querySelector(".photo-grid__item").cloneNode(!0)}},{key:"_handleCardLike",value:function(){this._elementLike.classList.toggle("photo-grid__like_active")}},{key:"_handleCardDelete",value:function(){this._element.remove(),this._element=null}},{key:"_setEventListeners",value:function(){var e=this;this._elementPic.addEventListener("click",(function(){e._handleCardClick({name:e._name,link:e._link})})),this._elementLike.addEventListener("click",(function(){e._handleCardLike()})),this._element.querySelector(".photo-grid__delete").addEventListener("click",(function(){e._handleCardDelete()}))}},{key:"generateCard",value:function(){return this._element=this._getTemplate(),this._elementPic=this._element.querySelector(".photo-grid__pic"),this._elementLike=this._element.querySelector(".photo-grid__like"),this._elementPic.src=this._link,this._elementPic.alt=this._name,this._element.querySelector(".photo-grid__title").textContent=this._name,this._setEventListeners(),this._element}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a=r((function e(t,n,r){var a=this,u=arguments.length>3&&void 0!==arguments[3]&&arguments[3];o(this,e),i(this,"_hasInvalidInput",(function(e){return e.some((function(e){return!e.validity.valid}))})),i(this,"_toggleButtonState",(function(){a._hasInvalidInput(a._inputList)?a._disableButton():a._enableButton()})),i(this,"_checkInputs",(function(e){a._inputList.forEach((function(t){a._isValid(e,t)}))})),i(this,"_disableButton",(function(){a._submitButton.classList.add(a._validationSettings.inactiveButtonClass),a._submitButton.disabled=!0})),i(this,"_enableButton",(function(){a._submitButton.classList.remove(a._validationSettings.inactiveButtonClass),a._submitButton.disabled=!1})),i(this,"_setEventListeners",(function(e){a._inputList=Array.from(e.querySelectorAll(a._validationSettings.inputSelector)),a._submitButton=e.querySelector(a._validationSettings.submitButtonSelector),a._inputList.forEach((function(t){t.setCustomValidity(""),t.addEventListener("input",(function(){a._toggleButtonState(e),a._isValid(e,t)}))})),a._buttonOpenForm.addEventListener("click",(function(){a._isInitialValid&&a._checkInputs(e),a._toggleButtonState(e)}))})),i(this,"_isValid",(function(e,t){t.validity.valid?a._hideInputError(e,t):a._showInputError(e,t,t.validationMessage)})),i(this,"enableValidation",(function(){var e=a._formWrapper.querySelector(a._validationSettings.formSelector);a._setEventListeners(e)})),i(this,"_showInputError",(function(e,t,n){var r=e.querySelector("#".concat(t.id," + ").concat(a._validationSettings.errorSelector));t.classList.add(a._validationSettings.inputErrorClass),r.textContent=n,r.classList.add(a._validationSettings.errorActiveClass)})),i(this,"_hideInputError",(function(e,t){var n=e.querySelector("#".concat(t.id," + ").concat(a._validationSettings.errorSelector));t.classList.remove(a._validationSettings.inputErrorClass),n.classList.remove(a._validationSettings.errorActiveClass),n.textContent=""})),this._validationSettings=t,this._formWrapper=n,this._buttonOpenForm=r,this._isInitialValid=u}));const u=a;function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var c=function(){function e(t,n){var r=t.renderer,o=t.items;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n),this._items=o}var t,n;return t=e,(n=[{key:"addItems",value:function(){var e=this;this._items.forEach((function(t){e._container.append(e._renderer(t))}))}},{key:"addItem",value:function(e){this._container.prepend(this._renderer(e))}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var p=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popup=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this),this._buttonClose=this._popup.querySelector(".popup__close")}var t,n;return t=e,(n=[{key:"_handleEscClose",value:function(e){"Escape"===e.key&&this.close()}},{key:"_handleOverlayClose",value:function(e){e.target===e.currentTarget&&this.close()}},{key:"_handleButtonClose",value:function(){this.close()}},{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){var e=this;this._popup.addEventListener("mousedown",this._handleOverlayClose.bind(this)),this._buttonClose.addEventListener("click",(function(){return e.close()}))}}])&&l(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _(){return _="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=y(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},_.apply(this,arguments)}function y(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=v(e)););return e}function h(e,t){return h=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},h(e,t)}function m(e,t){if(t&&("object"===f(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function v(e){return v=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},v(e)}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&h(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=v(r);if(o){var n=v(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return m(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popupImage=document.querySelector(".popup__pic"),t._popupTitle=document.querySelector(".popup__pic-caption"),t}return t=a,(n=[{key:"open",value:function(e){var t=e.name,n=e.link;this._popupImage.src=n,this._popupImage.alt=t,this._popupTitle.textContent=t,_(v(a.prototype),"open",this).call(this)}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(p);function g(e){return g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(e)}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function S(){return S="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=w(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},S.apply(this,arguments)}function w(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=L(e)););return e}function O(e,t){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},O(e,t)}function E(e,t){if(t&&("object"===g(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function L(e){return L=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},L(e)}var j=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&O(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=L(r);if(o){var n=L(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return E(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._handleFormSubmit=t,n._form=n._popup.querySelector(".form"),n._inputList=Array.from(n._form.querySelectorAll(".form__input")),n._submitButton=n._form.querySelector(".form__submit"),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"close",value:function(){this._form.reset(),S(L(a.prototype),"close",this).call(this)}},{key:"setEventListeners",value:function(){var e=this;S(L(a.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(t){t.preventDefault(),e._handleFormSubmit(e._getInputValues()),e.close()}))}}])&&k(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(p);function C(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var P=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._userName=document.querySelector(t),this._userInfo=document.querySelector(n)}var t,n;return t=e,n=[{key:"getUserInfo",value:function(){return{userName:this._userName.innerHTML,userInfo:this._userInfo.innerHTML}}},{key:"setUserInfo",value:function(e,t){this._userName.innerHTML=e,this._userInfo.innerHTML=t}}],n&&C(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}(),I=document.querySelector(".profile__button-edit"),q=document.querySelector(".profile__button-add"),B=".popup_type_profile",T=document.querySelector(B),R=".popup_type_photo",x=document.querySelector(R),V=document.querySelector(".form__input_type_name"),A=document.querySelector(".form__input_type_description"),D={formSelector:".form",inputSelector:".form__input",submitButtonSelector:".form__submit",inactiveButtonClass:"form__submit_disabled",inputErrorClass:"form__input_error",errorSelector:".form__input-error-message",errorActiveClass:"form__input-error-message_active"},N=new j(B,(function(e){H.setUserInfo(e.profile_name,e.profile_title)}));N.setEventListeners();var M=new j(R,(function(e){var t=U({name:e.photo_title,link:e.photo_link});W.addItem(t)}));M.setEventListeners();var F=new b(".popup_type_modal");F.setEventListeners();var H=new P(".profile__name",".profile__description");function U(e){return new t(e,"#photo-grid-template",F.open.bind(F)).generateCard()}var W=new c({items:[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],renderer:U},".photo-grid");W.addItems(),I.addEventListener("click",(function(){var e=H.getUserInfo();V.value=e.userName,A.value=e.userInfo,N.open()})),q.addEventListener("click",(function(){return M.open()}));var z=new u(D,T,I,!0),G=new u(D,x,q);z.enableValidation(),G.enableValidation()})();