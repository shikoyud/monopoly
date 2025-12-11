<script lang="ts">
  import type { Tile } from "$lib/models/Tile";
  import MarketTileInfo from "./MarketTileInfo.svelte";
  import PropertyTileInfo from "./PropertyTileInfo.svelte";
  import SpecialTileInfo from "./SpecialTileInfo.svelte";
  import UtilityTileInfo from "./UtilityTileInfo.svelte";

  interface ModalProps {
    modal: HTMLDialogElement | undefined;
    tile: Tile;
    isGetInfo: boolean;
  }
  let { modal = $bindable(), tile, isGetInfo }: ModalProps = $props();
  const lightColors = ["lightblue", "pink", "orange", "yellow"];
  let textColor: string = $state("text-white");
  $effect(() => {
    if (lightColors.includes(tile.color!)) {
      textColor = "text-black";
    }
  });
</script>

<dialog class="modal" bind:this={modal}>
  <div
    class="modal-box max-w-fit h-fit"
    style:background={"rgba(255,255,255,0.5)"}
  >
    {#if tile.type === "property"}
      <PropertyTileInfo {tile} />
    {:else if tile.type === "market"}
      <MarketTileInfo {tile} />
    {:else if tile.type === "utility"}
      <UtilityTileInfo {tile} />
    {:else}
      <SpecialTileInfo {tile} />
    {/if}
    {#if !isGetInfo && (tile.type == "property" || tile.type == "market" || tile.type == "utility")}
      <div class="modal-action">
        <form class="flex justify-around w-full" method="dialog">
          <button class="btn btn-error">Bỏ qua</button>
          <button class="btn btn-success">Mua (${tile.price})</button>
        </form>
      </div>
    {/if}
  </div>
  {#if isGetInfo || !(tile.type == "property" || tile.type == "market" || tile.type == "utility")}
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  {/if}
</dialog>
