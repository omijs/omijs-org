// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom'
import { nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'
// import MyComponent from './test.vue';

import './custom.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    //app.component('MyComponent', MyComponent);
  },
  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' });
    };
    onMounted(() => {
      const data = [...document.querySelectorAll('img')]
      if (!location.hash) {
        initZoom()
        return
      }
      console.debug(`等待图片加载：${data.length}`)
      Promise.all(data.map((img: HTMLImageElement) => new Promise<void>((resolve) => {
        if (img.complete) resolve()
        img.onload = () => resolve()
        img.onerror = () => resolve()
        img.onabort = () => resolve()
      }))).then(() => {
        initZoom();
        const dom = document.querySelector(decodeURIComponent(location.hash)) as HTMLElement;
        if (!dom) return;
        console.debug(`加载完毕，目标锚点 ${decodeURIComponent(location.hash)}，高度：${dom.offsetTop}`);
        setTimeout(() => {
          document.querySelector('html')?.scrollTo({
            top: dom.offsetTop,
          });
        }, 1000);
      })
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );
  }
}
