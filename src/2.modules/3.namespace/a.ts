namespace ShapeH {
  // 命名空间中声明的变量只在命名空间中可见
  const pi = Math.PI

  // 全局可见需使用 export 导出
  export function circle(r: number) {
    return pi * r ** 2
  }
}
