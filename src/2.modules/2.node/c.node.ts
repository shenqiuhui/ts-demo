let c1 = require('./a.node')
let c2 = require('./b.node')
let c3 = require('../es6/a')

// 兼容语法的两种导入方式
// import c4 = require('../es6/d')
import c4 from '../1.es6/d' // 需要 esModuleInterop 配置项开启（默认为开启状态）

console.log(c1)
console.log(c2)
console.log(c3)

// 调用默认导出
c3.default()

// 使用 default 方式调用比较麻烦
// 方案一：不同的模块系统不要混用
// 方案二：使用兼容语法，意味着模块中不能有其他的导出
c4()
