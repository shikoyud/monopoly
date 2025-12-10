<script lang="ts">
  import Player from "./Player.svelte";

  let { players, style } = $props();
</script>

<div
  class="flex flex-wrap w-full h-full m-0 items-center content-evenly justify-evenly"
  style:grid-column={style.col}
  style:grid-row={style.row}
>
  {#each players as player (player.id)}
    <Player {player} />
  {/each}
</div>
