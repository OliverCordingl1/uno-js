import { Card } from "../../core/card/Card";
import { EventEmitter } from "../../core/lib/EventEmitter";
import { Player } from "../../core/player/Player";
import { CardElement } from "../card/CardElement";

export type PlayerRendererEvents = {
  cardClicked: Card;
};

export class PlayerRenderer extends EventEmitter<PlayerRendererEvents> {
  private root: HTMLDivElement;

  constructor(private player: Player) {
    super();

    this.root = document.createElement("div");

    this.draw();
  }

  private draw(): void {
    this.root.className = "player-hud";

    const header = this.drawHeader();
    const hand = this.drawHand();

    this.root.appendChild(header);
    this.root.appendChild(hand);
  }

  private drawHeader(): HTMLDivElement {
    const header = document.createElement("div");
    header.className = "player-hud-header";

    const playerName = document.createElement("span");
    playerName.className = "player-name";
    playerName.innerText = this.player.name;

    header.appendChild(playerName);

    return header;
  }

  private drawHand(): HTMLDivElement {
    const cardGrid = document.createElement("div");
    cardGrid.className = "card-grid";

    this.player.hand.forEach((card) => {
      const cardElement = new CardElement(card);

      cardElement.on("clicked", (clickedCard) => {
        this.emit("cardClicked", clickedCard);
      });

      cardGrid.appendChild(cardElement.domElement);
    });

    return cardGrid;
  }

  public get domElement(): HTMLDivElement {
    return this.root;
  }
}
