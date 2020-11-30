// 一、类型推断
let a // 自动推断为 any 类型
let a1 = 1 // 自动推断为数值类型
let a2 = [] // 自动推断为 any[]
let a3 = [1] // 自动推断为 number[]
let a4 = (x = 1) => x + 1 // 设置默认参数的时候，参数和返回值都被推断为 number

window.onkeydown = (event: KeyboardEvent) => {
  console.log(event)
}

// 类型断言（改造旧代码会比较有效，不能滥用，会带来安全隐患）
interface Foo {
  bar: number
}

// let foo = {} as Foo
// foo.bar = 1

let foo: Foo = {
  bar: 1
}

// 二、类型兼容
// 接口的兼容性
interface X {
  a: any
  b: any
}

interface Y {
  a: any
  b: any
  c: any
}

let x: X = {a: 1, b: 2}
let y: Y = {a: 1, b: 2, c: 3}

// X 兼容 Y，Y 不兼容 X，成员少的兼容成员多的
// x = y
// y = x // 报错

// 函数的兼容性
type Handler = (a: number, b: number) => void
function hof(handler: Handler) {
  return handler
}

// (1)参数个数，目标函数个数多于源函数个数
let handler1 = (a: number) => {}
hof(handler1)
let handler2 = (a: number, b: number, c: number) => {}
// hof(handler2) // 报错

// 固定参数可以兼容可选参数和剩余参数，可选参数不兼容剩余参数和固定参数
let hof1 = (a: number, b: number) => {}
let hof2 = (a?: number, b?: number) => {}
let hof3 = (...args: number[]) => {}

hof1 = hof2
hof1 = hof3
hof3 = hof1
hof3 = hof2
// 报错，关闭 strictFunctionTypes 选项可以实现兼容
// hof2 = hof1
// hof2 = hof3

// (2)参数类型
let handler3 = (a: string) => {}
// hof(handler3) // 报错，类型不兼容

interface Point3D {
  x: number
  y: number
  z: number
}

interface Point2D {
  x: number
  y: number
}

let p3d = (point: Point3D) => {}
let p2d = (point: Point2D) => {}

// 成员个数多的兼容成员个数少的，把接口成员看做函数参数则结论一致
// p3d = p2d
// p2d = p3d // 报错
// 函数互相赋值叫做函数参数的双向协变

// (3)返回值类型兼容
// 目标函数的返回值类型必须与源函数的返回值类型相同或者为其子类型
let ff = () => ({name: 'Alice'})
let gg = () => ({name: 'Alice', location: 'Beijing'})

// ff = gg
// gg = ff // 报错

// 重载兼容（列表中的函数时目标函数，实现函数为源函数）
function overload(a: number, b: number): number
function overload(a: string, b: string): string
function overload(a: any, b: any): any {}

// 枚举兼容性
// 数值枚举和 number 完全相互兼容
enum Enum1 { Apple, Banana }
enum Enum2 { Red, Yellow }
let fruit: Enum1.Apple = 1
let no: number = Enum2.Yellow

// 不同枚举之间完全不兼容
// let color: Enum2.Red = Enum1.Apple // 报错

// 类的兼容性，与接口兼容性比较类似，差别是静态成员和构造函数是不参与比较的
class A {
  constructor(p: number, q: number) {}
  id: number = 1
  private age: string = ''
  // name: string = ''
}

class B {
  static s = 1
  constructor(p: number) {}
  id: number = 2
}

let aa = new A(1, 2)
let bb = new B(1)

// aa = bb // 报错，包含私有成员只有子类可以兼容
// bb = aa // 少兼容多

class C extends A {}

let cc = new C(1, 2)

cc = aa
aa = cc

// 泛型的兼容性
interface Empty<T> {
  value: T
}
let obj1: Empty<number> = { value: 1 }
let obj2: Empty<string> = { value: '1' }

// 泛型被使用时不兼容
// obj1 = obj2
// obj2 = obj1

let logger1 = <T>(x: T): T => {
  console.log('x')
  return x
}

let logger2 = <U>(y: U): U => {
  console.log('y')
  return y
}

// 如果两个泛型函数的定义相同，没有指定任何参数，可以相互兼容
logger1 = logger2
logger2 = logger1

// 三、类型保护
enum Type { Strong, Week }

class Java {
  helloJava() {
    console.log('Hello Java')
  }
  java: any
}

class JavaScript {
  helloJavaScript() {
    console.log('Hello JavaScript')
  }
  javascript: any
}

function getLanguage(type: Type, x: string | number) {
  let lang = type === Type.Strong ? new Java() : new JavaScript()
  // 多处断言不可取，应使用类型保护
  // if ((lang as Java).helloJava) {
  //   (lang as Java).helloJava()
  // } else {
  //   (lang as JavaScript).helloJavaScript()
  // }

  // 类型保护
  // 1、intanceof
  // if (lang instanceof Java) {
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript()
  // }

  // 2、in
  // if ('java' in lang) {
  //   lang.helloJava()
  // } else {
  //   lang.helloJavaScript()
  // }

  // 3、typeof
  // if (typeof x === 'string') {
  //   x.length
  // } else {
  //   x.toFixed()
  // }

  if (isJava(lang)) {
    lang.helloJava()
  } else {
    lang.helloJavaScript()
  }

  return lang
}

// 4、is 类型谓词
function isJava(lang: Java | JavaScript): lang is Java {
  return (lang as Java).helloJava !== undefined
}

getLanguage(Type.Strong, 1)
