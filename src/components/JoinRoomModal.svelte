<script lang="ts">
  import { pasteFromClipboard } from "$lib";

  let {
    modal = $bindable(),
    name = $bindable(),
    lobby = $bindable(),
    handleJoin,
  } = $props();
</script>

<dialog class="modal" bind:this={modal}>
  <div class="modal-box">
    <h3 class="text-lg font-bold mb-10">Tham gia</h3>
    <div class="flex items-center justify-center mb-10">
      <input
        type="text"
        class="input validator w-fit absolute left-10"
        required
        pattern="^(?!\s*$).+"
        minlength="1"
        maxlength="6"
        placeholder="Nhập biệt danh của bạn"
        bind:value={name}
      />
      <div class="text-sm">{name.length}/6</div>
    </div>
    <div class="flex items-center justify-center">
      <input
        type="text"
        class="input validator w-fit absolute left-10"
        required
        pattern="^(?!\s*$).+"
        minlength="6"
        maxlength="6"
        placeholder="Nhập mã phòng"
        bind:value={lobby}
      />
      <button
        class="btn btn-warning btn-circle"
        aria-label="paste"
        onclick={async () => {
          lobby = await pasteFromClipboard();
        }}
      >
        <!-- prettier-ignore -->
        <svg class="size-[1.2em]" fill="#000000" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xml:space="preserve"> <g> <path d="M17.5,12h17c0.8,0,1.5-0.7,1.5-1.5V6c0-2.2-1.8-4-4-4H20c-2.2,0-4,1.8-4,4v4.5C16,11.3,16.7,12,17.5,12z"/> <path d="M44,6h-2.5C40.7,6,40,6.7,40,7.5V12c0,2.2-1.8,4-4,4H16c-2.2,0-4-1.8-4-4V7.5C12,6.7,11.3,6,10.5,6H8 c-2.2,0-4,1.8-4,4v36c0,2.2,1.8,4,4,4h36c2.2,0,4-1.8,4-4V10C48,7.8,46.2,6,44,6z M38,41c0,0.6-0.4,1-1,1H15c-0.6,0-1-0.4-1-1v-2 c0-0.6,0.4-1,1-1h22c0.6,0,1,0.4,1,1V41z M38,33c0,0.6-0.4,1-1,1H15c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h22c0.6,0,1,0.4,1,1V33z M38,25c0,0.6-0.4,1-1,1H15c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h22c0.6,0,1,0.4,1,1V25z"/> </g> </svg>
      </button>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-info">Quay lại</button>
        <button class="btn btn-error" onclick={handleJoin}>Tham gia</button>
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
