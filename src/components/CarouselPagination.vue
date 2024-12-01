<script setup lang="ts">
import type { ImageItemsType } from '@/types/items.type';

defineProps<{
  imageItems: ImageItemsType[];
  pagination: boolean;
  imageItemsLength: number;
  getPaginationClass: (idx: number) => string;
  goToImage: (idx: number) => void;
}>();
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
        @click="goToImage?.(idx)"
      />
    </ul>
  </div>
</template>
