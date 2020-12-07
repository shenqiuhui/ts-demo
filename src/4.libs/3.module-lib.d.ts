declare function moduleLib(options: Options): void

// 模块中，接口不会向外暴露
interface Options {
  [key: string]: any
}

declare namespace moduleLib {
  // export 写不写都可以
  export const version: string
  function doSomething(): void
}

// 兼容 esmodule 和 commonjs
export = moduleLib
