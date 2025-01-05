<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import CarouselController from './CarouselController.vue';
import CarouselPagination from './CarouselPagination.vue';
import CarouselScrollbar from './CarouselScrollbar.vue';
import CarouselItems from './CarouselItems.vue';
import type { ImageItemsType } from '@/types/items.type';

const props = withDefaults(
  defineProps<{
    imageItems: ImageItemsType[];
    showPrevButton?: boolean;
    showNextButton?: boolean;
    pagination?: boolean;
    dynamicBullets?: boolean;
    scrollbar?: boolean;
    autoPlay?: boolean;
    autoPlayDuration?: number;
    disableOnInteraction?: boolean;
    pauseOnMouseEnter?: boolean;
    stopOnLastSlide?: boolean;
    effectFade?: boolean;
    keyboardControl?: boolean;
    contents?: {
      title: string;
      subTitle?: string;
      content?: string;
    }[];
  }>(),
  {
    showPrevButton: true,
    showNextButton: true,
    pagination: false,
    dynamicBullets: false,
    scrollbar: false,
    autoPlay: false,
    autoPlayDuration: 2500,
    disableOnInteraction: true,
    pauseOnMouseEnter: false,
    stopOnLastSlide: false,
    effectFade: false,
    keyboardControl: false,
    contents: undefined,
  },
);
const { imageItems, scrollbar, autoPlay, pagination } = toRefs(props);

const showScrollbar = computed(() => scrollbar.value ?? false);
const currentIndex = ref(0);
const buttonClicked = ref(false);

function handlePauseOnClick() {
  buttonClicked.value = true;
}

function nextHandler() {
  if (buttonClicked.value === true) {
    pauseAutoPlay();
  }

  if (
    props.stopOnLastSlide &&
    currentIndex.value === imageItems.value.length - 1
  ) {
    return;
  }

  if (currentIndex.value < imageItems.value.length - 1) {
    currentIndex.value += 1;
  } else {
    currentIndex.value = 0;
  }
}

function prevHandler() {
  if (buttonClicked.value === true) {
    pauseAutoPlay();
  }

  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  } else {
    currentIndex.value = imageItems.value.length - 1;
  }
}

const autoPlayInterval = ref<number | null>(null);

function goToImage(index: number) {
  currentIndex.value = index;
}

function startAutoPlay() {
  if (autoPlay.value) {
    autoPlayInterval.value = setInterval(() => {
      if (
        props.stopOnLastSlide &&
        currentIndex.value === imageItems.value.length - 1
      ) {
        pauseAutoPlay();
      } else {
        nextHandler();
      }
    }, props.autoPlayDuration);
  }
}

function pauseAutoPlay() {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
    autoPlayInterval.value = null;
  }
}

function handleInteraction() {
  if (props.disableOnInteraction) {
    pauseAutoPlay();
  }
}

function handleMouseEnter() {
  if (props.pauseOnMouseEnter) {
    pauseAutoPlay();
  }
}

watch(
  autoPlay,
  (newVal) => {
    if (newVal) {
      startAutoPlay();
    } else {
      if (autoPlayInterval.value) {
        clearInterval(autoPlayInterval.value);
      }
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="overflow-hidden relative flex-shrink-0">
    <CarouselItems
      :imageItems="imageItems"
      :contents="contents"
      :currentIndex="currentIndex"
      :keyboardControl="keyboardControl"
      :effectFade="effectFade"
      :disableOnInteraction="disableOnInteraction"
      :pauseOnMouseEnter="pauseOnMouseEnter"
      @interaction="handleInteraction"
      @mouse-enter="handleMouseEnter"
      @prev="prevHandler"
      @next="nextHandler"
    />

    <CarouselController
      :imageItemsLength="imageItems.length"
      :showPrevButton="showPrevButton"
      :showNextButton="showNextButton"
      :currentIndex="currentIndex"
      @prev="prevHandler"
      @next="nextHandler"
      @pause-activated="handlePauseOnClick"
    >
      <template #prev-btn="slotProps">
        <slot name="prev-btn" v-bind="slotProps" />
      </template>

      <template #next-btn="slotProps">
        <slot name="next-btn" v-bind="slotProps" />
      </template>
    </CarouselController>

    <CarouselPagination
      :imageItems="imageItems"
      :pagination="pagination"
      :imageItemsLength="imageItems.length"
      :currentIndex="currentIndex"
      :dynamicBullets="dynamicBullets"
      @go-to-image="goToImage"
    />

    <CarouselScrollbar
      :showScrollbar="showScrollbar"
      :currentIndex="currentIndex"
      :imageItemsLength="imageItems.length"
    />
  </div>
</template>

<style lang="scss" scoped>
ul:focus {
  outline: none;
}
</style>
