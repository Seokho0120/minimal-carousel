<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CarouselContents from './CarouselContents.vue';
import type { ImageItemsType } from '@/types/items.type';

const props = defineProps<{
  imageItems: ImageItemsType[];
  contents?: {
    title: string;
    subTitle: string;
    content: string;
  }[];
  currentIndex: number;
  keyboardControl: boolean;
  effectFade: boolean;
  disableOnInteraction: boolean;
  pauseOnMouseEnter: boolean;
  handleInteraction: () => void;
  handleMouseEnter: () => void;
}>();

const emit = defineEmits<{
  (event: 'prev'): void;
  (event: 'next'): void;
}>();

const carouselRef = ref<HTMLElement | null>(null);
const isDragging = ref(false);
const startX = ref(0);
const startTranslateX = ref(0);

// 드래그 시작
function dragStart(event: MouseEvent) {
  if (carouselRef.value) {
    isDragging.value = true;
    startX.value = event.pageX;
    startTranslateX.value = props.currentIndex * -100;
  }
}

// 드래그 중
function dragging(event: MouseEvent) {
  if (!isDragging.value || !carouselRef.value) return;

  const dragX = event.pageX;
  const walk = ((dragX - startX.value) / window.innerWidth) * 100; // 드래그 거리 계산

  carouselRef.value.style.transition = 'none'; // 드래그 중에는 애니메이션 비활성화
  carouselRef.value.style.transform = `translateX(${
    startTranslateX.value + walk
  }%)`; // 이동
}

// 드래그 종료
function dragStop(event: MouseEvent) {
  if (!isDragging.value) return;

  const dragStandardDistance = 4; // 드래그 기준 거리, 현재 %로 계산됨
  const dragX = event.pageX;
  const walk = ((dragX - startX.value) / window.innerWidth) * 100; // 드래그 거리 계산

  // 드래그 거리 기준으로 이전/다음 이미지로 이동
  if (
    walk < -dragStandardDistance &&
    (props.imageItems?.length ?? 0) > 0 && // props.imageItems가 undefined가 아닌지 체크
    (props.currentIndex ?? 0) < (props.imageItems?.length ?? 0) - 1
  ) {
    emit('next');
  } else if (walk > dragStandardDistance && props.currentIndex > 0) {
    emit('prev');
  }

  if (carouselRef.value) {
    carouselRef.value.style.transition = 'transform 0.4s ease'; // 이미지 드래그할때 여러 애니메이션을 줄 수 있음 일반적으로 ease
    // 드래그 종료 시 최종 위치를 정해줘야 그 이미지를 볼 수 있기 떄문에
    carouselRef.value.style.transform = `translateX(${
      props.currentIndex * -100
    }%)`; // 최종 위치 설정
    isDragging.value = false;
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (props.keyboardControl) {
    if (event.key === 'ArrowRight') {
      emit('next');
    } else if (event.key === 'ArrowLeft') {
      emit('prev');
    }
  }
}

function effectFadeStyle(index: number) {
  return `${
    props.currentIndex === index
      ? 'opacity-100 transition-opacity duration-1000 ease-in-out'
      : 'opacity-0'
  }`;
}

onMounted(() => {
  if (carouselRef.value) {
    carouselRef.value.focus(); // 자동 포커스
  }
});
</script>

<template>
  <ul
    ref="carouselRef"
    class="flex transition-transform duration-400"
    :style="{ transform: `translateX(${currentIndex * -100}%)` }"
    @mousedown="dragStart"
    @mouseup="dragStop"
    @mouseleave="dragStop"
    @mousemove="dragging"
    @keydown="handleKeyDown"
    tabindex="0"
  >
    <li
      v-for="(image, index) in imageItems"
      :key="index"
      :class="`flex-shrink-0 w-full h-full ${
        effectFade && effectFadeStyle(index)
      }`"
      @click="handleInteraction"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseEnter"
    >
      <CarouselContents
        v-if="props.contents && props.contents.length > index"
        :contents="props.contents[index]"
        :index="index"
        :current-index="currentIndex"
        :image="image"
      />
      <div v-else>
        <img
          :src="image.link"
          :alt="image.name"
          draggable="false"
          class="w-full h-full object-cover"
        />
      </div>
    </li>
  </ul>
</template>
