export class Card {
  root;
  container;
  template;

  constructor(root, template) {
    this.root = root;
    this.template = template;

    this.container = document.importNode(this.template.content,true)
    this.root.prepend(this.container);
  }

  getEmptyImageElement() {
    let image;
    this.container = this.root.querySelector('.card');
    let images = this.container.querySelectorAll('img');

    for (image of images)
      if (!image.hasAttribute('src')) {
        return image;
      }
  }

  isFull() {
    return this.getEmptyImageElement() === undefined;
  }

  addPicture(data) {
    this.getEmptyImageElement().setAttribute('src', data);
  }
}

