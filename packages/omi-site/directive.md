# Directive

## Usage

Omi's directive capabilities allow you to use custom directives in your DOM, enabling you to manipulate and process the DOM at runtime. 

Here's a simple example of an Omi directive:

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