import { CardColour } from "../CardColour";
import { Card } from "./Card";

export class WildCard implements Card {
  readonly value = 50;
  readonly colour = CardColour.Wild;
}
