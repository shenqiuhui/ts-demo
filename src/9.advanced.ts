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