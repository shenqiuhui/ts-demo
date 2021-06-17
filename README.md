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

## 编译相关

- `incremental`：增量编译，第一次编译后会生成编译信息的文件 `tsconfig.tsbuildinfo`，之后只做增量的编译，增加编译速度
- `tsBuildInfoFile`：自定义编译信息文件的存放位置
- `diagnostics`：打印编译的时间和信息

```json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": "./buildFile",
    "diagnostics": true
  }
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

- `strict`: 开启所有严格的类型检查，开启后其他严格检查类型的选项默认都为 `true`
- `alwaysStrict`: 默认在代码中注入 `use strict` 严格检查声明
- `noImplicitAny`: 不允许隐式的 `any` 类型
- `strictNullChecks`: 不允许把 `null` 和 `undefined` 赋值给其他类型的变量
- `strictFunctionTypes`: 不允许函数参数的双向协变
- `strictPropertyInitialization`: 保证累的实例必须要初始化
- `strictBindCallApply`: 保证执行严格的 `bind/call/apply` 检查
- `noImplicitThis`: 不允许 `this` 有隐式的 `any` 类型

```json
{
  "compilerOptions": {
    "strict": true,
    "alwaysStrict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "strictBindCallApply": true,
    "noImplicitThis": true
  }
}
```

- `noUnusedLocals`: 不允许出现之生命不使用的变量
- `noUnusedParameters`: 检查函数中没有使用的参数
- `noFallthroughCasesInSwitch`: 防止 `switch` 语句贯穿，即不允许分支不存在 `break` 或 `return`
- `noImplicitReturns`: 保证程序的每一个分支都要有返回值

```json
{
  "compilerOptions": {
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true
  }
}
```

- `esModuleInterop`: 允许使用 `export=` 的方式导出，由 `import from` 引入
- `allowUmdGlobalAccess`: 允许使用全局变量的方式访问一个 `UMD` 模块
- `moduleResolution`: 模块解析策略 `classic` 和 `node`

```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "allowUmdGlobalAccess": true,
    "moduleResolution": true
  }
}
```

**classic**

相对导入：

```js
import { b } from './moduleB';

// /root/src/moduleB.ts
// /root/src/moduleB.d.ts
```

绝对导入：

```js
import { b } from 'moduleB';

// /root/src/node_modules/moduleB.ts
// /root/src/node_modules/moduleB.d.ts

// /root/node_modules/moduleB.ts
// /root/node_modules/moduleB.d.ts

// /node_modules/moduleB.ts
// /node_modules/moduleB.d.ts
```

**node**

相对导入：

```js
import { b } from './moduleB';

// /root/src/moduleB.ts
// /root/src/moduleB.tsx
// /root/src/moduleB.d.ts
// /root/src/moduleB/package.json （types 属性）
// /root/src/moduleB/index.ts
// /root/src/moduleB/index.tsx
// /root/src/moduleB/index.d.ts
```

绝对导入：

```js
import { b } from 'moduleB';

// /root/src/node_modules/moduleB.ts
// /root/src/node_modules/moduleB.tsx
// /root/src/node_modules/moduleB.d.ts
// /root/src/node_modules/moduleB/package.json （types 属性）
// /root/src/node_modules/moduleB/index.ts
// /root/src/node_modules/moduleB/index.tsx
// /root/src/node_modules/moduleB/index.d.ts

// /root/node_modules/moduleB.ts
// /root/node_modules/moduleB.tsx
// /root/node_modules/moduleB.d.ts
// /root/node_modules/moduleB/package.json （types 属性）
// /root/node_modules/moduleB/index.ts
// /root/node_modules/moduleB/index.tsx
// /root/node_modules/moduleB/index.d.ts

// /node_modules/moduleB.ts
// /node_modules/moduleB.tsx
// /node_modules/moduleB.d.ts
// /node_modules/moduleB/package.json （types 属性）
// /node_modules/moduleB/index.ts
// /node_modules/moduleB/index.tsx
// /node_modules/moduleB/index.d.ts
```

- `baseUrl`: 解析非相对导入模块的基地址，默认 `./`，即为当前目录
- `paths`: 路径映射，相对于 `baseUrl`
- `rootDirs`: 将多个目录放在一个虚拟目录，可以按照虚拟目录的引用关系进行引入，用于运行时

```json
{
  "compilerOptions": {
    "paths": {
      "jquery": ["node_modules/jquery/dist/jquery.slim.min.js"]
    },
    "rootDirs": ["src", "out"]
  }
}
```

- `listEmittedFiles`: 打印输出文件
- `listFiles`: 打印输出文件，包含引用的声明文件

```json
{
  "compilerOptions": {
    "listEmittedFiles": true,
    "listFiles": true
  }
}
```

## 工程引用

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

使用场景：假如服务端和客户端的代码在一个工程中，想要剔除 `src` 目录层级，并且不想把测试用例构建在产出目录中，或者想要单独构建某一部分应用，则通过上面这样的单个配置文件无法解决。

工程引用就是用来解决这一类问题的，可以灵活配置输出目录，还可以使工程之间产生依赖关系，有利于把一个大的项目拆成多个小的项目，也可以配合增量编译提高编译速度。

**基础配置：**

- `composite`: 工程可以被引用，并可以进行增量编译，工程引用必须配置生成声明文件

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "composite": true,
    "declaration": true
  }
}
```

**具体工程配置：**

- `references`: 依赖的工程

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/client"
  },
  "references": [
    {
      "path": "../common"
    }
  ]
}
```

可以使用如下命令构建具体的某一个工程，`--build` 是构建具体工程的参数，`--verbose` 用来打印构建信息。

> tsc --build src/sever --verbose

# 构建工具

## ts-loader 和 awesome-typescript-loader

`awesome-typescript-loader` 与 `ts-loader` 的主要区别：

- 更适合与 `Babel` 集成，使用 `Babel` 的转义和缓存
- 不需要安装额外的插件，就可以将类型检查放在单独的进程中进行
- `ts-loader` 使用单独的进程进行类型检查编译耗时较长，`awesome-typescript-loader` 类型检查插件存在类型检查遗漏

## tsc 和 babel

- `tsc` 默认存在类型检查，不存在插件
- `babel` 无类型检查能力，插件非常丰富

`Babel7` 之前不支持 `TS`：

`TS` -> `tsc/ts-loader/awesome-typescript-loader` -> `JS` -> `Babel` - `JS`

`Babel7` 之后：

`TS` -> `Babel` -> `JS`

`babel` 中无法编译的语法：

- `namespace` 命名空间
- `<>` 类型断言
- `const enum` 常量枚举
- `export=` 导出方式

## 如何选择编译工具

- 没有使用过 `Babel`，首选 `typescript` 自身的编译器（可配合 `ts-loader` 使用）
- 如果项目中已经使用了 `Babel`，安装 `@babel/preset-typescript`（可配合 `tsc` 监听模式做类型检查）
- 两种编译工具不要混用，只会增加工程的复杂度

# 代码检查工具

## TypeScript 转向 ESLint 的原因：

- `TSLint` 执行规则的方式存在一些架构问题，从而影响了性能，修复这些问题会有破坏现有规则
- `Eslint` 性能更好，并且社区用户通常拥有 `ESLint` 的规则配置（比如针对 `React` 或 `Vue` 的规则），而不会拥有 `TSLint` 的规则

`TypeScript` 和 `ESLint` 在编译过程中转换的 `AST` 不兼容，需要 `typescript-eslint` 将 `TypeScript` 的 `AST` 转换成 `ESTree` 与 `ESLint` 的 `AST` 做兼容。

## 使用了 TypeScript，为什么还需要使用 ESLint？

`TypeScript` 的工作包含了类型检查、语言转换、语法错误检查，`ESLint` 在语法错误检查的基础上可以保证代码风格的统一。

## 常用包

- `@typescript-eslint/eslint-plugin`: 使 `ESLint` 识别 `TS` 一些特殊语法
- `@typescript-eslint/parser`: 为 `ESLint` 提供解析器

**`ESLint` 配置 `.eslintrc.json`：**

```json
{
  "parser": "@typescript-eslint/parser",
  "plugin": ["@typescript-eslint"],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "extends": [
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-inferrable-types": "off"
  }
}
```

**`package.json` 命令：**

```json
{
  "scripts": {
    "lint": "eslint src --ext .js,.ts"
  }
}
```

## babel-eslint 和 typescript-eslint

- `babel-eslint`: 支持 `TypeScript` 没有的额外的语法检查，抛弃 `TypeScript`，不支持类型检查
- `typescript-eslint`: 基于 `TypeScript` 的 `AST`，支持创建基于类型信息的规则（`tsconfig.json`）

**建议：**

- 两者底层机制不同，不要一起使用
- `Babel` 体系建议使用 `babel-eslint`，否则可以使用 `typescript-eslint`

# 单元测试工具

**安装依赖：**

> npm i jest ts-jest -D

**生成配置文件 `jest.config.js`**

> ts-jest config

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node'
}
```
