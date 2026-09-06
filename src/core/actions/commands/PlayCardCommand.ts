import { Card } from "../../card/Card";
import { Command } from "../Command";
import { CommandKey } from "../CommandKey";

export interface PlayCardResultSuccess {
  success: true;
}

export interface PlayCardResultFailure {
  success: false;
  reason: string;
}

export type PlayCardResult = PlayCardResultSuccess | PlayCardResultFailure;

export class PlayCardCommand implements Command<PlayCardResult> {
  public readonly type = CommandKey.PlayCard;
  declare readonly __result: PlayCardResult;

  constructor(public readonly card: Card) {}
}
