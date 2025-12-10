import { sleep } from "$lib/utilities";

export class Player {
  id: string;
  name: string;
  money: number = $state(1500);
  color: string = $state("");
  position: number = $state(0);
  ownedProperty: number[] = $state([]);
  inJail: boolean = $state(false);

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
  }

  static fromFirebase(id: string, data: any) {
    const player = new Player(id, data.name);
    player.money = data.money
    player.color = data.color
    player.position = data.position
    try {
      const parsed = JSON.parse(data.ownedProperty);
      player.ownedProperty = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      player.ownedProperty = [];
    }
    player.inJail = data.inJail
    return player;
  }

  async move(steps: number) {
    while (steps-- > 0) {
      if (this.position == 39) {
        this.position = 0;
        continue;
      }
      this.position++;
      await sleep(300);
    }
  }

  async goTo(position: number) {
    while (this.position != position) {
      if (this.position == 39) {
        this.position = 0;
        continue;
      }
      this.position++;
      await sleep(300);
    }
  }

}
