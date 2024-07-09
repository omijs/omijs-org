# 引用 Ref

## 用法

```tsx
@tag('my-element')
class MyElement extends Component {
  onClick = (evt) => {
    console.log(this.h1)
  }

  render(props) {
    return (
      <div>
        <h1 ref={e => { this.h1 = e }} onClick={this.onClick}>Hello, world!</h1>
      </div>
    )
  }
}
```

在元素上添加 `ref={e => { this.anyNameYouWant = e }}` ，然后你就可以 JS 代码里使用 `this.anyNameYouWant` 访问该元素。你可以使用两种方式来提高 update 的性能：

* 提前赋值
* createRef

## 提前赋值

```tsx
@tag('my-element')
class MyElement extends Component {
  onClick = (evt) => {
    console.log(this.h1)
  }

  myRef = e => { this.h1 = e }

  render(props) {
    return (
      <div>
        <h1 ref={this.myRef} onClick={this.onClick}>Hello, world!</h1>
      </div>
    )
  }
}
```

## createRef

你也可以使用 `createRef` 来得到更高的性能:

```tsx
@tag('my-element')
class MyElement extends Component {
  onClick = (evt) => {
    console.log(this.myRef.current)  //h1
  }

  myRef = createRef()

  render(props) {
    return (
      <div>
        <h1 ref={this.myRef} onClick={this.onClick}>Hello, world!</h1>
      </div>
    )
  }
}
```

## 转发Ref

`omi`在`7.6.10`版本前缺少类似`React`的`forwardRef`功能，如果要实现类型的功能，需要自行通过自行声明`props.ref`来层层传递，当在多级组件时非常麻烦，`7.6.11`开始增加了自动转发`ref`的特性。

## `7.6.10`版本前

```tsx
@tag("my-parent")
class Parent extends Component{
static props={
    ref: {
      type：Object
    }
 }
 render(props){
     return <my-child ref={props.ref}/>  //  需要转发ref
 }
}


@tag("my-child")
class Child extends Component{
static props={
    ref: {
      type：Object
    }
 }
 render(props){
     return <div ref={props.ref}/>
 }
}
 

@tag("my-app")
class MyApp extends Component{
ref=createRef()
render(){
    return <my-parent ref={this.ref}/>》
}
```

如果要暴露组件的内部的元素，需要自行通过自行声明`props.ref`来层层传递，当在多级嵌套组件时非常麻烦。


## `7.6.11`后

`7.6.11`开始增加了自动转发`ref`的特性，只需要在组件中声明`ref`属性，即可自动转发`ref`。
 


```ts
@tag("my-parent")
class Parent extends Component{
 render(props){
     return <my-child/>   // 不需要转发ref
 }
}


@tag("my-child")
class Child extends Parent { 
 render(props){
     return <div ref={this.ref}/>  // 通过this.ref可以得到父组件乃至祖先组件的传入的ref
  }
}


@tag("my-app")
class MyApp extends Component{
ref=createRef()
render(){
    return <my-parent ref={this.ref}/>》
}

```







