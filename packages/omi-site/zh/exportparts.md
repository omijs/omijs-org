# exportparts

`exportparts` 是一个全局属性，允许你选择和样式化存在于嵌套 [shadow trees](https://developer.mozilla.org/zh-CN/docs/Glossary/Shadow_tree) 中的元素，通过导出它们的 `part` 名称。

## 概述

Shadow DOM 是一个独立的结构，其中的标识符、类和样式无法被属于常规 DOM 的选择器或查询触及。有两个 HTML 属性可以应用于 shadow tree 元素，使得能够从外部定位 CSS 样式到 shadow tree：`part` 和 `exportparts`。

全局 `part` 属性使 shadow tree 元素对其父 DOM 可见。`part` 名称被用作 `::part()` 伪元素的参数。通过这种方式，你可以从外部对 shadow tree 中的元素应用 CSS 样式。然而，`::part()` 伪元素只对父 DOM 可见。这意味着当 shadow tree 嵌套时，part 对除了直接父级之外的任何祖先都不可见。`exportparts` 属性解决了这个限制。

## 语法

```html
<custom-element exportparts="part1, part2, part5"></custom-element>
```

或者使用映射语法：

```html
<custom-element exportparts="part1:exposed1, part2:exposed2"></custom-element>
```

## 在 Omi 中的应用

在 Omi 框架中，`exportparts` 特别有用于构建可组合和可样式化的组件库。

### 基础组件示例

首先，让我们创建一个卡片组件：

```javascript
import { tag, Component, render } from 'omi'

@tag('card-component')
class CardComponent extends Component {
  static css = `
    :host {
      display: block;
      border: 1px solid #ccc;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .base {
      background: white;
    }
    
    .header {
      background: #f5f5f5;
      padding: 16px;
      font-weight: bold;
    }
    
    .body {
      padding: 16px;
    }
    
    .footer {
      background: #f5f5f5;
      padding: 12px 16px;
      font-size: 14px;
      color: #666;
    }
  `

  render() {
    return (
      <div class="base" part="base">
        <div class="header" part="header">
          <slot name="header"></slot>
        </div>
        <div class="body" part="body">
          <slot name="body"></slot>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    )
  }
}
```

现在我们可以在外部样式化这个组件的 parts：

```css
card-component::part(header) {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  color: white;
}

card-component::part(body) {
  font-size: 16px;
  line-height: 1.6;
}

card-component::part(footer) {
  text-align: right;
  font-style: italic;
}
```

### 嵌套组件和 exportparts

现在让我们创建一个包装器组件，它使用 `exportparts` 来暴露内部组件的 parts：

```javascript
@tag('card-wrapper')
class CardWrapper extends Component {
  static css = `
    :host {
      display: block;
      margin: 20px 0;
    }
    
    .wrapper {
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      overflow: hidden;
    }
  `

  render() {
    return (
      <div class="wrapper">
        <card-component exportparts="base, header, body, footer">
          <slot name="card-header" slot="header"></slot>
          <slot name="card-body" slot="body"></slot>
          <slot name="card-footer" slot="footer"></slot>
        </card-component>
      </div>
    )
  }
}
```

现在我们可以通过 `card-wrapper` 来样式化内部的 `card-component` 的 parts：

```css
/* 直接通过 card-wrapper 样式化内部组件的 parts */
card-wrapper::part(header) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
}

card-wrapper::part(body) {
  background: #fafafa;
  color: #333;
}
```

### 重命名导出的 Parts

你也可以在导出时重命名 parts：

```javascript
@tag('advanced-card-wrapper')
class AdvancedCardWrapper extends Component {
  render() {
    return (
      <div class="container">
        <card-component 
          exportparts="
            base:card-container,
            header:card-title,
            body:card-content,
            footer:card-actions
          ">
          <slot name="title" slot="header"></slot>
          <slot name="content" slot="body"></slot>
          <slot name="actions" slot="footer"></slot>
        </card-component>
      </div>
    )
  }
}
```

然后使用重命名的 part 名称：

```css
advanced-card-wrapper::part(card-title) {
  background: #4CAF50;
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

advanced-card-wrapper::part(card-content) {
  padding: 24px;
  font-family: 'Georgia', serif;
}

advanced-card-wrapper::part(card-actions) {
  background: #f8f9fa;
  text-align: right;
}
```



