import { Card } from "../card/Card";

export class Player {
  private _name: string;
  private _hand: Card[] = [];

  constructor(name: string) {
    this._name = name;
  }

  public addCard(card: Card): void {
    this._hand.push(card);
  }

  public get name(): string {
    return this._name;
  }

  public get hand(): Card[] {
    return this._hand;
  }

  public get handLength(): number {
    return this._hand.length;
  }
}
