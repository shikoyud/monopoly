<script lang="ts">
  import { getImageSource, getName } from "$lib";
  import type { Tile } from "$lib/models/Tile";

  interface ModalProps {
    tile: Tile;
  }
  let { tile }: ModalProps = $props();

  let { src, alt } = getImageSource(() => tile);
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
      <img class="max-h-25 max-w-25" {src} {alt} />
    </div>
    <div class="flex-4 m-5 text-sm text-black">
      <div class="flex flex-col">
        <span class="flex-1 text-center"
          >Nếu sở hữu <strong>1 công ty</strong> thì tiền thuê<br />là
          <strong>4 lần</strong> số điểm của xúc xắc.</span
        >
        <span class="flex-1 text-center"
          >Nếu sở hữu <strong>2 công ty</strong> thì tiền thuê<br />là
          <strong>10 lần</strong> số điểm của xúc xắc.</span
        >
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
