<script lang="ts">
  import { gameManager } from "$lib/managers/GameManager.svelte";
  import { playerManager } from "$lib/managers/PlayerManager.svelte";
  import Board from "../components/Board.svelte";
  import BoardOverlay from "../components/BoardOverlay.svelte";

  let tiles = gameManager.tiles;
  let group = $derived(playerManager.playerByTiles);
  playerManager.addNewPlayer("1", "sahiko");
  playerManager.addNewPlayer("2", "cac");
  playerManager.addNewPlayer("3", "lon");
  playerManager.getPlayer("1").goTo(2);
  playerManager.getPlayer("2").goTo(2);
  playerManager.getPlayer("3").goTo(2);
</script>

<div class="flex h-screen w-screen">
  <Board {tiles} />
  <BoardOverlay {group} />
</div>
