# Mixin

## Usage

This is a simple Omi application example that demonstrates how to use the mixin function to add a mixin object to a component. In this example, we create a mixin object containing the property a and add it to the MyApp component. Then, in the component's render method, we can access the property a from the mixin using this.a.

Code example:

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