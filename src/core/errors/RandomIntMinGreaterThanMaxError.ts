export class RandomIntMinGreaterThanMaxError extends Error {
  constructor(min: number, max: number) {
    super(`Minimum value (${min}) is >= maximum value (${max})`);

    this.name = "RandomIntMinGreaterThanMaxError";
  }
}
