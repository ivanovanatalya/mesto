export default class Section {
  constructor({ renderer, items }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
    this._items = items;
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
