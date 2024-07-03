# Reactivity

## Deep Dive into Reactive Signals

In this tutorial, we will learn how to build a simple reactive system using the code above. We will introduce the concepts of signal, computed, and effect, and how to use them to build reactive applications.

Understanding signal
A signal is an object that wraps a value. A signal is an object with a .value property that holds a value accessed via .value. It has an important characteristic: the value of the signal can change, but the signal itself always remains constant. It allows you to observe and modify this value. When the value changes, it notifies all functions that depend on this value. We can use the signal function to create a signal object.

```tsx
const counter = signal(0);
```
The above code creates a signal object with an initial value of 0. We can use the value property to access and modify the value of the signal.

```tsx
console.log(counter.value); // Outputs 0
```

## Creating Computed Properties with computed

A computed is a Signal that is calculated based on other signal values. When the value of the dependent signal changes, the value of the computed signal will automatically update.

We can use the computed function to create a computed Signal.

```tsx
const counter = signal(0);
const doubledCounter = computed(() => counter.value * 2);

console.log(doubledCounter.value); // Outputs 0

counter.value = 1;
console.log(doubledCounter.value); // Outputs 2
```

The above code creates a computed Signal named doubledCounter, whose value is always twice the value of counter.

## Using peek to Sneak Peek at signal Values

```tsx
const name = signal('Dnt')
const surname = signal('Zhang')
const fullName = computed(() => name.peek() + ' ' + surname.value)

let effectTimes = 0
effect(() => {
  // Accessing fullName.value will trigger dependency
  fullName.value
  effectTimes++
})

name.value = 'John'
// Because peek does not trigger dependency, effectTimes is still 1
expect(effectTimes).toBe(1)
```

### Using effect to Track Dependencies

Effect is a feature that allows us to track changes in signal values within a function. When we access a signal's value in an effect function, the function will automatically track changes in this value. When the signal value changes, the Effect function will rerun.

We can use the effect function to create an Effect.

```tsx
const counter = signal(0)

const dispose = effect(() => {
  console.log(`Counter:${counter.value}`)
})

// Stop tracking dependencies
dispose()
```

The above code will output the new value when the counter value changes. For example, when we change the counter value to 1, the Effect function will output "Counter: 1".

## Using update to Trigger effect

```tsx
const testSignal = signal([1,2,3])
let effectTimes = 0
effect(() => {
  console.log(testSignal.value)
  effectTimes++
})
testSignal.value.push(4)
// Like testSignal.value = testSignal.value, it will trigger effect
testSignal.update()
expect(effectTimes).toBe(2)
```

## Conclusion

In this tutorial, we learned how to build a reactive system using signal, computed, and effect. We understood how to create signal objects, how to use effect functions to track dependencies, how to create computed properties with computed, and how to use batch for batch updates.

Now, you have understood how to use these basic concepts to build reactive applications. Try to use this knowledge to create your own reactive system, and continue to learn and practice to improve your skills.