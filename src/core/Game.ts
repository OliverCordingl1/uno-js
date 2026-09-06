import { NumberCard } from "./card/NumberCard";
import { Dealer } from "./deck/Dealer";
import { Deck } from "./deck/Deck";
import { Player } from "./player/Player";

export class Game {
  private _players: Player[] = [];
  private _deck: Deck;

  constructor() {
    this._deck = new Deck();

    const numOfPlayers = 4;
    console.log("Seeding players");
    for (let i = 0; i < numOfPlayers; i++) {
      this._players.push(new Player(`Player ${i + 1}`));
    }

    console.log("Shuffling deck");
    this._deck.shuffle();

    console.log("Dealing cards");
    const dealer = new Dealer(this._deck, this._players);

    dealer.deal();
  }

  public get players(): Player[] {
    return this._players;
  }
}
