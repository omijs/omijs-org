---
title: OMI - Web Components Framework
---

# Introduction

## What's Omi ？

Omi (pronounced /ˈomɪ/) is web components framework base JSX and signal.

<em> Omi looks really neat!<br> </em>
　　　　— [Jason Miller (Creator of Preact)](https://twitter.com/_developit/)

<em> I really like the trend towards "frameworks" that:<br><br>`class Component extends HTMLElement {..}`<br> <br>This one, Omi, is from Tencent.</em>       
　　　　— [Dion Almaer](https://twitter.com/dalmaer/)

## Add Omi in One Minute

### Install 

```bash
npm i omi
```


### Usage

```tsx {1,3-11,13-26,28}
import { render, signal, tag, Component, h } from 'omi'

const count = signal(0)

function add() {
  count.value++
}

function sub() {
  count.value--
}

@tag('counter-demo')
class CounterDemo extends Component {
  static css = 'span { color: red; }'

  render() {
    return (
      <>
        <button onClick={sub}>-</button>
        <span>{count.value}</span>
        <button onClick={add}>+</button>
      </>
    )
  }
}

render(<counter-demo />, document.body)
```

This code is a simple counter application created using the Omi framework.

* First, we import several functions and classes from the 'omi' module, including render, signal, tag, Component, and h.
* Then, we create a signal named count and initialize it to 0. Signals are a type of reactive data source in Omi. When the value of a signal changes, all components that use this signal will be **re-rendered**. Next, we define two functions add and sub, which are used to increase and decrease the value of count, respectively.
* Then, we define a component named CounterDemo. This component uses the @tag decorator to specify its HTML tag name as 'counter-demo'. This component has a static property css for defining **scoped styles**, and a render method for defining the content of the component.
* Finally, we use the render function to render the CounterDemo component to document.body.

Getting started, Congratulations!

## Using OMI CLI

To quickly create an Omi + Vite + TS/JS project:

```bash
$ npx omi-cli init my-app    # or create js project by: npx omi-cli init-js my-app
$ cd my-app           
$ npm start           # develop
$ npm run build       # release
```

To quickly create an Omi + **Router** + **Signal** + **Suspense** + **Tailwindcss** + Vite + TS project:

```bash
$ npx omi-cli init-spa my-app  
$ cd my-app           
$ npm start           # develop
$ npm run build       # release
```
