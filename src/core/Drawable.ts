export abstract class Drawable<T extends HTMLElement = HTMLElement> {
  protected element?: T;

  abstract draw(): void;
}
