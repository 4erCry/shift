import { Service } from './service.js';

export class PageComponent {
  characters;

  constructor() {
    this.errorContainer = document.querySelector('.error');
    this.suggestions = document.querySelector('.suggestions');
    this.searchInput = document.querySelector('.search');

    this.service = new Service(this);

    this._bindListeners();
    this._loadData();
  }

  _bindListeners() {
    this._onUpdateSuccess = this._onUpdateSuccess.bind(this);
    this.onInput = this.onInput.bind(this);
    this.searchInput.addEventListener('input', this.onInput.bind(this));
  }

  onInput() {
    let value = this.searchInput.value;

    this._prepareHtml(this._filterData(value));
  }

  _filterData(value) {
    return this.characters.filter(character => {
      return character.name.toLowerCase().includes(value.toLowerCase());
    });
  }

  _loadData() {
    this.service.getAllCharacters()
        .then(characters => this._onUpdateSuccess(characters));
  }

  _onUpdateSuccess(characters) {
    this.characters = characters;
    this._prepareHtml(this.characters);
  }

  _errorMessage(message) {
    this.errorContainer.append('Error' + message);
  }

  _prepareHtml(characters) {
    while (this.suggestions.children.length) {
      this.suggestions.children[this.suggestions.children.length - 1].remove(0);
    }

    for (let i = 0; i < characters.length; i++) {
      let character = characters[i];
      let li = document.createElement('li');
      let img = document.createElement('img');
      let span = document.createElement('span');

      let value = this.searchInput.value;
      let indexOf = character.name.toLowerCase().indexOf(value.toLowerCase());

      let begin = character.name.slice(0, indexOf);
      let search = "<span style='background-color: yellow;'>" +
          character.name.slice(indexOf, value.length + indexOf) + "</span>";
      let end = character.name.slice(indexOf + value.length);


      span.innerHTML = begin + search + end;
      img.setAttribute('src', character.image);
      img.classList.add('character-image');

      li.append(span);
      li.append(img);

      this.suggestions.append(li);
    }
  }
}
