import { Dealer } from "./deck/Dealer";
import { Deck } from "./deck/Deck";
import { Player } from "./player/Player";
import { TurnManager } from "./turn/TurnManager";

export class Game {
  private _players: Player[] = [];
  private _deck: Deck;
  private _turnManager: TurnManager;
  private _dealer: Dealer;

  constructor() {
    this._deck = new Deck();
    this._dealer = new Dealer(this._deck);

    const numOfPlayers = 1;
    console.log("Seeding players");

    for (let i = 0; i < numOfPlayers; i++) {
      this._players.push(new Player(`Player ${i + 1}`));
    }

    console.log("Initialising turn manager");
    this._turnManager = new TurnManager(this._players);

    console.log("Shuffling deck");
    this._deck.shuffle();

    console.log("Dealing cards");

    this._players.forEach((player) => this._dealer.deal(player, 7));

    this._turnManager.notifyPlayersOfTurn();
  }

  public get turnManager(): TurnManager {
    return this._turnManager;
  }

  public get players(): Player[] {
    return this._players;
  }

  public get dealer(): Dealer {
    return this._dealer;
  }

  public get deck(): Deck {
    return this._deck;
  }
}
