# Provide / Inject

跨域多个层级向下传递 props 有时非常麻烦，这个时候可以使用 provide 和 Inject 跨组件层级传递。

## Provide

```tsx
@tag('parent-el')
class ParentEl extends Component {

  provide = {
    name: 'omi'
  }

  render() {
    return <child-el></child-el>
  }
}
```

## Inject

不仅仅是子，在任意子孙曾孙节点都可以使用 inject 来消费祖先节点的注入。

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
