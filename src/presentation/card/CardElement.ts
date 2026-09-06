import { Card } from "../../core/card/Card";
import { NumberCard } from "../../core/card/NumberCard";
import { EventEmitter } from "../../core/lib/EventEmitter";

export type CardElementEvents = {
  clicked: Card;
};

export class CardElement extends EventEmitter<CardElementEvents> {
  private element: HTMLDivElement;

  constructor(private card: Card) {
    super();

    this.element = document.createElement("div");
    this.element.className = `card card-${card.colour}`;

    this.draw();

    this.element.addEventListener("click", () => {
      this.emit("clicked", this.card);
    });
  }

  get domElement(): HTMLDivElement {
    return this.element;
  }

  private draw(): void {
    const element = this.drawValue();

    this.element.appendChild(element);
  }

  private drawValue(): HTMLSpanElement {
    if (this.card instanceof NumberCard) {
      return this.drawNumberCard();
    }

    // fallback, if we haven't yet implemented a card
    return this.drawUnknownCard();
  }

  private drawNumberCard(): HTMLSpanElement {
    const value = document.createElement("span");
    value.className = "card-title";
    value.innerText = `${this.card.value}`;

    return value;
  }

  private drawUnknownCard(): HTMLSpanElement {
    const unknownCard = document.createElement("span");
    unknownCard.className = "card-title";
    unknownCard.innerText = "??";

    return unknownCard;
  }
}
