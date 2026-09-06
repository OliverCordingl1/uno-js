import { Command, CommandResult } from "./Command";

export interface Action<TCommand extends Command> {
  execute(command: TCommand): CommandResult<TCommand>;
}
