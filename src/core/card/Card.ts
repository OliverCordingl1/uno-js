import { CardColour } from "./CardColour";

export abstract class Card {
  constructor(
    public readonly value: number,
    public readonly colour: CardColour,
  ) {}
}
