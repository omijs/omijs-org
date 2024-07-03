---
title: OMI - Web Components 框架
---

# OOP 和 DOP

## TodoApp 使用响应式函数

> 数据驱动编程

在数据驱动编程中，我们将重点放在数据本身和对数据的操作上，而不是数据所在的对象或数据结构。这种编程范式强调的是数据的变化和流动，以及如何响应这些变化。基于响应式函数的 TodoApp 就是一个很好的例子，它使用了响应式编程的概念，当数据（即待办事项列表）发生变化时，UI 会自动更新以反映这些变化。


```tsx
import { render, signal, computed, tag, Component, h } from 'omi'

const todos = signal([
  { text: 'Learn OMI', completed: true },
  { text: 'Learn Web Components', completed: false },
  { text: 'Learn JSX', completed: false },
  { text: 'Learn Signal', completed: false }
])

const completedCount = computed(() => {
  return todos.value.filter(todo => todo.completed).length
})

const newItem = signal('')

function addTodo() {
  todos.value = [...todos.value, { text: newItem.value, completed: false }]
  newItem.value = '' // Reset input value on add
}

function removeTodo(index: number) {
  todos.value.splice(index, 1)
  todos.value = [...todos.value]
}

@tag('todo-list')
class TodoList extends Component {
  onInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    newItem.value = target.value
  }

  render() {
    return (
      <>
        <input type="text" value={newItem.value} onInput={this.onInput} />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos.value.map((todo, index) => {
            return (
              <li>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onInput={() => {
                      todo.completed = !todo.completed
                      todos.value = [...todos.value]
                    }}
                  />
                  {todo.completed ? <s>{todo.text}</s> : todo.text}
                </label>
                {' '}
                <button onClick={() => removeTodo(index)}>❌</button>
              </li>
            )
          })}
        </ul>
        <p>Completed count: {completedCount.value}</p>
      </>
    )
  }
}

render(<todo-list />, document.body)
```


## TodoApp 使用信号类 Signal

> 面向对象编程

在面向对象编程中，我们将重点放在对象上，对象包含了数据和操作数据的方法。这种编程范式强调的是对象之间的交互和协作，以及如何通过对象的封装、继承和多态性来组织和管理代码。基于响应式函数的 TodoApp 也可以使用面向对象的方式来实现，例如，我们可以创建一个 TodoList 类，这个类包含了待办事项列表的数据和操作这些数据的方法，以及一个 `update` 方法来更新 UI。



```tsx
import { render, Signal, tag, Component, h, computed } from 'omi'

type Todo = { text: string, completed: boolean }

class TodoApp extends Signal<{ todos: Todo[], filter: string, newItem: string }> {
  completedCount: ReturnType<typeof computed>

  constructor(todos: Todo[] = []) {
    super({ todos, filter: 'all', newItem: '' })
    this.completedCount = computed(() => this.value.todos.filter(todo => todo.completed).length)
  }

  addTodo = () => {
    // api a
    this.value.todos.push({ text: this.value.newItem, completed: false })
    this.value.newItem = ''
    this.update()

    // api b, same as api a
    // this.update((value) => {
    //   value.todos.push({ text: value.newItem, completed: false })
    //   value.newItem = ''
    // })
  }

  toggleTodo = (index: number) => {
    const todo = this.value.todos[index]
    todo.completed = !todo.completed
    this.update()
  }

  removeTodo = (index: number) => {
    this.value.todos.splice(index, 1)
    this.update()
  }
}

const todoApp = new TodoApp([
  { text: 'Learn OMI', completed: true },
  { text: 'Learn Web Components', completed: false },
  { text: 'Learn JSX', completed: false },
  { text: 'Learn Signal', completed: false }
])

@tag('todo-list')
class TodoList extends Component {
  onInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    todoApp.value.newItem = target.value
  }

  render() {
    const { todos } = todoApp.value
    const { completedCount, toggleTodo, addTodo, removeTodo } = todoApp
    return (
      <>
        <input type="text" value={todoApp.value.newItem} onInput={this.onInput} />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos.map((todo, index) => {
            return (
              <li>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onInput={() => toggleTodo(index)}
                  />
                  {todo.completed ? <s>{todo.text}</s> : todo.text}
                </label>
                {' '}
                <button onClick={() => removeTodo(index)}>❌</button>
              </li>
            )
          })}
        </ul>
        <p>Completed count: {completedCount.value}</p>
      </>
    )
  }
}

render(<todo-list />, document.body)
```

这里不讨论哪种方式(DOP,OOP)的好坏，使用 omi 两种方式都可以任意选择。
