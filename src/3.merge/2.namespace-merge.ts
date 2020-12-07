// 一、命名空间的声明合并
namespace ShapeX {
  export function square(x: number) {
    return x * x
  }
}

namespace ShapeX {
  // 报错，命名空间中导出的变量不可以重复定义
  // export function square(x: number) {
  //   return x * x
  // }
}

// 二、命名空间和函数的合并
function Lib() {}
namespace Lib {
  export let version = '1.0'
}

// 相当于给函数增加了一个静态属性，函数声明必须在前
console.log(Lib.version)

// 三、命名空间和类的声明合并
class CC {}
namespace CC {
  export let state = 2
}

// 相当于给类增加了一个静态属性，类的声明必须在前
console.log(CC.state)

// 四、命名空间和枚举的声明合并
namespace Color {
  export function mix() {}
}

enum Color {
  Red,
  Yellow,
  Bule
}

// 相当于给枚举增加了一个方法，枚举可以先声明也可以后声明
console.log(Color)
