import { Card } from "../../card/Card";
import { Player } from "../../player/Player";
import { Command } from "../Command";
import { CommandKey } from "../CommandKey";

export interface DrawCardResultSuccess {
  success: true;
}

export interface DrawCardResultFailure {
  success: false;
  reason: string;
}

export type DrawCardResult = DrawCardResultSuccess | DrawCardResultFailure;

export class DrawCardCommand implements Command<DrawCardResult> {
  public readonly type = CommandKey.DrawCard;
  declare readonly __result: DrawCardResult;

  constructor(
    public readonly actor: Player,
    public readonly card: Card,
  ) {}
}
