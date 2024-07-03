import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    }
  },
  base: '/home/latest/',
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: "OMI",
      description: "Web Components Framework",
      head: [
        ['link', { rel: 'icon', href: 'https://omi.cdn-go.cn/play/latest/assets/favicon.974a6ddb.ico' }]
      ],
      themeConfig: {
        logo: 'https://omi.cdn-go.cn/admin/latest/home/omi.svg',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          // { text: 'Home', link: '/' },
          // { text: 'Examples', link: '/markdown-examples' },
          {
            text: 'Docs', link: '/introduction'
          },
          {
            text: 'Tutorial & Play', link: 'https://omi.cdn-go.cn/tutorial/latest/'
          },
          {
            text: 'Templates', link: 'https://omi.cdn-go.cn/templates/latest/'
          },
          {
            text: 'Visactor', link: 'https://visactor.io/'
          },
          {
            text: 'wc-dev', link: 'https://webcomponents.dev/'
          },

          
          // {
          //   text: 'API', link: '/markdown-examples'
          // },
          // {
          //   text: 'Ecosystem', link: '/markdown-examples'
          // },
        ],

        sidebar: [
          {
            text: 'Guide',
            items: [
              { text: 'Introduction', link: '/introduction' },
              { text: 'Reactivity', link: '/reactivity' },
              { text: 'OOP & DOP', link: '/oop-dop' },
            ]
          },
          {
            text: 'Core API',
            items: [
              { text: 'Props', link: '/props' },
              { text: 'CSS', link: '/css' },
              { text: 'Event', link: '/event' },
              { text: 'Ref', link: '/ref' },
              { text: 'Slot', link: '/slot' },
              { text: 'Provide-Inject', link: '/provide-inject' },
              { text: 'Lifecycle', link: '/lifecycle' },
              { text: 'Directive', link: 'directive' },
              { text: 'Mixin', link: 'mixin' },
              { text: 'Update', link: '/update' },
              { text: 'Cross Frameworks', link: '/cross-frameworks' },
            ]
          },
        ],

        socialLinks: [
          { icon: 'github', link: 'https://github.com/Tencent/omi' }
        ]
      }

    },
    zh: {
      title: "OMI",
      label: '简体中文',
      lang: 'zh', // optional, will be added  as `lang` attribute on `html` tag
      // link: '/zh', // default /fr/ -- shows on navbar translations menu, can be external
      description: "Web Components 框架",
      head: [
        ['link', { rel: 'icon', href: 'https://omi.cdn-go.cn/play/latest/assets/favicon.974a6ddb.ico' }]
      ],
      themeConfig: {
        logo: 'https://omi.cdn-go.cn/admin/latest/home/omi.svg',
        // https://vitepress.dev/reference/default-theme-config
        nav: [
          // { text: '首页', link: '/zh/' },
          // { text: 'Examples', link: '/markdown-examples' },
          {
            text: '文档', link: '/zh/introduction'
          },
          {
            text: '教程 & Play', link: 'https://omi.cdn-go.cn/tutorial/latest/'
          },
          {
            text: '模板', link: 'https://omi.cdn-go.cn/templates/latest/'
          },
          {
            text: 'Visactor', link: 'https://visactor.io/'
          },
          {
            text: 'wc-dev', link: 'https://webcomponents.dev/'
          },
          // {
          //   text: 'API', link: '/markdown-examples'
          // },
          // {
          //   text: 'Ecosystem', link: '/markdown-examples'
          // },
        ],

        sidebar: [
          {
            text: '指南',
            items: [
              { text: '简介', link: '/zh/introduction' },
              { text: '响应式', link: '/zh/reactivity' },
              { text: 'OOP & DOP', link: '/zh/oop-dop' },
            ]
          },
          {
            text: '核心API',
            items: [
              { text: '属性 Props', link: '/zh/props' },
              { text: '样式 CSS', link: '/zh/css' },
              { text: '事件 Event', link: '/zh/event' },
              { text: '引用 Ref', link: '/zh/ref' },
              { text: '插槽 Slot', link: '/zh/slot' },
              { text: '提供-注入 Provide-Inject', link: '/zh/provide-inject' },
              { text: '生命周期 Lifecycle', link: '/zh/lifecycle' },
              { text: '指令 Directive', link: '/zh/directive' },
              { text: '混入 Mixin', link: '/zh/mixin' },
              { text: '更新 Update', link: '/zh/update' },
              { text: '跨框架', link: '/zh/cross-frameworks' },
            ]
          },
        ],

        socialLinks: [
          { icon: 'github', link: 'https://github.com/Tencent/omi' }
        ]
      }
      // other locale specific properties...
    }
  }

})
