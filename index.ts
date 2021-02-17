import { benchmark, Measurement } from 'kelonio'

type Node<T> = {
  value: T,
  next: Node<T> | null
}

interface Stack<T> {
  push(v: T): void,
  pop(): T | null
}

class LinkedListStack<T> implements Stack<T> {
  private firstNode: Node<T> | null = null
  
  constructor() {}

  public push(value: T): void {
    if(this.firstNode === null) {
      this.firstNode = { next: null, value }
      return 
    }
    this.firstNode = { next: this.firstNode, value } 
  }

  public pop(): T | null {
    const node = this.firstNode

    if(node === null) {
      return null
    }

    this.firstNode = node.next

    return node.value
  }

  static fromArray<T>(arr: ReadonlyArray<T>): LinkedListStack<T> {
    const stack = new LinkedListStack<T>()
    for(const a of arr) {
      stack.push(a)
    }
    return stack
  }
}

class ArrayStack<T> implements Stack<T> {
  private state: Array<T> = []

  constructor() {}

  public push(v: T): void {
    this.state.push(v)
  }
  
  public pop(): T | null {
    const v = this.state.pop()

    if(v === undefined) {
      return null
    }
    
    return v
  }

  static fromArray<T>(arr: ReadonlyArray<T>): ArrayStack<T> {
    const stack = new ArrayStack<T>()
    for(const a of arr) {
      stack.push(a)
    }
    return stack
  }
}

const onSuccess = (v: Measurement) => {
  console.log(`Mean: ${v.mean}`)
}

benchmark.record(["LinkedListStack", "Small"], () => {
  const stack = new LinkedListStack()
  stack.push(100)
  stack.pop()
}).then(onSuccess)

benchmark.record(["ArrayStack", "Small"], () => {
  const stack = new ArrayStack()
  stack.push(100)
  stack.pop()
}).then(onSuccess)

const bigLinkedListStack = LinkedListStack.fromArray(new Array(100000).fill(0))
const bigArrayStack = ArrayStack.fromArray(new Array(100000).fill(0))

benchmark.record(["LinkedListStack", "Big"], () => {
  bigLinkedListStack.push(1000)
  bigLinkedListStack.pop()
}).then(onSuccess)

benchmark.record(["ArrayStack", "Big"], () => {
  bigArrayStack.push(1000)
  bigArrayStack.pop()
}).then(onSuccess)

