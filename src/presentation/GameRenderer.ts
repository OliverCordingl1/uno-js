import { Card } from "../core/card/Card";
import { Game } from "../core/Game";
import { EventEmitter } from "../core/lib/EventEmitter";
import { Player } from "../core/player/Player";
import { PlayerRenderer } from "./player/PlayerRenderer";
import { TableRenderer } from "./TableRenderer";

export type GameRendererEvents = {
  cardClicked: {
    actor: Player;
    card: Card;
  };
  drawCard: { actor: Player; card: Card };
  deckUpdated: null;
};

export class GameRenderer extends EventEmitter<GameRendererEvents> {
  private playerRenderers: PlayerRenderer[] = [];
  private tableRenderer: TableRenderer;

  constructor(
    private readonly game: Game,
    private root: HTMLDivElement,
  ) {
    super();

    this.tableRenderer = new TableRenderer(game);

    this.playerRenderers = game.players.map((player) => {
      const renderer = new PlayerRenderer(player);

      renderer.on("cardClicked", (card) => {
        this.emit("cardClicked", { actor: player, card });
      });

      this.tableRenderer.on("drawCard", (card) => {
        this.emit("drawCard", { actor: player, card });
      });

      return renderer;
    });

    this.on("deckUpdated", () => this.tableRenderer.emit("deckUpdated", null));
  }

  public render() {
    this.clearRoot();

    this.root.appendChild(this.tableRenderer.domElement);

    this.playerRenderers.forEach((renderer, i) => {
      this.root.appendChild(renderer.domElement);
    });
  }

  private clearRoot(): void {
    while (this.root.firstChild) {
      this.root.removeChild(this.root.lastChild!);
    }
  }
}
