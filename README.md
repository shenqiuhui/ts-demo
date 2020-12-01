**类型检查机制：**

`TypeScript` 编译器在做类型检查时，所秉承一些原则，以及表现出的一些行为。

作用：辅助开发，提高开发效率。

- 类型推断
- 类型兼容性
- 类型保护

**类型推断：**

不需要指定变量的类型（函数返回值类型），`TypeScript` 可以根据某些规则自动的为其推断出一个类型。

- 基础类型推断
- 最佳通用类型推断
- 上下文类型推断

**类型的兼容性：**

当一个类型 Y 可以赋值给另一个类型 X 时，我们就可以说类型 X 兼容类型 Y。

X 兼容 Y：X（目标类型）= Y（源类型）

规则：

- 结构之间兼容：成员少的兼容成员多的
- 函数之间兼容：参数多的兼容参数少的

**类型保护：**

`TypeScript` 能够在特定的区块中保证变量属于某中确定的类型，可以在此区块中放心的引用此类型的属性或者调用此类型的方法。
