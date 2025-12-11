<script lang="ts">
  import { getTileStyle } from "$lib";
  import PlayerContainer from "./PlayerContainer.svelte";

  let { group } = $props();
</script>

<div
  class="h-screen w-[100vh] items-center justify-center bg-transparent absolute"
>
  <div
    class="grid gap-0 grid-cols-[12fr_repeat(9,7fr)_12fr]
    grid-rows-[12fr_repeat(9,7fr)_12fr] h-screen w-[100vh] bg-transparent"
  >
    {#each group.entries() as [position, players] (position)}
      {@const style = getTileStyle(position)}
      <PlayerContainer {players} {style} />
    {/each}
  </div>
</div>
