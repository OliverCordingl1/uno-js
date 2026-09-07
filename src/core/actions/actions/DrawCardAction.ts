import { Game } from "../../Game";
import { Action } from "../Action";
import { DrawCardCommand, DrawCardResult } from "../commands/DrawCardCommand";

export class DrawCardAction implements Action<DrawCardCommand> {
  constructor(private readonly game: Game) {}

  public execute({ actor }: DrawCardCommand): DrawCardResult {
    const turnManager = this.game.turnManager;

    const isCurrentTurn = turnManager.isCurrentPlayer(actor);

    if (!isCurrentTurn) {
      return {
        success: false,
        reason: `It is not ${actor.name}'s turn`,
      };
    }

    // TODO Idk if uno rules dictate you must play, or must pick up.
    const { lastPlayedCard, topCard } = this.game.deck;
    const hasMatchingCard = lastPlayedCard.isMatch(topCard);

    if (hasMatchingCard) {
      const drawnCard = this.game.deck.pop();
      this.game.deck.discard(drawnCard);
    } else {
      this.game.dealer.deal(actor, 1);
    }

    this.game.turnManager.nextTurn();

    return {
      success: true,
    };
  }
}
