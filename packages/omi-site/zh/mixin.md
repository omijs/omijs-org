# 混入 Mixin

## 用法

这是一个简单的 Omi 应用程序示例，展示了如何使用 mixin 函数将 mixin 对象添加到组件中。在这个例子中，我们创建了一个包含属性 a 的 mixin 对象，并将其添加到 MyApp 组件中。然后在组件的 render 方法中，我们可以通过 this.a 访问 mixin 中的属性 a。

代码示例：

```tsx
import { tag, Component, h, render, mixin } from 'omi'

mixin({ a: 1 })

@tag('my-app')
class MyApp extends Component {
  render() {
    // this.a is 1
    return <div>{this.a}</div>
  }
}

render(<my-app />, 'body')
```