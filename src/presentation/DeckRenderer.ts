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
  private deckRoot: HTMLDivElement;
  private discardRoot: HTMLDivElement;

  constructor(private deck: Deck) {
    super();

    this.root = document.createElement("div");
    this.root.classList.add("deck");

    this.deckRoot = document.createElement("div");
    this.deckRoot.classList.add("card-stack");

    this.discardRoot = document.createElement("div");
    this.discardRoot.classList.add("card-stack");

    this.draw();

    this.on("deckUpdated", () => this.draw());
  }

  private draw(): void {
    this.clearRoot();

    this.drawDeck();
    this.drawDiscard();

    this.root.appendChild(this.deckRoot);
    this.root.appendChild(this.discardRoot);
  }

  private drawDiscard(): void {
    const root = this.discardRoot;
    this.clearRoot(root);

    const topFourCards = this.deck.discarded.slice(-4);
    topFourCards.forEach((card) => {
      const cardElement = new CardElement(card);
      root.appendChild(cardElement.domElement);
    });
  }

  private drawDeck(): void {
    const root = this.deckRoot;
    this.clearRoot(root);

    const cards = this.deck.list;
    const hiddenCards = Math.min(3, this.deck.length);
    const topCard = cards[this.deck.length - 1];

    for (let i = 0; i < hiddenCards; i++) {
      const hiddenCard = document.createElement("div");
      hiddenCard.classList.add("card");
      hiddenCard.classList.add("hidden-card");

      root.appendChild(hiddenCard);
    }

    if (!topCard) return;

    const card = new CardElement(topCard);

    card.on("clicked", (card) => this.emit("drawCard", card));

    root.appendChild(card.domElement);
  }

  private clearRoot(root: HTMLElement = this.root): void {
    while (root.firstChild) {
      root.removeChild(root.lastChild!);
    }
  }

  public get domElement(): HTMLDivElement {
    return this.root;
  }
}
