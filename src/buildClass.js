var extendStatics = function (Child, Father) {
    for (var p in Father) {
        Child[p] = Father[p];
    }
}
var __extends = function (Child, Father) {
    extendStatics(Child, Father);
    function Temp() { this.constructor = Child; }
    // 原型继承
    let temp = new Temp()
    temp.prototype = Father.prototype
    Child.prototype = temp
};

function Father() { }

__extends(Child, Father);

function Child(...args) {
    return Father(...args)
}

return Child