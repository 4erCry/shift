export class Service {
  static URL = 'https://rickandmortyapi.com/api/';

  constructor(request) {
    this.request = request;
  }

  _url(path) {
    return Service.URL + path;
  }

  _get(url) {
    this.xhr.open('GET', url);
    this.xhr.send();
  }

  onUpdate() {
    if (this.xhr.status <= 400) {
      let result = JSON.parse(this.xhr.responseText);

      for (let i = 0; i < result.results.length; i++) {
        this.characters.push(result.results[i]);
      }

      if (result.info.next == null) {
        this.request._onUpdateSuccess(this.characters);
      } else {
        this._get(result.info.next);
      }
    } else alert("УПС...");
  }

  async getAllCharacters() {
    this.xhr = new XMLHttpRequest();
    this.characters = [];

    this.onUpdate = this.onUpdate.bind(this);
    this.xhr.addEventListener('load', this.onUpdate);

    this._get(this._url('character'));
  }
}

