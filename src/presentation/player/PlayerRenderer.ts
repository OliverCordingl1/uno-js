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

    player.on("handUpdated", () => this.redraw());
    player.on("activeStatusChanged", this.handleCurrentTurnEvent.bind(this));
  }

  private redraw(): void {
    this.reset();
    this.draw();
  }

  private draw(): void {
    this.root.classList.add("player-hud");

    if (this.player.turnActive) this.root.classList.add("current-turn");

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

  private handleCurrentTurnEvent(isCurrentTurn: boolean): void {
    const hasCurrentTurnClass = this.root.classList.contains("current-turn");

    if (isCurrentTurn && !hasCurrentTurnClass) {
      this.root.classList.add("current-turn");
      return;
    }

    this.root.classList.remove("current-turn");
  }

  private reset(): void {
    while (this.root.firstChild) {
      this.root.removeChild(this.root.lastChild!);
    }
  }

  public get domElement(): HTMLDivElement {
    return this.root;
  }
}
