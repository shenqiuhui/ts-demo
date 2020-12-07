// 泛型函数
// function log<T>(value: T): T {
//   console.log(value)
//   return value
// }

// log<string>('a')
// log<string[]>(['a', 'b'])

// 类型推断
// log(['a', 'b'])

// 定义泛型类型
// type Log = <T>(value: T) => T
// let myLog: Log = log

// 定义泛型接口
// interface Log<T = string> {
//   (value: T): T
// }
// let mylog: Log<number> = log
// mylog(1)
// let mylog: Log = log
// mylog('a')

// 定义泛型类（不能约束静态成员）、
class Log<T> {
  run(value: T) {
    console.log(value)
    return value
  }
}

let log1 = new Log<number>()
log1.run(1)

// 不指定参数可以传入任意类型
let log2 = new Log()
log2.run(undefined)

// 泛型约束
interface Length {
  length: number
}

// 调用时传入的值必须含有 length 属性
function log<T extends Length>(value: T): T {
  console.log(value, value.length)
  return value
}

log([1])
log('123')
log({length: 1})

// 泛型总结：
// 1、函数和类可以轻松支持多种类型，增强程序的扩展性
// 2、不必写多条函数重载或冗长的联合类型声明，增强代码可读性
// 3、灵活控制类型之间的约束关系
