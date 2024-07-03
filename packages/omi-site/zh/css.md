# 样式 CSS

## CSS 基础能力

可以直接使用字符串来为 html 写样式，他不会污染全局样式：

```tsx{5-6}
import { Component, h } from 'omi'

@tag('my-element')
class MyElement extends Component {
  // 局部作用域的 css
  static css = 'h1 { color: red }' 

  render() {
    return (
      <h1>Hello, world!</h1>
    )
  }
}
```

当然你可以通过 vite，导入资源的字符串，这样你的 css 就可以在 css 文件里面写。

```tsx{1,5-6}
import cssString from './xxx.css?raw'

@tag('my-element')
class MyElement extends Component {
  // 局部作用域的 css
  static css = cssString
  ...
  ...
```

## 共享样式

```tsx{3-4,7,22-23}
import { render, tag, Component, h, css } from 'omi'

// 定义共享样式
const style = css`p { color: green; }`

@tag('el-a')
class ElA extends Component {
  static css = [style]

  render() {
    return (
      <>
        <h3>ElA</h3>
        <p>I am green.</p>
      </>
    )
  }
}

@tag('el-b')
class ElB extends Component {
  // 可以覆盖和叠加共享样式
  static css = [style, 'h3 { color: red; }']

  render() {
    return (
      <>
        <h3>ElB</h3>
        <p>I am green.</p>
      </>
    )
  }
}
```

在这个例子中，我们定义了一个共享样式，使所有的 `<p>` 元素变为绿色。然后我们将这个样式应用到两个组件，ElA 和 ElB。在 ElB 中，我们还添加了另一个样式，使所有的 `<h3>` 元素变为红色，展示了如何覆盖和叠加共享样式。