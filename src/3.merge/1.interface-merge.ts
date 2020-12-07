// 接口之间的声明合并
interface SameNameInterface {
  x: number
  y: number
  // y: string // 报错
  foo (bar: number): number // 5
  foo (bar: 'a'): number // 2
}

interface SameNameInterface {
  y: number
  foo (bar: string): string // 3
  foo (bar: number[]): number[] // 4
  foo (bar: 'b'): number // 1
}

// 同名接口中必须非函数成员如果重名必须保证类型相同，函数成员在同名的不同接口中相当于函数重载的列表

// 重载列表的顺序确定：
// 1、拥有字符串字面量参数的函数会排在第一位
// 2、同一个接口中按照书写的顺序
// 3、不同接口中后面接口的排在前面，前面接口的排在后面

let intface: SameNameInterface = {
  x: 1,
  y: 1,
  foo (bar: any) {
    return bar
  }
}

// 二、命名空间的声明合并


