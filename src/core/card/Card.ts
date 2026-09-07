import { CardColour } from "./CardColour";

export abstract class Card {
  constructor(
    public readonly value: number,
    public readonly colour: CardColour,
  ) {}

  isMatch(card: Card): boolean {
    const matchingColour = this.colour === card.colour;
    const matchingValue = this.value === card.value; // TODO fix this later

    return matchingColour || matchingValue;
  }
}
