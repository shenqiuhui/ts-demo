interface Human {
  // new (name: string): void
  name: string;
  eat(): void;
}

// 接口只能约束类的公有成员，不能约束构造函数
class Asian implements Human {
  constructor(name: string) {
    this.name = name
  }
  // private name: string; // 报错
  name: string
  eat() {}
  sleep() {}
}

// 接口的继承
interface Man extends Human {
  run(): void
}

interface Child {
  cry(): void
}

interface Boy extends Man, Child {}

let boy: Boy = {
  name: '',
  run() {},
  eat() {},
  cry() {}
}

// 接口继承类（接口将类的成员都抽象出来，只有结构没有实现）
class Auto {
  state = 1
  private state2 = 0
}

interface AutoInterface extends Auto {}

// class C implements AutoInterface {
//   state = 1 // 报错，接口继承了类的所有属性（包含私有），由于 C 不是 Auto 的子类，所以不能继承私有成员
// }

class Bus extends Auto implements AutoInterface {}
