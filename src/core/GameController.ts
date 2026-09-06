import { Game } from "./Game";
import { GameRenderer } from "../presentation/GameRenderer";
import { Card } from "./card/Card";
import { ActionDispatcher } from "./actions/ActionDispatcher";
import { CommandKey } from "./actions/CommandKey";
import { PlayCardAction } from "./actions/actions/PlayCardAction";
import { PlayCardCommand } from "./actions/commands/PlayCardCommand";
import { EventEmitter } from "./lib/EventEmitter";

export type GameControllerEvents = {
  cardClicked: Card;
};

export class GameController extends EventEmitter<GameControllerEvents> {
  private game: Game;
  private renderer: GameRenderer;
  private dispatcher = new ActionDispatcher();

  constructor(rootElement: HTMLDivElement) {
    super();

    this.game = new Game();
    this.renderer = new GameRenderer(this.game, rootElement);

    this.registerActions();
    this.registerEvents();

    this.renderer.render();
  }

  private registerActions(): void {
    this.dispatcher.register(
      CommandKey.PlayCard,
      new PlayCardAction(this.game),
    );
  }

  private registerEvents() {
    this.renderer.on("cardClicked", this.handleCardClicked.bind(this));
  }

  private handleCardClicked(card: Card): void {
    const command = new PlayCardCommand(card);

    const result = this.dispatcher.dispatch<PlayCardCommand>(command);

    if (result.success) {
      this.renderer.render();
      return;
    }

    alert(`Error: ${result.reason}`);
  }
}
