/// <reference path="./a.ts" />
// 引用 a 模块的同名命名空间

namespace ShapeH {
  // 不同文件中的同名命名空间的导出会合并
  export function square(x: number) {
    return x * x
  }
}

console.log(ShapeH.circle(1))
console.log(ShapeH.square(1))

// 需要全局环境，不能与模块化混用，tsc 编译后通过 script 标签引入

// 每次使用命名空间名称调用不够简洁，可以为命名的空间导出取别名
import circle = ShapeH.circle
import square = ShapeH.square

console.log(circle(1))
console.log(square(1))

// 模块话之下命名空间已经不长使用，保留命名空间是为了对全局变量时代的一种兼容
