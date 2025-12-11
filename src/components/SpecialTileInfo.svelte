<script lang="ts">
  import { getImageSource, getName } from "$lib";
  import type { Tile } from "$lib/models/Tile";

  interface ModalProps {
    tile: Tile;
  }
  let { tile }: ModalProps = $props();

  let { src, alt } = getImageSource(() => tile);
</script>

<div class="flex justify-around">
  <!-- FRONT FACE -->
  <div
    class="flex flex-col ml-2 w-fit h-full border-5 border-solid border-black bg-white"
  >
    <div class="text-black flex flex-1 items-center justify-center">
      <p class="ml-15 mr-15 mt-10 mb-10 font-bold text-3xl whitespace-nowrap">
        {getName(tile.name)}
      </p>
    </div>
    <div class="flex items-center justify-center flex-4">
      <img class="max-h-35 max-w-35" {src} {alt} />
    </div>
    <div class="flex-4 m-5 text-sm text-black">
      <div class="flex flex-col">
        {#if tile.type == "rest_stop"}
          <span class="text-center"> Nghỉ ngơi thôi!</span>
        {:else if tile.type == "go"}
          <span class="text-center"> Nhận $200 mỗi lần đi ngang qua đây.</span>
        {:else if tile.type == "go_to_jail"}
          <span class="text-center text-sm max-w-60">
            Đi thẳng vào tù. Không nhận được $200 khi đi ngang qua ô bắt đầu.</span
          >
        {:else if tile.type == "income_tax"}
          <span class="text-center text-sm"> Nộp $200 cho ngân hàng.</span>
        {:else if tile.type == "luxury_tax"}
          <span class="text-center text-sm"> Nộp $100 cho ngân hàng.</span>
        {:else if tile.type == "chance"}
          <span class="text-center text-sm"> Rút một thẻ cơ hội.</span>
        {:else if tile.type == "fortune"}
          <span class="text-center text-sm"> Rút một thẻ khí vận.</span>
        {:else if tile.type == "jail"}
          <p class="text-sm text-center mb-4">
            Để ra khỏi tù bạn cần làm một trong các cách sau:
          </p>

          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span>●</span>
              <span class="text-sm">
                Trả <strong>$50</strong> và đợi lượt tiếp theo.
              </span>
            </li>
            <li class="flex items-start gap-3">
              <span>●</span>
              <span class="text-sm">
                Sử dụng thẻ <strong>"Ra khỏi tù"</strong> nếu có.
              </span>
            </li>

            <li class="flex items-start gap-3">
              <span>●</span>
              <div class="text-sm wrap-break-word max-w-80">
                Đợi qua <strong>3 lượt</strong>. Ở mỗi lượt bạn có thể tung xúc
                xắc để thử tung ra <strong>double</strong>. Nếu tung được
                <strong>double</strong>, ra khỏi tù và di chuyển tương ứng với
                số điểm lăn được.
              </div>
            </li>
          </ul>
        {/if}
      </div>
    </div>
  </div>
</div>
