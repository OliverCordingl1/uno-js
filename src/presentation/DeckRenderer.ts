import { Card } from "../core/card/Card";
import { Deck } from "../core/deck/Deck";
import { EventEmitter } from "../core/lib/EventEmitter";
import { CardElement } from "./card/CardElement";

export type DeckRendererEvents = {
  deckUpdated: null;
  drawCard: Card;
};

export class DeckRenderer extends EventEmitter<DeckRendererEvents> {
  private root: HTMLDivElement;

  constructor(private deck: Deck) {
    super();

    this.root = document.createElement("div");
    this.root.classList.add("deck");

    this.draw();

    this.on("deckUpdated", () => this.draw());
  }

  private draw(): void {
    this.clearRoot();

    const cards = this.deck.list;
    const hiddenCards = Math.min(3, this.deck.length);
    const topCard = cards[this.deck.length - 1];

    for (let i = 0; i < hiddenCards; i++) {
      const hiddenCard = document.createElement("div");
      hiddenCard.classList.add("card");
      hiddenCard.classList.add("hidden-card");

      this.root.appendChild(hiddenCard);
    }

    if (!topCard) return;

    const card = new CardElement(topCard);

    card.on("clicked", (card) => this.emit("drawCard", card));

    this.root.appendChild(card.domElement);
  }

  private clearRoot(): void {
    while (this.root.firstChild) {
      this.root.removeChild(this.root.lastChild!);
    }
  }

  public get domElement(): HTMLDivElement {
    return this.root;
  }
}
