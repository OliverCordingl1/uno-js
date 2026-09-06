import { GameController } from "./core/GameController";

const gameDiv = document.getElementById("game") as HTMLDivElement | null;

if (!gameDiv) throw new Error("No element with ID `#game` found in the DOM");

const gameController = new GameController(gameDiv);
