# 基础

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

`TypeScript` 能够在特定的区块中保证变量属于某种确定的类型，可以在此区块中放心的引用此类型的属性或者调用此类型的方法。

# 模块化

**target 配置项：要编译成的目标语言版本**

- `tsconfig` 中默认值 `es5`
- `tsc` 命令编译默认值 `es3`

**module 配置项：要编译成的模块化系统**

- `tsconfig` 中默认值 `commonjs`
- `tsc` 命令编译默认值 `commonjs`

兼容：`ESModule` 允许文件存在一个顶级的默认导出，和其他次级导出，`Commonjs` 只允许一个顶级导出，所以在模块代码编译转换是会进行兼容

- 如果导入导出都使用 `ESModule` 编译成 `Commonjs` 导出和调用都会默认加上 `default` 属性，对使用者来讲无感知
- 如果使用 `ESModule` 的方式导出，用非 `ESModule` 的方式导入，默认值就会有问题，比如需要手动调用 `default` 使用默认导入。

兼容性处理见 `src/2.modules/1.es6/d.ts` 和 `src/2.modules/2.node/c.node.ts`

# tsconfig 配置文件

## 文件相关

- `files`：编译器需要编译的文件列表
- `include`：编译文件夹下的文件
- `exclude`：排除的文件夹，默认会排除 `node_modules` 和所有的声明文件

```json
{
  "files": [
    "src/a.ts"
  ],
  "include": [
    "src/*"
  ],
  "exclude": [
    "src/lib"
  ]
}
```

**`files`、`include`、`exclude` 会组合共同起作用。**


- `extends`：继承其他配置文件的配置

```json
{
  "extends": "./tsconfig.base.json"
}
```

**配置文件中可以覆盖已继承的配置。**

## compilerOptions 编译相关

- `incremental`：增量编译，第一次编译后会生成编译信息的文件 `tsconfig.tsbuildinfo`，之后只做增量的编译，增加编译速度
- `tsBuildInfoFile`：自定义编译信息文件的存放位置
- `diagnostics`：打印编译的时间和信息

```json
{
  "incremental": true,
  "tsBuildInfoFile": "./buildFile",
  "diagnostics": true
}
```

- `target`：目标语言的版本，`es3`、`es5`、`es2015`、`ESNext`
- `module`：编译的模块化规范，`none`、`commonjs`、`amd`、`system`、`umd`、`es2015`、`es2020`、`ESNext`
- `outFile`：将多个相互依赖的文件生成一个文件，可用在 `AMD` 模块中

```json
{
  "compilerOptions": {
    "module": "amd",
    "outFile": "./app.js"
  }
}
```

- `lib`：需要导入的类库，和 `target` 配合使用，`target` 为 `es5`，默认导入 `dom`、`es5`、`scripthost`

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "es5", "scripthost"]
  }
}
```

- `allowJs`: 允许编译 `js`、 `jsx` 文件
- `checkJs`: 允许在 `jsx` 文件中报错，通常和 `allowJs` 一起使用
- `outDir`: 指定输出目录，防止编译后的 `js` 文件覆盖原文件
- `rootDir`: 指定输入目录，用于输出

```json
{
  "include": [
    "src"
  ],
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "outDir": "./out",
    "rootDir": "./src"
  }
}
```

- `declaration`: 生成声明文件
- `declarationDir`: 生成声明文件的路径
- `emitDeclarationOnly`: 只生成声明文件


```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./d",
    "emitDeclarationOnly": true
  }
}
```

- `sourceMap`: 生成目标文件的 `sourceMap`
- `inlineSourceMap`: 生成目标文件的 `inlineSourceMap`，会包含在生成的 `js` 文件之中
- `declarationMap`: 为声明文件生成 `sourceMap`

```json
{
  "compilerOptions": {
    "sourceMap": true,
  }
}
```

```json
{
  "compilerOptions": {
    "inlineSourceMap": true,
  }
}
```

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true
  }
}
```

- `typeRoots`: 声明文件目录，默认查找 `node_modules/@types`
- `types`: 指定要加载的声明文件包


```json
{
  "compilerOptions": {
    "typeRoots": [],
    "types": []
  }
}
```

- `removeComments`: 删除注释

```json
{
  "compilerOptions": {
    "removeComments": true
  }
}
```

- `onEmit`: 不输出任何文件，相当于什么也没有做
- `onEmitOnError`: 当发生错误的时候不输出任何文件
- `onEmitHelpers`: 不生成 `helper` 函数，减少代码编译后的体积，如类的继承代码，需要安装 `ts-helpers`，否则编译产出结果出现未定义函数
- `importHelpers`: 用于替换 `onEmitHelpers` 配置，通过 `tslib` 内置库引入 `helper` 函数，文件必须是模块

```json
{
  "compilerOptions": {
    "onEmit": true,
    "onEmitOnError": true,
    "onEmitHelpers": true,
    "importHelpers": true
  }
}
```

- `downlevelIteration`: 在 `es3/5` 中降级遍历器的实现，开启后使用 `helper` 函数实现

```json
{
  "compilerOptions": {
    "downlevelIteration": true
  }
}
```
