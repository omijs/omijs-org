# 跨框架

## 定义跨框架组件


在 Vue 中使用 Omi component 例子如下:

![](https://omi.cdn-go.cn/s/latest/omi-vue.gif)

my-counter.tsx:

```tsx
import { tag, Component, h, bind } from 'omi'

@tag('my-counter')
class MyCounter extends Component {
  static props = {
    count: {
      type: Number,
      default: 0,
      changed(newValue, oldValue) {
        this.state.count = newValue
        this.update()
      }
    }
  }

  state = {
    count: null
  }

  install() {
    this.state.count = this.props.count
  }

  @bind
  sub() {
    this.state.count--
    this.update()
    this.fire('change', this.state.count)
  }

  @bind
  add() {
    this.state.count++
    this.update()
    this.fire('change', this.state.count)
  }

  render() {
    return (
      <>
        <button onClick={this.sub}>-</button>
        <span>{this.state.count}</span>
        <button onClick={this.add}>+</button>
      </>
    )
  }
}
```

## 在 Vue3 中使用

```vue
<script setup>
import { ref } from 'vue'
// import omi component
import './my-counter'

defineProps({
  msg: String,
})

const count = ref(0)

const change = (e) => {
  count.value = e.detail
}

</script>

<template>
  <h1>{{ msg }}</h1>

  <my-counter @change="change" :count="count" />
  <p>
    【Omi】 
  </p>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
     【Vue】 
    </p>
  </div>

</template>
```


## 在 React 中使用

```tsx
import { useState, useRef, useEffect } from 'react'
import useEventListener from '@use-it/event-listener'
import './my-counter'

function App() {
  const [count, setCount] = useState(100)
  const myCounterRef = useRef(null)

  useEffect(() => {
    const counter = myCounterRef.current
    if (counter) {
      const handleChange = (evt) => {
        setCount(evt.detail)
      }
      counter.addEventListener('change', handleChange)
      return () => {
        counter.removeEventListener('change', handleChange)
      }
    }
  }, [])

  return (
    <>
      <h1>Omi + React</h1>
      <my-counter count={count} ref={myCounterRef}></my-counter>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
```

## 不使用 TypeScript and JSX


```tsx
import { define, Component, h } from 'omi'

define('my-counter', class extends Component {

  static props = {
    count: {
      type: Number,
      default: 0,
      changed(newValue, oldValue) {
        this.state.count = newValue
        this.update()
      }
    }
  }

  state = {
    count: null
  }

  install() {
    this.state.count = this.props.count
  }

  sub = () => {
    this.state.count--
    this.update()
    this.fire('change', this.state.count)
  }

  add = () => {
    this.state.count++
    this.update()
    this.fire('change', this.state.count)
  }

  render() {
    return [
      h('button', { onClick: this.sub }, '-'),
      h('span', null, this.state.count),
      h('button', { onClick: this.add }, '+')
    ]
  }
})
```