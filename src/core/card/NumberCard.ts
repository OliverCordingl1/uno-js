import { Card } from "./Card";
import { CardColour } from "./CardColour";

export class NumberCard extends Card {
  constructor(value: number, colour: Exclude<CardColour, CardColour.Wild>) {
    super(value, colour);
  }
}
