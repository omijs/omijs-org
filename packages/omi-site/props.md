# Props

## Usage

Transfer data to sub elements through props, such as:

```tsx
import { Component, define, render } from 'omi'

@tag('my-element')
class MyElement extends Component {
  render(props) {
    return (
      <h1>Hello, {props.name}!</h1>
    )
  }
}
```

Using element:

```tsx
<my-element name="world"></my-element>
```

You can also pass any type of data to props:

```tsx
@tag('my-element')
class MyElement extends Component {
  render(props) {
    return (
      <h1>Hello, {props.myObj.name}!</h1>
    )
  }
}
```

Using element:

```tsx
<my-element myObj={{ name: 'world' }}></my-element>
```

You can set the default value by the `static defaultProps` property，use `static propTypes` to set the type:

```tsx
@tag('my-element')
class MyElement extends Component {
  static defaultProps = {
    name: 'Omi',
    myAge: 18
  }

  // It's not mandatory to define propTypes. You only need to define them when you are writing components using Omi independently.
  static propTypes = {
    name: String,
    myAge: Number,
    // Also supports multiple types of attributes
    color: [String, Array]
  }
  
  render(props) {
    return (
      <h1>Hello, {props.name}! Age {props.myAge}</h1>
    )
  }
}
```

Special attention should be paid to adding `static propTypes` if your custom elements want to be used directly in other frameworks or without frameworks. For example, it can be used directly in the body:

```html
<body>
  <my-element name="dntzhang" my-age="20"></my-element>
</body>
```

## Merging Definitions

If you don't want to define them separately, you can merge them into the `static props` definition, which will also combine existing definitions.

```tsx
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
```

The TypeScript type definition for props is as follows:

```ts
type PropType = String | Number | Boolean | Array<any> | Object | Array<PropType>;

type Props =  {
  [key: string]: {
    type?: PropType;
    default?: any;
    reflect?: boolean | ((value: any) => any);
    changed?: (newValue: any, oldValue: any) => void;
  }
}
```