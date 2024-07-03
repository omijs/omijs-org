
# Provide / Inject

It is sometimes very troublesome to pass props down across multiple levels. At this time, you can use provide and inject to pass props across component levels.

## Provide

```tsx
@tag('parent-el')
class MyElement extends Component {

  provide = {
    name: 'omi'
  }

  render() {
    return <child-el></child-el>
  }
}
```

## Inject

Not just children, can be injected into all descendant elements.

```tsx
@tag('child-el')
class MyElement extends Component {

  inject = ['name']

  render() {
    //output: <div>omi</div>
    return <div>{this.injection.name}</div>
  }
}
```
