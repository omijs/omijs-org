
# Update

## Usage

`update` method is an important built-in core method for updating components themselves. For example:


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

We strongly recommend using signals, so you don't have to pay attention to this API.

🎉 Congratulations on getting started! 