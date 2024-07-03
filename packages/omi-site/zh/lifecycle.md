---
title: OMI - Web Components 框架
---

# 生命周期 Lifecycle

## 用法

| Lifecycle method | When it gets called                          |
| ---------------- | -------------------------------------------- |
| `install`        | 准备插入到文档 |
| `installed`      | 插入到文档之后 |
| `ready`      | 组件的属性、事件等已准备好并可以使用时触发，在 installed 之后异步执行 |
| `uninstall`      | 从文档中移除                 |
| `beforeUpdate`   |  update 之前                          |
| `updated`        |  update 之后                       |
| `beforeRender`   |  `render()` 之前                         |
| `rendered`   |  `render()` 之后，第一个参数是虚拟DOM，可以改变它改变渲染结果    |
| `receiveProps`   | 父元素重新渲染触发，返回 false 可阻止更新       |

举个例子:

```tsx
import { render, Component, tag } from 'omi'

@tag('my-timer')
class MyTimer extends Component {

  seconds = 0

  tick() {
    this.seconds++
    this.update()
  }

  install() {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  uninstall() {
    clearInterval(this.interval)
  }

  render() {
    return <div>秒: {this.seconds}</div>
  }
}

render(<my-timer />, 'body')
```

## 组件标签中监听

```tsx
import { render, Component, tag } from 'omi'

@tag('my-element')
class MyElement extends Component {
  render() {
    return <div>el</div>
  }
}

@tag('my-app')
class MyElement extends Component {
  render() {
    return (
      <my-element
        onInstalled={
          (evt: CustomEvent) => {
            updateMenu(evt.detail)
          }}>
      </my-element>
    )
  }
}
render(<my-timer />, 'body')
```

组件的使用者可以在组件标签上监听组件的生命周期事件，如上面的例子，组件的使用者可以监听组件的 `installed` 事件，其中 `evt.detail` 就是组件 `my-element` 本身。