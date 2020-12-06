// 单独导出
export let a = 1

// 批量导出
let b = 2
let c = 3
export { b, c }

// 导出接口
export interface P {
  x: number
  y: number
}

// 导出函数
export function f() {}

// 导出函数起别名
function g() {}
export { g as G }

// 默认导出
export default function () {
  console.log('default function')
}

// 引入外部模块重新导出
export { str as hello } from './b'
