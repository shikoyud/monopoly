<script lang="ts">
  import { getName } from "$lib";
  import type { Tile } from "$lib/models/Tile";

  interface ModalProps {
    tile: Tile;
  }
  let { tile }: ModalProps = $props();
</script>

<figure class="hover-gallery">
  <!-- FRONT FACE -->
  <div class="flex flex-col ml-2 w-full h-full bg-white">
    <div class="text-black flex flex-2 items-center justify-center">
      <p class="ml-15 mr-15 mt-10 mb-10 font-bold text-xl whitespace-nowrap">
        {getName(tile.name)}
      </p>
    </div>
    <div class="flex items-center justify-center flex-4">
      <img class="max-h-20 max-w-20" src="/market.png" alt="market" />
    </div>
    <div class="flex-4 m-5 text-sm text-black">
      <div class="flex">
        <span class="flex-9">Tiền thuê chợ</span>
        <span class="flex-1">${tile.rents![0]}</span>
      </div>
      <div class="flex">
        <span class="flex-9">Nếu sỡ hữu <strong>2 chợ</strong>, thu</span>
        <span class="flex-1">${tile.rents![1]}</span>
      </div>
      <div class="flex">
        <span class="flex-9">Nếu sỡ hữu <strong>3 chợ</strong>, thu</span>
        <span class="flex-1">${tile.rents![2]}</span>
      </div>
      <div class="flex">
        <span class="flex-9">Nếu sỡ hữu <strong>4 chợ</strong>, thu</span>
        <span class="flex-1">${tile.rents![3]}</span>
      </div>
      <div class="flex mt-2 mb-2 font-bold">
        <span class="flex-9">Giá trị cầm cố</span>
        <span class="flex-1">${tile.mortgage!}</span>
      </div>
    </div>
  </div>

  <!-- BACK FACE -->
  <div
    class="text-white flex flex-col mr-2 text-center w-full content-between border-5
        border-solid border-white bg-black"
  >
    <p class="flex-2 ml-15 mr-15 mt-10 mb-10 text-xl whitespace-nowrap">
      {getName(tile.name)}
    </p>
    <span class="flex-5 text-xl font-bold whitespace-nowrap"
      >GIÁ TRỊ<br />THẾ CHẤP ${tile.mortgage!}</span
    >
    <span class="flex-5 text-xl font-bold whitespace-nowrap"
      >GIẢI PHÓNG KHỎI<br />THẾ CHẤP CẦN ${Math.ceil(
        tile.mortgage! + tile.mortgage! / 10,
      )}
    </span>
  </div>
</figure>
