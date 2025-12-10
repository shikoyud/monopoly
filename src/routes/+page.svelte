<script lang="ts">
  import { user } from "$lib";
  import { gameManager } from "$lib/managers/GameManager.svelte";
  import { playerManager } from "$lib/managers/PlayerManager.svelte";
  import Board from "../components/Board.svelte";
  import BoardOverlay from "../components/BoardOverlay.svelte";

  let tiles = gameManager.tiles;
  let group = $derived(playerManager.playerByTiles);
</script>

<div class="flex h-screen w-screen">
  <Board {tiles} />
  <BoardOverlay {group} />
</div>
