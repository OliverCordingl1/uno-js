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

  public render(gameDiv: HTMLDivElement): void {
    for (const player of this._players) {
      const hud = document.createElement("div");
      hud.className = "player-hud";

      const hudHeader = document.createElement("div");
      hudHeader.className = "player-hud-header";

      const hudTitle = document.createElement("span");
      hudTitle.className = "player-name";
      hudTitle.innerText = player.name;

      hudHeader.appendChild(hudTitle);
      hud.appendChild(hudHeader);

      const hudHand = document.createElement("div");
      hudHand.className = "card-grid";

      player.hand.forEach((card) => {
        const cardDiv = document.createElement("div");
        cardDiv.className = `card card-${card.colour}`;

        if (card instanceof NumberCard) {
          const cardTitle = document.createElement("span");
          cardTitle.className = "card-title";
          cardTitle.innerText = `${card.value}`;

          cardDiv.appendChild(cardTitle);
        }

        hudHand.appendChild(cardDiv);
      });

      hud.appendChild(hudHand);
      gameDiv.appendChild(hud);
    }
  }
}
