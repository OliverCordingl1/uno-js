import { Game } from "../Game";
import { Action } from "./Action";
import { DrawCardAction } from "./actions/DrawCardAction";
import { PlayCardAction } from "./actions/PlayCardAction";
import { Command } from "./Command";
import { CommandKey } from "./CommandKey";

export type ActionMap = Partial<Record<CommandKey, Action<Command>>>;

export const getActions = (game: Game): ActionMap => {
  return {
    [CommandKey.DrawCard]: new DrawCardAction(game),
    [CommandKey.PlayCard]: new PlayCardAction(game),
  };
};
