import { CommandKey } from "./CommandKey";

export interface Command<Result = unknown> {
  readonly type: CommandKey;
  readonly __result: Result;
}

export type CommandResult<TCommand extends Command> = TCommand["__result"];
