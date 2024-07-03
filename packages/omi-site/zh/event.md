# 事件 Event

## 事件绑定

```tsx
import { Component, h } from 'omi'

@tag('my-element')
class MyElement extends Component {
  onClick = (evt) => {
    alert('Hello Omi!')
  }

  render() {
    return (
      <h1 onClick={this.onClick}>Hello, world!</h1>
    )
  }
}
```

使用`bind`装饰器代替箭头函数自动绑定`this`：

```tsx {5}
import { Component, h, bind } from 'omi'

@tag('my-element')
class MyElement extends Component {
  @bind
  onClick(evt) {
    alert('Hello Omi!')
  }

  render() {
    return (
      <h1 onClick={this.onClick}>Hello, world!</h1>
    )
  }
}
```

## 自定义事件

```tsx
@tag('my-element')
class MyElement extends Component {
  onClick = (evt) => {
    this.fire('my-event', { name: 'abc' })
  }

  render(props) {
    return (
      <h1 onClick={this.onClick}>Hello, world!</h1>
    )
  }
}
```

然后在你的自定义元素上绑定事件：

```tsx
<my-element onMyEvent={(evt) => { alert(evt.detail.name) }}></my-element>
```

或者

```js
myElement.addEventListener('my-event', (evt) => {})
```

通过 `this.fire` 触发自定义事件，`fire` 第一个参数是事件名称，第二个参数是传递的数据。通过 `evt.detail` 可以获取到传递的数据。

## 事件分发

`fire`支持第三个参数，可以传递一个对象，用于配置事件的冒泡和穿透`shadowRoot`。

```tsx
@tag('my-element')
class MyElement extends Component {
  onClick = (evt) => {
    this.fire('my-event', { name: 'abc' },{
      bubbles: true,          // 是否冒泡
      composed: true          // 是否穿透 shadowRoot
    })
  }

  render(props) {
    return (
      <h1 onClick={this.onClick}>Hello, world!</h1>
    )
  }
}
``` 