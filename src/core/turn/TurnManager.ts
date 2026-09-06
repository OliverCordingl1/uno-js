import { Player } from "../player/Player";

export enum TurnDirection {
  Clockwise = 1,
  AntiClockwise = -1,
}

export class TurnManager {
  private turnDirection = TurnDirection.Clockwise;
  private turnIndex = 0;

  constructor(private readonly players: Player[]) {}

  public nextTurn(skip?: boolean): void {
    let increment = skip ? 2 : 1;
    const shift = increment * this.turnDirection;

    this.turnIndex = (this.turnIndex + shift) % this.players.length;
    this.notifyPlayersOfTurn();
  }

  public toggleDirection(): void {
    if (this.turnDirection === TurnDirection.Clockwise) {
      this.turnDirection = TurnDirection.AntiClockwise;
    } else {
      this.turnDirection = TurnDirection.Clockwise;
    }
  }

  public isCurrentPlayer(player: Player): boolean {
    const index = this.players.indexOf(player);

    if (index === -1) {
      throw new Error(`Player "${player.name}" is not registered in the Game`);
    }

    return this.turnIndex === index;
  }

  public notifyPlayersOfTurn(): void {
    this.players.forEach((player) => {
      const isActive = this.isCurrentPlayer(player);
      player.setActiveStatus(isActive);
    });
  }

  public get currentPlayer(): Player {
    return this.players[this.turnIndex];
  }

  public get direction(): TurnDirection {
    return this.turnDirection;
  }
}
