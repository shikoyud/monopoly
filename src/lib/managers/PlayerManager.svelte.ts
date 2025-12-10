import { Player } from "$lib/models/Player.svelte";
import { SvelteMap } from "svelte/reactivity";

class PlayerManager {
  #playerList = $state<Player[]>([]);
  #playerByTiles = $derived.by(() => {
    const map = new SvelteMap<number, Player[]>();
    this.#playerList.forEach(player => {
      const pos = player.position;
      if (!map.has(pos)) {
        map.set(pos, []);
      }
      map.get(pos)!.push(player);
    });
    return map;
  });

  #colorList = $state(["#2E4057", "#083D77", "#DA4167", "#F4D35E", "#F6D8AE", "#404E4D", "#5AD2F4"]);

  get playerList() {
    return this.#playerList;
  }
  get playerByTiles() {
    return this.#playerByTiles;
  }
  get colorList() {
    return this.#colorList;
  }

  updatePlayer(newPlayer: Player) {
    let index = this.#playerList.findIndex(player => player.id === newPlayer.id);
    if (index == -1) {
      console.log("index = -1.");
    }
    this.#playerList[index].money = newPlayer.money;
    this.#playerList[index].ownedProperty = newPlayer.ownedProperty;
    this.#playerList[index].inJail = newPlayer.inJail;
  }

  addNewPlayer(id: string, name: string): boolean {
    const player = new Player(id, name);
    player.color = this.#getColor(2);
    this.#playerList.push(player);
    return true;
  }

  removePlayer(id: string) {
    this.#playerList = this.playerList.filter(player => player.id != id);
  }

  getPlayer(id: string): Player {
    const index = this.#playerList.findIndex(player => player.id === id);
    if (index === -1) {
      console.error("Could not get player.")
    }
    return this.#playerList[index];
  }

  async movePlayer(id: string, des: number) {
    if (this.getPlayer(id).position == des) {
      return;
    }
    const index = this.#playerList.findIndex(player => player.id === id);
    if (index === -1) {
      console.error("Could not get player.")
      return;
    }
    await this.#playerList[index].goTo(des);
  }

  #getColor(index: number): string {
    return this.#colorList[index];
  }

}

export const playerManager = new PlayerManager();
