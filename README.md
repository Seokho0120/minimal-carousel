# Minimal-Carousel

Minimal Carousel is a simple and intuitive carousel library that provides a user-friendly interface. This library includes only the essential features that users need, designed for quick implementation without complexity.

## Features

- Drag-and-Drop Navigation: Users can swipe images with mouse drag or touch gestures.
- AutoPlay Functionality: Automatically transitions between images at specified intervals.
- Customizable Navigation Buttons: Easily show or hide previous and next buttons.
- Pagination: Visual indicators for the current image position.
- Keyboard Navigation: Supports navigation using keyboard arrow keys.
- Parallax Effect: Adds a depth effect to the images for a more engaging experience.
- Scrollbar: Optional scrollbar for additional navigation feedback.
- Customizable Transition Effects: Supports fade transitions and other customizable effects for image transitions.

## Installation

```
pnpm i minimalist-carousel
```

## Usage

### Basic Setup

Import the component in your Vue file

```ts
<template>
  <MinimalCarousel :imageItems="images" />
</template>

<script setup>
import MinimalCarousel from 'minimal-carousel';

const images = [
  { link: 'image1.jpg', name: 'Image 1' },
  { link: 'image2.jpg', name: 'Image 2' },
  { link: 'image3.jpg', name: 'Image 3' },
];
</script>
```

### Props

The component accepts the following props

| Prop Name            | Type                    | Default Value | Description                                                                         |
| -------------------- | ----------------------- | ------------- | ----------------------------------------------------------------------------------- |
| imageItems           | `Array<ImageItemsType>` | Required      | An array of image objects, each containing a link and name property.                |
| showPrevButton       | `Boolean`               | true          | Show or hide the previous button.                                                   |
| showNextButton       | `Boolean`               | true          | Show or hide the next button.                                                       |
| pagination           | `Boolean`               | false         | Show or hide the pagination.                                                        |
| scrollbar            | `Boolean`               | false         | Show or hide the scrollbar.                                                         |
| autoPlay             | `Boolean`               | false         | Enable or disable auto play.                                                        |
| autoPlayDuration     | `Number`                | 2500          | Duration in milliseconds for each slide during auto play.                           |
| disableOnInteraction | `Boolean`               | true          | Disable auto play when the user interacts with the carousel.                        |
| pauseOnMouseEnter    | `Boolean`               | false         | Pause auto play when the mouse hovers over the carousel.                            |
| stopOnLastSlide      | `Boolean`               | false         | Stop auto play when reaching the last slide.                                        |
| effectFade           | `Boolean`               | false         | Enable fade effect between slides.                                                  |
| keyboardControl      | `Boolean`               | false         | Allow navigation using keyboard arrow keys.                                         |
| parallax             | `Boolean`               | false         | Enable parallax effect for additional depth.                                        |
| contents             | `Array<Object>	`         | undefined     | An array of content objects containing title, subTitle, and content for each image. |

### Example

```ts
<template>
  <MinimalCarousel
    :imageItems="images"
    showPrevButton
    showNextButton
    pagination
    scrollbar
    autoPlay
    autoPlayDuration
    disableOnInteraction
    pauseOnMouseEnter
    stopOnLastSlide
    effectFade
    keyboardControl
    parallax
    :contents="sliderContents"
  />
</template>

<script setup>
import MinimalCarousel from 'minimal-carousel';

const images = [
  { link: 'image1.jpg', name: 'Image 1' },
  { link: 'image2.jpg', name: 'Image 2' },
  { link: 'image3.jpg', name: 'Image 3' },
];

const sliderContents = [
  { title: 'Title 1', subTitle: 'Subtitle 1', content: 'Content 1' },
  { title: 'Title 2', subTitle: 'Subtitle 2', content: 'Content 2' },
  { title: 'Title 3', subTitle: 'Subtitle 3', content: 'Content 3' },
];
</script>
```

### Custom Navigation Buttons

You can customize the previous and next buttons using slots

```ts
<template>
  <MinimalCarousel :imageItems="images" showPrevButton showNextButton>
    <template #prev-btn="{ goToPrev }">
      <button @click="goToPrev">Previous</button>
    </template>
    <template #next-btn="{ goToNext }">
      <button @click="goToNext">Next</button>
    </template>
  </MinimalCarousel>
</template>
```
