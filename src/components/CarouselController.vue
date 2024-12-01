<script setup lang="ts">
defineProps<{
  imageItemsLength?: number;
  showPrevButton?: boolean;
  showNextButton?: boolean;
  currentIndex?: number;
  prevHandler?: () => void;
  nextHandler?: () => void;
  handleButtonClick?: () => void;
}>();
</script>

<template>
  <div>
    <slot
      name="prev-btn"
      :goToPrev="prevHandler"
      :defaultClass="'absolute left-4 top-1/2'"
    >
      <button
        v-if="showPrevButton"
        type="button"
        @click="
          () => {
            handleButtonClick?.();
            prevHandler?.();
          }
        "
        :class="`absolute left-4 top-1/2 h-[1.8rem] w-[1.8rem] flex items-center justify-center rounded-full bg-white opacity-40 hover:opacity-60 ${
          currentIndex === 0 ? 'cursor-not-allowed' : ''
        }`"
        :disabled="currentIndex === 0"
      >
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M14 8a.75.75 0 0 1-.75.75H4.56l1.22 1.22a.75.75 0 1 1-1.06 1.06l-2.5-2.5a.75.75 0 0 1 0-1.06l2.5-2.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8"
              clip-rule="evenodd"
            />
          </svg>
        </i>
      </button>
    </slot>

    <slot
      name="next-btn"
      :goToNext="nextHandler"
      :defaultClass="'absolute right-4 top-1/2'"
    >
      <button
        v-if="showNextButton"
        type="button"
        @click="
          () => {
            handleButtonClick?.();
            nextHandler?.();
          }
        "
        :class="`absolute right-4 top-1/2 h-[1.8rem] w-[1.8rem] flex items-center justify-center rounded-full bg-white opacity-40 hover:opacity-60 ${
          imageItemsLength && currentIndex === imageItemsLength - 1
            ? 'cursor-not-allowed'
            : ''
        }`"
        :disabled="
          imageItemsLength ? currentIndex === imageItemsLength - 1 : true
        "
      >
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M2 8c0 .414.336.75.75.75h8.69l-1.22 1.22a.75.75 0 1 0 1.06 1.06l2.5-2.5a.75.75 0 0 0 0-1.06l-2.5-2.5a.75.75 0 1 0-1.06 1.06l1.22 1.22H2.75A.75.75 0 0 0 2 8"
              clip-rule="evenodd"
            />
          </svg>
        </i>
      </button>
    </slot>
  </div>
</template>
