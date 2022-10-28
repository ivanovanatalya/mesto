export default class Section {
  constructor(dataObj , selector) { //TODO два параметра
    this._renderer = dataObj.renderer;
    this._container = document.querySelector(selector);
    this._items = dataObj.items;
  }

  addItems() {
    this._items.forEach((item) => {
      this._container.append(this._renderer(item));
    });
  }

  addItem(item) {
    this._container.prepend(this._renderer(item));
  }
}
