<script setup lang="ts">
import test1 from './assets/test/Abstract Wavy Sculptures.jpeg';
import test2 from './assets/test/859-536x354.jpg';
import test3 from './assets/test/Translucent Trio_ Fluid Earth and Fire.jpeg';
import MinimalCarousel from './components/MinimalCarousel.vue';

const TEST = [
  {
    link: test1,
    id: 1,
    name: '1',
  },
  {
    link: test2,
    id: 2,
    name: '2',
  },
  {
    link: test3,
    id: 3,
    name: '3',
  },
];
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl font-bold mb-4">Hello Minimal Carousel</h1>

    <div class="w-2/4 h-full">
      <MinimalCarousel :imageItems="TEST" />

      <!-- <MinimalCarousel :imageItems="TEST">
        <template #prev-btn="{ defaultClass, goToPrev }">
          <span @click="goToPrev" class="bg-red-200" :class="defaultClass"
            >prev</span
          >
        </template>

        <template #next-btn="{ defaultClass, goToNext }">
          <span @click="goToNext" class="bg-blue-200" :class="defaultClass"
            >next</span
          >
        </template>
      </MinimalCarousel> -->
    </div>
  </div>
</template>
