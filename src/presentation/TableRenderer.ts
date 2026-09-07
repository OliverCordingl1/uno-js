import { Card } from "../core/card/Card";
import { Game } from "../core/Game";
import { EventEmitter } from "../core/lib/EventEmitter";
import { DeckRenderer } from "./DeckRenderer";

export type TableRendererEvents = {
  drawCard: Card;
  deckUpdated: null;
};

export class TableRenderer extends EventEmitter<TableRendererEvents> {
  private deck: DeckRenderer;
  private root: HTMLDivElement;

  constructor(private game: Game) {
    super();

    this.deck = new DeckRenderer(game.deck);

    this.deck.on("drawCard", (card) => {
      this.emit("drawCard", card);
    });

    this.on("deckUpdated", () => {
      this.deck.emit("deckUpdated", null);
    });

    this.root = document.createElement("div");
    this.root.classList.add("table");
    this.draw();
  }

  private draw() {
    this.root.appendChild(this.deck.domElement);
  }

  public get domElement(): HTMLDivElement {
    return this.root;
  }
}
