import { Game } from "../../Game";
import { Action } from "../Action";
import { DrawCardCommand, DrawCardResult } from "../commands/DrawCardCommand";

export class DrawCardAction implements Action<DrawCardCommand> {
  constructor(private readonly game: Game) {}

  public execute({ card, actor }: DrawCardCommand): DrawCardResult {
    const turnManager = this.game.turnManager;

    const isCurrentTurn = turnManager.isCurrentPlayer(actor);

    if (!isCurrentTurn) {
      return {
        success: false,
        reason: `It is not ${actor.name}'s turn`,
      };
    }

    this.game.dealer.deal(actor, 1);
    this.game.turnManager.nextTurn();

    return {
      success: true,
    };
  }
}
