---
title: OMI - Web Components 框架
---

# 简介

## Omi 是什么？

Omi (读音 /ˈomɪ/，类似于 欧米) 是 Web Components 框架，内置 JSX 和信号 signal/Signal。


<!-- <em> Omi looks really neat!<br> </em>
　　　　— [Jason Miller (Creator of Preact)](https://twitter.com/_developit/)

<em> I really like the trend towards "frameworks" that:<br><br>"export default class Component extends HTMLElement {..}"<br> <br>This one, Omi, is from Tencent.</em>       
　　　　— [Dion Almaer](https://twitter.com/dalmaer/) -->

## 快速上手


### Usage

```tsx {1,3-11,13-26,28}
import { render, signal, tag, Component, h } from 'omi'

const count = signal(0)

function add() {
  count.value++
}

function sub() {
  count.value--
}

@tag('counter-demo')
class CounterDemo extends Component {
  static css = 'span { color: red; }'

  render() {
    return (
      <>
        <button onClick={sub}>-</button>
        <span>{count.value}</span>
        <button onClick={add}>+</button>
      </>
    )
  }
}

render(<counter-demo />, document.body)
```

如上面的阴影区域划分，解释如下:

* 从 'omi' 模块导入了几个函数和类，包括 render、signal、tag、Component 和 h。
* 创建了一个名为 count 的信号，并初始化为 0。信号是 Omi 中的一种响应式数据源，当信号的值改变时，所有使用这个信号的组件都会**重新渲染**。
  * 定义了两个函数 add 和 sub，分别用于增加和减少 count 的值。
* 定义了一个名为 CounterDemo 的组件，这个组件使用了 @tag 装饰器来指定其 HTML 标签名为 'counter-demo'。这个组件有一个静态属性 css 用于定义**局部样式**，以及一个 render 方法用于定义组件的渲染内容。
* 使用 render 函数将 CounterDemo 组件渲染到 document.body。

入门了，恭喜你！

## 使用 OMI CLI

快速创建 Omi + Vite + TS/JS 项目：

```bash
$ npx omi-cli init my-app    # 或者创建js项目: npx omi-cli init-js my-app
$ cd my-app           
$ npm start           # develop
$ npm run build       # release
```

快速创建 Omi + **Router** + **Signal** + **Suspense** + **Tailwindcss** + Vite + TS 项目：

```bash
$ npx omi-cli init-spa my-app  
$ cd my-app           
$ npm start           # develop
$ npm run build       # release
```