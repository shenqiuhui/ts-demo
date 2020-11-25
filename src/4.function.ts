// let Add: (x: number, y: number) => number

// interface Add {
//   (x: number, y: number): number
// }

type Add = (x: number, y: number) => number

let add: Add = (a, b) => a + b

interface Lib {
  (): void
  version: string
  doSomething(): void
}


function getLib() {
  let lib: Lib = (() => {}) as Lib

  lib.version = '1.0.0'
  lib.doSomething = () => {}

  return lib
}

let lib1 = getLib()
lib1()
lib1.doSomething()

let lib2 = getLib()
lib2.version

// 函数定义方式
function add1 (x: number, y: number) {
  return x + y
}

let add2: (x: number, y: number) => number

type add3 = (x: number, y: number) => number

interface add4 {
  (x: number, y: number): number
}

// 参数要求
add1(1, 2)

// 可选参数
function add5(x: number, y?: number) {
  return y ? x + y : x
}

// 参数默认值
function add6(x: number, y = 0, z: number, q = 1) {
  return x + y + z + q
}

console.log(add6(1, undefined, 3))

// 剩余参数
function add7(x: number, ...rest: number[]) {
  return x + rest.reduce((pre, cur) => pre + cur)
}

console.log(add7(1, 2, 3, 4, 5))

// 函数重载（优先的应在重载列表的最前面）
function add8(...rest: number[]): number
function add8(...rest: string[]): string
function add8(...rest: any[]): any {
  let first = rest[0]
  if (typeof first === 'string') {
    return rest.join('')
  }

  if (typeof first === 'number') {
    return rest.reduce((pre, cur) => pre + cur)
  }
}

console.log(add8(1, 2, 3))
console.log(add8('1', '2', '3'))
