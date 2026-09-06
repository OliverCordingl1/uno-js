import { Game } from "./core/Game";
import { GameRenderer } from "./presentation/GameRenderer";

const gameDiv = document.getElementById("game") as HTMLDivElement | null;
const game = new Game();

if (!gameDiv) throw new Error("No element with ID `#game` found in the DOM");

const renderer = new GameRenderer(game, gameDiv);
renderer.render();
