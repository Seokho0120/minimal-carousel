<script setup lang="ts">
defineProps<{
  showScrollbar: boolean;
  currentIndex: number;
  imageItemsLength: number;
}>();
</script>

<template>
  <div
    v-if="showScrollbar"
    class="absolute bottom-0 left-0 right-0 h-1 bg-gray-400 transition-opacity duration-300"
    :class="{ 'opacity-100': showScrollbar, 'opacity-0': !showScrollbar }"
  >
    <div
      :style="{
        width: `${((currentIndex + 1) / imageItemsLength) * 100}%`,
      }"
      class="h-full bg-gray-200 transition-all duration-300"
    />
  </div>
</template>
