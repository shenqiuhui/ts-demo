// 数字枚举
// enum Role {
//   Reporter,
//   Developer,
//   Maintainer,
//   Owner,
//   Guest
// }

// 字符串枚举
// enum Answer {
//   Success = 'success',
//   Fail = 'fail'
// }

// Role.Reporter = 1 // 只读类型，定义后不可以修改

// 异构枚举，不建议
// enum Answer {
//   N,
//   Y = 'Yes'
// }

// 枚举成员
enum Char {
  // const 常量枚举
  a,
  b = Char.a,
  c = 1 + 2,

  // computed 计算枚举
  d = Math.random(),
  e = '123'.length,

  // computed 后面的枚举必须含有初始值
}

const enum Month {
  Jan,
  Feb,
  Mar
}

let month = [Month.Jan, Month.Feb, Month.Mar]

// 枚举类型
enum E { a, b }
enum F { a = 1, b = 2 }
enum G { a = 'a', b = 'b' }

let e: E = 3
let f: F = 3

// e === f // 报错

let e1: E.a = 2
let e2: E.b

// e1 === e2 // 报错

let e3: E.a = 1
e1 === e3

let g1: G = G.a
let g2: G.a = G.a

