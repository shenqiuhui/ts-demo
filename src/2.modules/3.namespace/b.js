/// <reference path="./a.ts" />
// 引用 a 模块的同名命名空间
var ShapeH;
(function (ShapeH) {
    // 不同文件中的同名命名空间的导出会合并
    function square(x) {
        return x * x;
    }
    ShapeH.square = square;
})(ShapeH || (ShapeH = {}));
console.log(ShapeH.circle(1));
console.log(ShapeH.square(1));
// 需要全局环境，不能与模块化混用，tsc 编译后通过 script 标签引入
// 每次使用命名空间名称调用不够简洁，可以为命名的空间导出取别名
var circle = ShapeH.circle;
var square = ShapeH.square;
console.log(circle(1));
console.log(square(1));
// 模块话之下命名空间已经不长使用，保留命名空间是为了对全局变量时代的一种兼容
