# 更新 Update

## 用法

`update` 方法是内置的重要核心方法，用于更新组件自身。比如:


```tsx
import { tag, Component, h, render } from 'omi'

@tag('hello-omi')
class HelloOmi extends Component {

  count = 0
  
  plus = () => {
    this.count++
    this.update()
  }
  
  render(props) {
    return (
      <>
        <span >{this.count}</span>
        <buttom onClick={this.plus}>+1</buttom>
      </>
    )
  }
}

render(<hello-omi msg='Omi' />, 'body')
```

强烈推荐使用信号，你就不用关注这个 API 了。

🎉 恭喜你入门了! 