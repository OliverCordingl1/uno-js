import { Game } from "../../Game";
import { Action } from "../Action";
import { PlayCardCommand, PlayCardResult } from "../commands/PlayCardCommand";

export class PlayCardAction implements Action<PlayCardCommand> {
  constructor(private readonly game: Game) {}

  public execute({ card, actor }: PlayCardCommand): PlayCardResult {
    const turnManager = this.game.turnManager;

    const isCurrentTurn = turnManager.isCurrentPlayer(actor);

    if (!isCurrentTurn) {
      return {
        success: false,
        reason: `It is not ${actor.name}'s turn`,
      };
    }

    // TODO: TEMP: Deal another card to the player.
    this.game.dealer.deal(actor, 1);
    this.game.turnManager.nextTurn();

    return {
      success: true,
    };
  }
}
