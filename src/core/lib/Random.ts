import { RandomIntMinGreaterThanMaxError } from "../errors/RandomIntMinGreaterThanMaxError";

export class Random {
  private constructor() {}

  public static randomInt(min: number, max: number) {
    if (min >= max) {
      throw new RandomIntMinGreaterThanMaxError(min, max);
    }

    return Math.floor(Math.random() * (max - min) + min);
  }
}
