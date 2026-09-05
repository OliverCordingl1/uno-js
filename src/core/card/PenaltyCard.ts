import { Card } from "./Card";

export interface PenaltyCard extends Card {
  penalty: Readonly<number>;
}
