import type { Player } from "$lib/models/Player.svelte";
import type { Tile } from "$lib/models/Tile";
import { getTiles, sleep } from "$lib/utilities";

class GameManager {
  #tiles: Tile[] = $derived(getTiles());
  #turnQueue = $state<Player[]>([]);
  #currentPlayer = $state<Player>();

  get tiles() {
    return this.#tiles;
  }
  set turnQueue(q) {
    this.#turnQueue = q;
  }
  get turnQueue() {
    return this.#turnQueue;
  }
  set currentPlayer(p) {
    this.#currentPlayer = p;
  }
  get currentPlayer() {
    return this.#currentPlayer;
  }

  async gameLoop() {
    while (true) {

      this.#currentPlayer = this.#turnQueue.shift();

      this.#startTurn();

      const rolledDice1 = this.rollDice();
      const rolledDice2 = this.rollDice();
      console.log("Player " + this.#currentPlayer!.name + " rolled:" + rolledDice1 + " and " + rolledDice2);

      this.#currentPlayer?.move(rolledDice1 + rolledDice2);

      this.#resolveTile(this.#currentPlayer!.position);

      this.#endTurn();

      this.#turnQueue.push(this.#currentPlayer!);
      await sleep(3000);
    }
  }

  #startTurn() { }
  rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
  }
  #resolveTile(tile: number) {
    console.log(this.tiles[tile].name);
  }
  #endTurn() { }
}

export const gameManager = new GameManager();
