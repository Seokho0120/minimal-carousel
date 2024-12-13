import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      // 라이브러리 빌드 설정
      entry: fileURLToPath(new URL('./src/output.ts', import.meta.url)),
      // 라이브러리 진입점 파일 지정, 라이브러리에서 export할 컴포넌트를 포함해야함
      // fileURLToPath와 URL을 사용해 절대 경로로 변환 -> output.ts파일이 라이브러리의 시작점
      name: 'Minimal Carousel', // 빌드된 라이브러리 이름
      fileName: 'minimal-carousel', // 출력 파일 이름 지정 from 'minimal-carousel'
    },
    rollupOptions: {
      // vite의 빌드 도구인 Rollup에 전달되는 추가 옵션 설정
      // 외부 의존성과 출력 형식 설정
      external: ['vue'],
      // 빌드된 라이브러리에 포함하지 않을 외부 의존성을 명시, vue를 외부 의존성으로 설정하여 사용자가 vue를 별로도 설치해야함을 의미
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    // plugins 속성은 Vite의 플러그인 배열을 정의
    vue(),
    vueJsx(),
    vueDevTools(),
    dts({ rollupTypes: true, tsconfigPath: './tsconfig.app.json' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
