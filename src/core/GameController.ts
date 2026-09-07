import { Game } from "./Game";
import { GameRenderer } from "../presentation/GameRenderer";
import { Card } from "./card/Card";
import { ActionDispatcher } from "./actions/ActionDispatcher";
import { getActions } from "./actions/getActions";
import { PlayCardCommand } from "./actions/commands/PlayCardCommand";
import { DrawCardCommand } from "./actions/commands/DrawCardCommand";
import { EventEmitter } from "./lib/EventEmitter";
import { Player } from "./player/Player";
import { CommandKey } from "./actions/CommandKey";

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
    const actions = getActions(this.game);

    Object.entries(actions).forEach(([key, action]) =>
      this.dispatcher.register(key as CommandKey, action),
    );
  }

  private registerEvents() {
    this.renderer.on("cardClicked", this.handleCardClicked.bind(this));
    this.renderer.on("drawCard", this.handleDrawCard.bind(this));
  }

  private handleCardClicked({
    card,
    actor,
  }: {
    card: Card;
    actor: Player;
  }): void {
    const command = new PlayCardCommand(actor, card);

    const result = this.dispatcher.dispatch<PlayCardCommand>(command);

    if (result.success) {
      this.renderer.emit("deckUpdated", null);
      actor.emit("handUpdated", null);
      return;
    }

    alert(`Error: ${result.reason}`);
  }

  private handleDrawCard({ actor, card }: { actor: Player; card: Card }): void {
    const command = new DrawCardCommand(actor, card);

    const result = this.dispatcher.dispatch<DrawCardCommand>(command);

    if (result.success) {
      this.renderer.emit("deckUpdated", null);
      return;
    }

    alert(`Error: ${result.reason}`);
  }
}
