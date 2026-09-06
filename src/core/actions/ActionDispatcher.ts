import { Action } from "./Action";
import { Command, CommandResult } from "./Command";
import { CommandKey } from "./CommandKey";

type ErasedHandler = (command: Command) => unknown;

export class ActionDispatcher {
  private readonly handlers = new Map<CommandKey, ErasedHandler>();

  public register<TCommand extends Command>(
    commandType: CommandKey,
    action: Action<TCommand>,
  ): void {
    const handler: ErasedHandler = (command) => {
      return action.execute(command as TCommand);
    };

    this.handlers.set(commandType, handler);
  }

  public dispatch<TCommand extends Command>(
    command: TCommand,
  ): CommandResult<TCommand> {
    const handler = this.handlers.get(command.type);

    if (!handler) {
      throw new Error(`No action registered for ${command.type}`);
    }

    return handler(command) as CommandResult<TCommand>;
  }
}
