# Event

## Event Binding

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

Using the `bind` decorator instead of the arrow function to automatically bind `this`:

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

## Custom Event

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

Then bind events on your custom elements:

```tsx
<my-element onMyEvent={(evt) => { alert(evt.detail.name) }}></my-element>
```

or:

```js
myElement.addEventListener('my-event', (evt) => {})
```

Fire triggers a custom event by `this.fire`. The first parameter of fire is the name of the event, and the second parameter is the data passed. The transmitted data can be obtained by `evt.detail'.
