declare function globalLib(options: globalLib.Options): void

// 应用函数和命名空间的声明合并
declare namespace globalLib {
  const version: string;
  function doSomething(): void

  // 可以放在命名空间内部或外部，外部则该接口会对全局生效
  interface Options {
    [key: string]: any
  }
}
