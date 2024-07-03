# CSS

## CSS Basic Capabilities

You can directly use a string to write styles for HTML, and it won't pollute the global styles:

```tsx{5-6}
import { Component, h } from 'omi'

@tag('my-element')
class MyElement extends Component {
  // Scoped CSS
  static css = 'h1 { color: red }' 

  render() {
    return (
      <h1>Hello, world!</h1>
    )
  }
}
```

Of course, you can import resource strings through Vite, so you can write your CSS in a CSS file.

```tsx{1,5-6}
import cssString from './xxx.css?raw'

@tag('my-element')
class MyElement extends Component {
  // Scoped CSS
  static css = cssString
  ...
  ...
```

## Sharing Styles

```tsx{3-4,7,22-23}
import { render, tag, Component, h, css } from 'omi'

// Define shared styles
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
  // Can override and stack shared styles
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

In this example, we define a shared style that makes all `<p>` elements green. We then apply this style to two components, ElA and ElB. In ElB, we also add another style that makes all `<h3>` elements red, demonstrating how shared styles can be overridden and stacked.