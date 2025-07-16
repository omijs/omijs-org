# exportparts

`exportparts` is a global attribute that allows you to select and style elements that exist in nested [shadow trees](https://developer.mozilla.org/en-US/docs/Glossary/Shadow_tree) by exporting their `part` names.

## Overview

Shadow DOM is an isolated structure where identifiers, classes, and styles cannot be reached by selectors or queries belonging to the regular DOM. There are two HTML attributes that can be applied to shadow tree elements to enable external CSS styling to shadow trees: `part` and `exportparts`.

The global `part` attribute makes shadow tree elements visible to their parent DOM. The `part` name is used as a parameter for the `::part()` pseudo-element. Through this way, you can apply CSS styles from the outside to elements in the shadow tree. However, the `::part()` pseudo-element is only visible to the parent DOM. This means that when shadow trees are nested, parts are not visible to any ancestors except the direct parent. The `exportparts` attribute solves this limitation.

## Syntax

```html
<custom-element exportparts="part1, part2, part5"></custom-element>
```

Or using mapping syntax:

```html
<custom-element exportparts="part1:exposed1, part2:exposed2"></custom-element>
```

## Application in Omi

In the Omi framework, `exportparts` is particularly useful for building composable and styleable component libraries.

### Basic Component Example

First, let's create a card component:

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

Now we can style the parts of this component externally:

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

### Nested Components and exportparts

Now let's create a wrapper component that uses `exportparts` to expose the parts of the internal component:

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

Now we can style the parts of the internal `card-component` through `card-wrapper`:

```css
/* Style internal component parts directly through card-wrapper */
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

### Renaming Exported Parts

You can also rename parts when exporting them:

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

Then use the renamed part names:

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
