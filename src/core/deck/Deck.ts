import { Card } from "../card/Card";
import { NumberCard } from "../card/NumberCard";
import { CardColour } from "../CardColour";
import { Random } from "../Random";
import { CARD_SELECTION_TABLE } from "./DeckConstants";

export class Deck {
  private cards: Card[] = [];

  constructor() {
    this.initialiseDeck();

    console.log("Deck initialised with", this.cards.length, "cards");
    this.printDeck();
  }

  public shuffle(): void {
    const length = this.cards.length;
    const maxIndex = length - 1;

    for (let i = 0; i < this.cards.length - 1; i++) {
      const randomIndex = Random.randomInt(i, maxIndex);

      const leftHand = this.cards[i];
      const rightHand = this.cards[randomIndex];

      this.cards[i] = rightHand;
      this.cards[randomIndex] = leftHand;
    }
  }

  public pop(): Card {
    if (this.cards.length === 0) {
      throw new Error("Card list empty");
    }

    return this.cards.pop()!;
  }

  public printDeck(): void {
    console.log("Deck: ", this.cards.map((card) => card.value).join(", "));
  }

  private initialiseDeck(): void {
    const amounts = Object.entries(CARD_SELECTION_TABLE);

    amounts.forEach(([rawColour, numberCardValueCount]) => {
      for (const [value, count] of Object.entries(numberCardValueCount)) {
        for (let i = 0; i < count; i++) {
          const colour = rawColour as CardColour;

          if (colour !== CardColour.Wild) {
            this.cards.push(new NumberCard(Number(value), colour));
          }
        }
      }
    });
  }
}
