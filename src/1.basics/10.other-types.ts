// 一、交叉类型，取类型的并集
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

// 方式一：函数增加返回值约束
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
      // 如果 s 是 never 类型永远不会执行 default 分支，说明上面分支被覆盖到，如果不是 never 类型说明上面有遗漏分支
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

// function getValues(obj: unknown, keys: string[]) {
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

// T extends U，泛型 T 必须是泛型 U 的子集

function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(key => obj[key])
}

console.log(getValues(obj, ['a', 'b']))
// console.log(getValues(obj, ['e', 'f'])) // 正常报错

// 五、映射类型
interface Obj2 {
  a: string
  b: number
  c: boolean
}

// 1、接口所有成员都变为只读
type ReadonlyObj = Readonly<Obj2>

// 实现原理
type ReadonlyCopy<T> = {
  // P 代表对象的一个属性
  // keyof T 所有属性的联合类型
  // T[p] P 属性的类型
  readonly [P in keyof T]: T[P]
}

// 2、接口所有属性都变为可选
type PartialObj = Partial<Obj2>

// 原理
type PartialCopy<T> = {
  [P in keyof T]?: T[P]
}

// 3、抽取子集
type PickObj = Pick<Obj2, 'a' | 'b'>

// 原理
type PickCopy<T, K extends keyof T> = {
  // K 必须是 T 所有属性组成联合类型的子集
  // P 必须在 K 中，且被在 T 中对应的真实类型约束
  [P in K]: T[P]
}

// 4、Record
type RecordObj = Record<'x' | 'y', Obj2>

// 原理
type RecordCopy<K extends keyof any, T> = {
  [P in K]: T;
};

// 六、条件类型
// T extends U ? X : Y
type TypeName<T> = T extends string ? 'string' :
  T extends number ? 'number' :
  T extends boolean ? 'boolean' :
  T extends undefined ? 'undefined' :
  T extends Function ? 'function' :
  'object'

type T1 = TypeName<string> // type T1 = "string"
type T2 = TypeName<string[]> // type T2 = "object"

// (A | B) extends U ? X : Y
// (A extends U ? X : Y) | (B extends U ? X : Y)

type T3 = TypeName<string | string[]> // type T3 = "string" | "object"

// Exclude
type Diff<T, U> = T extends U ? never : T

type T4 = Diff<'a' | 'b' | 'c', 'a' | 'e'>
// 拆解为 Diff<'a', 'a' | 'e'> | Diff<'b', 'a' | 'e'> | Diff<'c', 'a' | 'e'>
// never | 'b' | 'c' => 'b' | 'c'

// NonNullable
type NotNull<T> = Diff<T, undefined | null>
type T5 = NotNull<string | number | undefined | null> // type T5 = string | number

type T6 = Extract<'a' | 'b' | 'c', 'a' | 'e'> // type T6 = "a"

type T7 = ReturnType<() => string> // type T7 = string

// 原理，infer 代表延迟推断，如果传入函数的实际返回值类型存在就直接返回，否则返回 any 类型
type ReturnTypeCopy<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
