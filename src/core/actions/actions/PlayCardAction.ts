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

    const lastPlayedCard = this.game.deck.lastPlayedCard;
    const isPlayable = lastPlayedCard.isMatch(card);

    if (!isPlayable) {
      return {
        success: false,
        reason: "Card cannot be played",
      };
    }

    this.game.deck.discard(card);
    actor.removeCard(card);
    this.game.turnManager.nextTurn();

    return {
      success: true,
    };
  }
}
