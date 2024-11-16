<script setup lang="ts">
import MinimalCarousel from "./components/MinimalCarousel.vue";
import test1 from "./assets/Abstract Wavy Sculptures.jpeg";
import test2 from "./assets/859-536x354.jpg";
import test3 from "./assets/Translucent Trio_ Fluid Earth and Fire.jpeg";

const TEST = [
  {
    link: test1,
    id: 1,
    name: "1",
  },
  {
    link: test2,
    id: 2,
    name: "2",
  },
  {
    link: test3,
    id: 3,
    name: "3",
  },
];
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl font-bold mb-4">Hello Minimal Carousel</h1>
    <div class="w-4/5">
      <MinimalCarousel
        :imageItems="TEST"
        showPrevButton
        showNextButton
        pagination
        keyboardControl
        autoPlay
      />
    </div>
  </div>
</template>
