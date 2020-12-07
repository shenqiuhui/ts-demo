// 类的实例属性必须包含初始值
// class Dog {
//   constructor(name: string) {
//     this.name = name
//   }
//   name: string
//   run() {}
// }

// console.log(Dog.prototype)

// let dog = new Dog('wangwang')
// console.log(dog)

// 类的继承
// class Husky extends Dog {
//   constructor(name: string, color: string) {
//     super(name)
//     this.color = color
//   }
//   color: string
// }

// 类的修饰符
class Dog {
  // 给 constructor 增加 private 修饰，既不能被实例化，也不能被继承
  // private constructor(name: string) {
  //   this.name = name
  // }
  // 给 constructor 增加 protected 修饰，不能被实例化，只能被继承
  // protected constructor(name: string) {
  //   this.name = name
  // }
  constructor(name: string) {
    this.name = name
  }
  public name: string
  private pri() {}
  protected run() {}
  readonly legs: number = 4
  static food: string = 'bones'
}

let dog = new Dog('wangwang')
// dog.pri() // 报错
// dog.run() // 报错
// dog.legs = 5 // 报错
console.log(Dog.food)
// console.log(dog.food) // 报错

class Husky extends Dog {
  // 在参数上声明修饰符可以省略属性的单独定义
  constructor(name: string, public color: string) {
    super(name)
    this.color = color
    // this.pri() // 报错
    // this.run() // 可以访问
  }
  // color: string
}

// 类的静态成员可以被继承
console.log(Husky.food)
