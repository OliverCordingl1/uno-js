import { Player } from "../player/Player";
import { Deck } from "./Deck";

export class Dealer {
  constructor(
    private readonly deck: Deck,
    private readonly players: Player[],
  ) {}

  deal(): void {
    const cardsPerPlayer = 7;

    for (let deal = 0; deal < cardsPerPlayer; deal++) {
      this.players.forEach((player) => {
        const card = this.deck.pop();

        player.addCard(card);
      });
    }
  }
}
