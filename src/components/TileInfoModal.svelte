<script lang="ts">
  import type { Tile } from "$lib/models/Tile";

  interface ModalProps {
    modal: HTMLDialogElement | undefined;
    tile: Tile;
  }
  let { modal = $bindable(), tile }: ModalProps = $props();
</script>

<dialog class="modal" bind:this={modal}>
  <div class="modal-box">
    <h3 class="text-lg font-bold">Hello!</h3>
    <p class="py-4">{tile.name}</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
