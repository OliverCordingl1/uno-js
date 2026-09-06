import { Player } from "../player/Player";
import { Deck } from "./Deck";

export class Dealer {
  constructor(private readonly deck: Deck) {}

  deal(player: Player, count: number): void {
    for (let deal = 0; deal < count; deal++) {
      const card = this.deck.pop();
      player.addCard(card);
    }
  }
}
