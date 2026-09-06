import { Game } from "../../Game";
import { Action } from "../Action";
import { PlayCardCommand, PlayCardResult } from "../commands/PlayCardCommand";

export class PlayCardAction implements Action<PlayCardCommand> {
  constructor(private readonly game: Game) {}

  public execute(command: PlayCardCommand): PlayCardResult {
    return {
      success: false,
      reason: "Action not implemented",
    };
  }
}
