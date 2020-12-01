// 一、交叉类型，去类型的并集
interface DogInterface {
  run(): void
}

interface CatInterface {
  jump(): void
}

let pet: DogInterface & CatInterface = {
  run() {},
  jump() {}
}

// 二、字面量类型
let zimianliang: 'a' | 'b' | 'c' = 'a'

// 三、联合类型
let lianhe: number | string = 'a'

// 对象的联合类型
class DogH implements DogInterface {
  run() {}
  eat() {}
}

class CatH implements CatInterface {
  jump() {}
  eat() {}
}

enum Master { Boy, Girl }

function getPet(master: Master) {
  // 被推断为 DogH 和 CatH 的联合类型，只能访问共有方法
  let pet = master === Master.Boy ? new DogH() : new CatH()
  pet.eat()
  // pet.run() // 报错
  // pet.jump() // 报错
  return pet
}

// 创建类型保护区块
interface Square {
  kind: 'square'
  size: number
}

interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}

interface Circle {
  kind: 'circle'
  r: number
}

// 满足联合类型和共有属性
// type Shape = Square | Rectangle
// function area(s: Shape) {
//   switch (s.kind) {
//     case 'square':
//       return s.size * s.size
//     case 'rectangle':
//       return s.height * s.width
//   }
// }

// 当新增类型没有保护区块时不会报错，如果需要约束有两种方式
type Shape = Square | Rectangle | Circle

// 方式一：函数返回值
// function area(s: Shape): number {
//   switch (s.kind) {
//     case 'square':
//       return s.size * s.size
//     case 'rectangle':
//       return s.height * s.width
//   }
// }

// 方式二：never 类型
function area(s: Shape) {
  switch (s.kind) {
    case 'square':
      return s.size * s.size
    case 'rectangle':
      return s.height * s.width
    default:
      // 如果 s 是 never 类型永远不会执行 default 分支，说明上面分支被覆盖到，如果不是 nerver 类型说明上面有遗漏分支
      // return ((e: never) => { throw new Error(e) })(s) // 报错
  }
}

area({kind: 'circle', r: 1})

// 四、索引类型
let obj = {
  a: 1,
  b: 2,
  c: 3
}

// function getValues(obj: any, keys: string[]) {
//   return keys.map(key => obj[key])
// }

// console.log(getValues(obj, ['a', 'b']))
// console.log(getValues(obj, ['e', 'f'])) // 不报错，会出现问题

// keyof T 表示类型 T 的所有公共属性的字面量的联合类型
interface Obj {
  a: number
  b: string
}

let key: keyof Obj // 等同于 let key: "a" | "b"

// T[K] 索引访问操作符，表示对象 T 的属性 K 所代表的的类型
let value: Obj['a'] // 等同于 let value: number

// T extends U，泛型可以通过继承某个约束获取某些属性

function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key])
}

console.log(getValues(obj, ['a', 'b']))
// console.log(getValues(obj, ['e', 'f'])) // 正常报错

// 五、映射类型

