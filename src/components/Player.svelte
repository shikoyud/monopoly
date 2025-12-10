<script lang="ts">
  let { player } = $props();
</script>

<div
  class="bg-white rounded-xl border-3 border-solid fit text-xs font-bold
  p-1 w-fit"
  style:border-color={player.color}
  style:color={player.color}
>
  {player.name}
</div>
