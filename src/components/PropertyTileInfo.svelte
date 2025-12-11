<script lang="ts">
  import { getName } from "$lib";
  import type { Tile } from "$lib/models/Tile";

  interface ModalProps {
    tile: Tile;
  }
  let { tile }: ModalProps = $props();
  const lightColors = ["lightblue", "pink", "orange", "yellow"];
  let textColor: string = $state("text-white");
  $effect(() => {
    if (lightColors.includes(tile.color!)) {
      textColor = "text-black";
    }
  });
</script>

<figure class="hover-gallery">
  <div
    class="flex flex-col ml-2 w-fit h-full border-5 border-solid border-black bg-white"
  >
    <!-- FRONT FACE -->
    <div
      class="{textColor} flex w-full items-center justify-center"
      style:background={tile.color}
    >
      <p class="ml-15 mr-15 mt-10 mb-10 font-bold text-xl whitespace-nowrap">
        {getName(tile.name)}
      </p>
    </div>
    <div class="flex-9 m-5 text-sm text-black">
      <div class="flex">
        <span class="flex-9">Tiền thuê đất</span>
        <span class="flex-1">${tile.rents![0]}</span>
      </div>
      <div class="flex">
        <span class="flex-9">Với <strong>1 nhà</strong>, tính tiền thuê</span>
        <span class="flex-1">${tile.rents![1]}</span>
      </div>
      <div class="flex">
        <span class="flex-9">Với <strong>2 nhà</strong>, tính tiền thuê</span>
        <span class="flex-1">${tile.rents![2]}</span>
      </div>
      <div class="flex">
        <span class="flex-9">Với <strong>3 nhà</strong>, tính tiền thuê</span>
        <span class="flex-1">${tile.rents![3]}</span>
      </div>
      <div class="flex">
        <span class="flex-9">Với <strong>4 nhà</strong>, tính tiền thuê</span>
        <span class="flex-1">${tile.rents![4]}</span>
      </div>
      <div class="flex">
        <span class="flex-9"
          >Với <strong>khách sạn</strong>, tính tiền thuê</span
        >
        <span class="flex-1">${tile.rents![5]}</span>
      </div>
      <div class="flex mt-2 mb-2 font-bold">
        <span class="flex-9">Giá trị cầm cố</span>
        <span class="flex-1">${tile.mortgage!}</span>
      </div>
      <div class="flex">
        <span class="flex-9">Xây nhà <span class="text-xs">(1 căn)</span></span>
        <span class="flex-1">${tile.house_cost!}</span>
      </div>
      <div class="flex">
        <span class="flex-9 whitespace-nowrap"
          >Xây khách sạn <span class="text-xs">(phải có sẵn 4 nhà)</span></span
        >
        <span class="flex-1">${tile.hotel_cost!}</span>
      </div>
    </div>
  </div>

  <!-- BACK FACE -->
  <div
    class="{textColor} flex flex-col mr-2 text-center w-full content-between border-5
        border-solid border-black"
    style:background={tile.color}
  >
    <p class="flex-2 ml-15 mr-15 mt-10 mb-10 text-xl whitespace-nowrap">
      {getName(tile.name)}
    </p>
    <span class="flex-5 text-xl font-bold whitespace-nowrap"
      >GIÁ TRỊ<br />THẾ CHẤP ${tile.mortgage!}
    </span>
    <span class="flex-5 text-xl font-bold whitespace-nowrap"
      >GIẢI PHÓNG KHỎI<br />THẾ CHẤP CẦN ${Math.ceil(
        tile.mortgage! + tile.mortgage! / 10,
      )}
    </span>
  </div>
</figure>
