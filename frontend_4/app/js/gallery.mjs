import { Card } from "./card.mjs";

export class Gallery {
  root;
  cards;

  constructor(rootElement) {
    this.root = rootElement;
    this.cards = [];
  }

  addCard() {
    let Cards = new Card(this.root, this.root.querySelector('template'))
    this.cards.push(Cards);
  }

  addPicture(data) {
    if (!this.cards.length) {
      this.addCard();
    }

    let CardQuery = this.cards[this.cards.length - 1];

    if (CardQuery.isFull()) {
      this.addCard();
      CardQuery = this.cards[this.cards.length - 1];
    }
    CardQuery.addPicture(data);
  }

  clear() {
    this.root.querySelectorAll('.card').forEach(card => {
      card.remove();
    });
    this.cards = [];
  }
}