<script lang="ts">
  import { getImageSource } from "$lib";

  let { tile } = $props();
  let { src, alt } = getImageSource(() => tile);

  // svelte-ignore state_referenced_locally
  const flex =
    tile.side === "bottom"
      ? "flex flex-col"
      : tile.side === "left"
        ? "flex flex-row-reverse"
        : tile.side === "top"
          ? "flex flex-col-reverse"
          : "flex flex-row";
</script>

<div
  class="{flex} border border-black border-solid text-center font-bold text-black w-full h-full overflow-hidden relative"
  style:background="#c5e5b4"
  style:grid-row={tile.row}
  style:grid-column={tile.col}
>
  <!-- CORNER TILES -->
  {#if tile.side.startsWith("corner")}
    <div class="flex flex-col w-full h-full">
      {#if tile.side.endsWith("br")}
        <!-- GO TILE -->
        <div class="flex flex-col w-full h-full transform-[rotate(-45deg)]">
          <div class="flex-2 mt-2 text-[50%] ]">
            NHẬN $200<br />KHI ĐI QUA ĐÂY
          </div>
          <div
            class="flex-6 mt-[20%] text-[110%] text-orange-600"
            style:font-family={"Science Gothic"}
          >
            {tile.name}
          </div>
        </div>
      {:else if tile.side.endsWith("bl")}
        <!-- JAIL TILE -->
        <div class="flex flex-7">
          <div
            class="flex flex-3 mt-5 items-center justify-center"
            style:writing-mode={"vertical-lr"}
          >
            THĂM
          </div>
          <div class="flex-7 bg-orange-300">
            <img
              class="ml-[20%] mt-[18%] transform-[rotate(45deg)] max-w-[60%] max-h-[60%]"
              {src}
              {alt}
            />
          </div>
        </div>
        <div class="flex flex-3 justify-center items-center">TÙ</div>
      {:else if tile.side.endsWith("tl")}
        <!-- REST TILE -->
        <div
          class="flex flex-col h-full w-full items-center justify-center transform-[rotate(135deg)]"
        >
          <div class="flex-3 text-xs">NGƠI</div>
          <div class="flex-3 text-xs">NGHỈ</div>
          <div class="flex flex-2 items-center justify-center w-full h-full">
            <img class="max-w-[70%] max-h-[70%]" {src} {alt} />
          </div>
        </div>
      {:else}
        <!-- GO TO JAIL TILE -->
        <div class="flex flex-col transform-[rotate(-135deg)]">
          <div class="flex flex-3 text-[110%] items-center justify-center">
            ĐI
          </div>
          <div class="flex flex-2 items-center justify-center">
            <img class="max-w-[65%] max-h-[65%]" {src} {alt} />
          </div>
          <div class="flex flex-4 text-[80%] items-center justify-center">
            VÀO TÙ
          </div>
        </div>
      {/if}
    </div>
  {/if}

  <!-- SPECIAL TILES -->
  {#if tile.type === "chance" || tile.type === "fortune" || tile.type === "luxury_tax" || tile.type === "income_tax"}
    {@const imgSize = tile.type.endsWith("tax")
      ? "max-h-[70%] max-w-[70%]"
      : ""}
    {@const imgRotate =
      tile.side === "left"
        ? "90deg"
        : tile.side === "top"
          ? "180deg"
          : tile.side === "right"
            ? "-90deg"
            : "0"}
    {@const margin =
      tile.side === "left"
        ? "mr-[10%]"
        : tile.side === "top"
          ? "mb-[18%]"
          : tile.side === "right"
            ? "ml-[10%]"
            : "mt-[18%]"}
    {@const textRotate =
      tile.side === "top" || tile.side === "right" ? "180deg" : "0"}
    {@const writingMode =
      tile.side === "left" || tile.side === "right" ? "vertical-rl" : ""}
    <div
      class="flex-3 {margin} text-[70%]"
      style:writing-mode={writingMode}
      style:transform={`rotate(${textRotate})`}
    >
      {@html tile.name}
    </div>
    <div class="flex items-center justify-center flex-7">
      <img
        class={imgSize}
        {src}
        {alt}
        style:transform={`rotate(${imgRotate})`}
      />
    </div>
  {/if}

  <!-- UTILITY | MARKET TILES -->
  {#if tile.type === "utility" || tile.type === "market"}
    {@const imgRotate =
      tile.side === "left"
        ? "90deg"
        : tile.side === "top"
          ? "180deg"
          : tile.side === "right"
            ? "-90deg"
            : "0"}
    {@const margin =
      tile.side === "left"
        ? "mr-[10%]"
        : tile.side === "top"
          ? "mb-[18%]"
          : tile.side === "right"
            ? "ml-[10%]"
            : "mt-[18%]"}
    {@const imgSize =
      tile.side === "left"
        ? "max-h-[90%] max-w-[90%]"
        : "max-h-[85%] max-w-[85%]"}
    {@const textRotate =
      tile.side === "top" || tile.side === "right" ? "180deg" : "0"}
    {@const writingMode =
      tile.side === "left" || tile.side === "right" ? "vertical-rl" : ""}
    {@const priceMargin =
      tile.side === "left"
        ? "mr-[5%]"
        : tile.side === "top"
          ? "mb-[5%]"
          : tile.side === "right"
            ? "ml-[5%]"
            : "mt-[5%]"}
    <div
      class="flex-3 {margin} text-[50%]"
      style:writing-mode={writingMode}
      style:transform={`rotate(${textRotate})`}
    >
      {@html tile.name}
    </div>
    <div class="flex flex-7 items-center justify-center">
      <img
        class={imgSize}
        {src}
        {alt}
        style:transform={`rotate(${imgRotate})`}
      />
    </div>
    <div
      class="flex-3 {priceMargin} text-[60%]"
      style:writing-mode={writingMode}
      style:transform={`rotate(${textRotate})`}
    >
      ${tile.price}
    </div>
  {/if}

  <!-- PROPERTY TILES -->
  {#if tile.type === "property"}
    {@const colorBorder =
      tile.side === "left"
        ? "border-l-2 border-solid border-black"
        : tile.side === "top"
          ? "border-t-2 border-solid border-black"
          : tile.side === "right"
            ? "border-r-2 border-solid border-black"
            : "border-b-2 border-solid border-black"}
    {@const margin =
      tile.side === "left"
        ? "mr-[10%]"
        : tile.side === "top"
          ? "mb-[18%]"
          : tile.side === "right"
            ? "ml-[10%]"
            : "mt-[18%]"}
    {@const priceMargin =
      tile.side === "left"
        ? "mr-[5%]"
        : tile.side === "top"
          ? "mb-[5%]"
          : tile.side === "right"
            ? "ml-[5%]"
            : "mt-[5%]"}
    {@const textRotate =
      tile.side === "top" || tile.side === "right" ? "180deg" : "0"}
    {@const writingMode =
      tile.side === "left" || tile.side === "right" ? "vertical-rl" : ""}
    <div class="flex-2 {colorBorder}" style:background={tile.color}></div>
    <div
      class="flex-8 {margin} text-[50%]"
      style:writing-mode={writingMode}
      style:transform={`rotate(${textRotate})`}
    >
      {@html tile.name}
    </div>
    <div
      class="flex-[2.5] {priceMargin} text-[60%]"
      style:writing-mode={writingMode}
      style:transform={`rotate(${textRotate})`}
    >
      ${tile.price}
    </div>
  {/if}
</div>
