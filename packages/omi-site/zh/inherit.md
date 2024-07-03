# 组件继承 - Inherit

`omi`支持组件继承。这意味着您可以创建一个新组件，该组件继承自另一个组件。这使得您可以重用现有组件的功能，并在其基础上添加新功能。

```tsx

    class Animal extends Component { 
      static props = {
        name: String    
      }
      renderHead(){
        return <>head</>
      }
      renderLimbs(){
        return <>limbs</>
      }
      renderBody(){
        return <>body</>
      }
      render() {
        return (
          <div>{this.renderHead()}{this.renderLimbs()}{this.renderBody()}</div>
        )
      }
    } 
    @tag("my-dog")
    class Dog extends Animal { 
      renderHead(){
        return <>
          {super.renderHead()}🐶 
          </>
      }
      renderLimbs(){
        return <>
        {super.renderLimbs()}🐶 
        </>
      }
      renderBody(){
        return <>
        {super.renderBody()}🐶 
        </>
      }
      render() {
        return <><div>{super.render()}</div>
        </>
      }
    }
```