import { Deck } from "./core/deck/Deck";
import { Game } from "./core/Game";

// const shuffleDeckButton = document.getElementById("shuffle-deck-button");
// const deck = new Deck();

// shuffleDeckButton?.addEventListener("click", () => {
//   deck.shuffle();
//   deck.printDeck();
// });

const gameDiv = document.getElementById("game") as HTMLDivElement | null;
const game = new Game();

if (!gameDiv) throw new Error("No element with ID `#game` found in the DOM");

game.render(gameDiv);
