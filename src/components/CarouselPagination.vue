<script setup lang="ts">
import type { ImageItemsType } from '@/types/items.type';

const props = defineProps<{
  imageItems: ImageItemsType[];
  pagination: boolean;
  imageItemsLength: number;
  currentIndex: number;
  dynamicBullets: boolean;
}>();

const emit = defineEmits<{
  (event: 'go-to-image', idx: number): void;
}>();

function getPaginationClass(idx: number) {
  const isActive = idx === props.currentIndex;
  const isNextOrPrev =
    idx === props.currentIndex - 1 || idx === props.currentIndex + 1;

  if (props.dynamicBullets) {
    return isActive
      ? 'opacity-100 scale-125' // 현재 idx
      : isNextOrPrev
      ? 'opacity-70 scale-100' // 현재 idx 앞뒤
      : 'opacity-30 scale-75'; // 나머지 idx
  } else {
    return isActive
      ? 'opacity-100'
      : isNextOrPrev
      ? 'opacity-40'
      : 'opacity-30';
  }
}
</script>

<template>
  <div>
    <ul
      v-if="pagination && imageItemsLength && imageItemsLength > 1"
      class="absolute bottom-4 flex w-full justify-center gap-2"
    >
      <li
        v-for="(_, idx) in imageItems"
        :key="idx"
        :class="`${getPaginationClass?.(
          idx,
        )} h-[0.5rem] w-[0.5rem] rounded-full 
        bg-white transition-all duration-300 cursor-pointer`"
        @click="emit('go-to-image', idx)"
      />
    </ul>
  </div>
</template>
