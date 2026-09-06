import { Card } from "../card/Card";
import { EventEmitter } from "../lib/EventEmitter";

type PlayerEvents = {
  handUpdated: null;
  activeStatusChanged: boolean;
};

export class Player extends EventEmitter<PlayerEvents> {
  private _name: string;
  private _hand: Card[] = [];
  private isActiveTurn = false;

  constructor(name: string) {
    super();
    this._name = name;
  }

  public addCard(card: Card): void {
    this._hand.push(card);
    this.emit("handUpdated", null);
  }

  public setActiveStatus(status: boolean): void {
    this.isActiveTurn = status;
    this.emit("activeStatusChanged", status);
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

  public get turnActive(): boolean {
    return this.isActiveTurn;
  }
}
