---
title: OMI - Web Components Framework
---

# Lifecycle

## Usage

| Lifecycle method | When it gets called                          |
| ---------------- | -------------------------------------------- |
| `install`        | before the component gets mounted to the DOM |
| `installed`      | after the component gets mounted to the DOM  |
| `ready`      |  when the component's properties, events, etc. are prepared and ready to use. This typically occurs asynchronously after the installed lifecycle |
| `uninstall`      | prior to removal from the DOM                |
| `beforeUpdate`   | before update                           |
| `updated`    | after update                             |
| `beforeRender`   | before `render()`                           |
| `rendered`   |  after `render()`,the first parameter is the virtual DOM, which can be changed to change the rendering result    |
| `receiveProps`   | parent element re-render will trigger it, `return false` will prevent update action |

For example:

```tsx
import { render, Component, tag } from 'omi'

@tag('my-timer')
class MyTimer extends Component {
  data = {
    seconds: 0
  }

  tick() {
    this.data.seconds++
    this.update()
  }

  install() {
    this.interval = setInterval(() => this.tick(), 1000)
  }

  uninstall() {
    clearInterval(this.interval)
  }

  render() {
    return <div>Seconds: {this.data.seconds}</div>
  }
}

render(<my-timer />, 'body')
```

## Listening in Component Tags

```tsx
import { render, Component, tag } from 'omi'

@tag('my-element')
class MyElement extends Component {
  render() {
    return <div>el</div>
  }
}

@tag('my-app')
class MyElement extends Component {
  render() {
    return (
      <my-element
        onInstalled={
          (evt: CustomEvent) => {
            updateMenu(evt.detail)
          }}>
      </my-element>
    )
  }
}
render(<my-timer />, 'body')
```

Component users can listen to the lifecycle events of the component on the component tag, as in the example above, where the user can listen to the installed event of the component, and evt.detail is the component my-element itself.