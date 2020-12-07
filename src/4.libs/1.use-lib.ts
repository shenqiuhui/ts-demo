import $ from 'jquery'

// 报错，无法找到 jquery 的声明文件
// 非 TS 编写的类库必须为类库提供一个声明文件用来描述类库的 API
// 有的类库声明文件是和类库在一起的，有的需要安装声明文件包，通常为 @types/xxx
// https://www.typescriptlang.org/dt/search?search= 网站可以查询

$('.app').css('color', 'red')

// 全局模块用法
globalLib({x: 1})
globalLib.doSomething()
console.log(globalLib.version)

// commonjs 模块
import moduleLib from './3.module-lib'
moduleLib({x: 1})
moduleLib.doSomething()
console.log(moduleLib.version)

// umd 模块
import umdLib from './4.umd-lib'

// 也可以通过全局方式（script）引用，会提示警告，不建议全局引用，可通过 allowUmdGlobalAccess 选项设置

console.log(umdLib.version)
umdLib.doSomething()
