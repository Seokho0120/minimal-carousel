declare module 'minimal-carousel' {
  import { DefineComponent } from 'vue';

  interface ImageItem {
    link: string;
    name: string;
  }

  interface CarouselContents {
    title: string;
    subTitle: string;
    content: string;
  }

  interface MinimalCarouselProps {
    imageItems: ImageItem[];
    showPrevButton?: boolean;
    showNextButton?: boolean;
    pagination?: boolean | { dynamicBullets?: boolean };
    scrollbar?: boolean;
    autoPlay?: boolean;
    autoPlayDuration?: number;
    effectFade?: boolean;
    keyboardControl?: boolean;
    parallax?: boolean;
    contents?: CarouselContents[];
    lazy?: boolean;
  }

  const MinimalCarousel: DefineComponent<MinimalCarouselProps>;

  export { MinimalCarousel };
}
