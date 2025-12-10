<script lang="ts">
  import Tile from "./Tile.svelte";
  let { tiles } = $props();
</script>

<div class="flex items-center justify-center w-[100vh] h-screen absolute">
  <div
    class="grid gap-0 grid-cols-[12fr_repeat(9,7fr)_12fr]
    grid-rows-[12fr_repeat(9,7fr)_12fr] w-[100vh] h-screen overflow-hidden
  "
  >
    <div
      class="flex bg-base-100 col-[2/11] row-[2/11] items-center
      justify-center overflow-hidden"
    ></div>
    {#each tiles as tile (tile.id)}
      <Tile {tile} />
    {/each}
  </div>
</div>
