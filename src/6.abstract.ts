abstract class Animal {
  eat() {
    console.log('eat')
  }
  // 抽象类中的抽象方法，子类中可以有不同的实现
  abstract sleep(): void
}

// 抽象类无法被实例化
// let animal = new Animal() // 报错

class Cat extends Animal {
  constructor(public name: string) {
    super()
    this.name = name
  }
  sleep() {
    console.log('cat sleep')
  }
}

let cat = new Cat('miaomiao')
cat.eat()

class Bird extends Animal {
  constructor(public name: string) {
    super()
    this.name = name
  }
  sleep() {
    console.log('bird sleep')
  }
}

let bird = new Bird('niao')

// 实现多态
let animals: Animal[] = [cat, bird]
animals.forEach(i => {
  i.sleep() // 不同的实例调用 sleep 不同的实现
})

// this 链式调用
class WorkFlow {
  sleep1() {
    return this;
  }
  sleep2() {
    return this;
  }
}

new WorkFlow().sleep1().sleep2()

class MyFlow extends WorkFlow {
  next() {
    return this
  }
}

// this 的多态，既可以是自己的 this，也可以是父类的 this
new MyFlow().next().sleep2()
