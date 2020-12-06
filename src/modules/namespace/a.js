var Shape;
(function (Shape) {
    // 命名空间中声明的变量只在命名空间中可见
    var pi = Math.PI;
    // 全局可见需使用 export 导出
    function circle(r) {
        return pi * Math.pow(r, 2);
    }
    Shape.circle = circle;
})(Shape || (Shape = {}));
