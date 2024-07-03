# 指令 Directive

## 用法

Omi 的 directive 能力允许你在组件中使用自定义指令，从而在运行时对 DOM 进行操作和处理。

下面是一个 Omi directive 的简单示例：

```tsx
import { tag, render, Component, registerDirective, h } from 'omi'

registerDirective('test', (el, exp) => {
  el.style.cssText = exp
})

@tag('my-app')
class MyApp extends Component {
  static css = `div {color: red;}`

  render() {
    return (
      <div o-test="color:blue;">Hello Omi!</div>
    )
  }
}

render(<my-app />, 'body')
```