import { Card } from "../core/card/Card";
import { Game } from "../core/Game";
import { EventEmitter } from "../core/lib/EventEmitter";
import { PlayerRenderer } from "./player/PlayerRenderer";

export type GameRendererEvents = {
  cardClicked: Card;
};

export class GameRenderer extends EventEmitter<GameRendererEvents> {
  private playerRenderers: PlayerRenderer[] = [];

  constructor(
    private readonly game: Game,
    private root: HTMLDivElement,
  ) {
    super();

    this.playerRenderers = game.players.map((player) => {
      const renderer = new PlayerRenderer(player);

      renderer.on("cardClicked", (card) => {
        this.emit("cardClicked", card);
      });

      return renderer;
    });
  }

  public render() {
    this.clearRoot();

    this.playerRenderers.forEach((renderer, i) => {
      console.log("initialising player renderer", i + 1);
      this.root.appendChild(renderer.domElement);
    });
  }

  private clearRoot(): void {
    while (this.root.firstChild) {
      this.root.removeChild(this.root.lastChild!);
    }
  }
}
