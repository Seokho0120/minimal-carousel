<script setup lang="ts">
import type { ImageItemsType } from '@/types/items.type';

const props = defineProps<{
  contents: {
    title: string;
    subTitle: string;
    content: string;
  };
  index: number;
  currentIndex: number;
  image: ImageItemsType;
}>();

const getParallaxStyle = (index: number, offset: number) => {
  const progress = props.currentIndex - index;
  const translateXValue = offset * progress;

  return {
    transform: `translateX(${translateXValue}px)`,
    transition: 'transform 0.6s ease',
  };
};
</script>

<template>
  <div class="relative">
    <h1
      class="absolute top-5 left-5 text-xl font-bold"
      :style="getParallaxStyle(index, -300)"
    >
      {{ contents.title }}
    </h1>
    <h2
      class="absolute top-20 left-5 text-lg"
      :style="getParallaxStyle(index, -200)"
    >
      {{ contents.subTitle }}
    </h2>
    <div
      class="absolute top-32 left-5 text-sm"
      :style="getParallaxStyle(index, -100)"
    >
      {{ contents.content }}
    </div>

    <img
      :src="image.link"
      :alt="image.name"
      draggable="false"
      class="w-full h-full object-cover"
    />
  </div>
</template>
