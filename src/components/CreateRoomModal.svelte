<script lang="ts">
  let { modal = $bindable(), name = $bindable(), handleCreate } = $props();
</script>

<dialog id="create_room_modal" class="modal" bind:this={modal}>
  <div class="modal-box">
    <h3 class="text-lg font-bold mb-10">Tạo phòng</h3>
    <div class="flex items-center justify-center">
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
    <div class="modal-action">
      <form method="dialog">
        <button class="btn btn-info">Quay lại</button>
        <button class="btn btn-error" onclick={handleCreate}>Tạo</button>
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
